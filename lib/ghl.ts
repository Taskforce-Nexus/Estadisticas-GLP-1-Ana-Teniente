const GHL_API_BASE = 'https://services.leadconnectorhq.com';

export interface GHLSubmission {
    id: string;
    contactId: string;
    createdAt: string;
    answers: Record<string, any>;
}

export async function getFormSubmissions(locationId: string, formId: string) {
    const apiKey = process.env.GHL_API_KEY;

    if (!apiKey) {
        throw new Error('GHL_API_KEY is not defined');
    }

    const url = `${GHL_API_BASE}/forms/submissions?locationId=${locationId}&formId=${formId}&limit=100`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Version': '2021-07-28',
            'Accept': 'application/json'
        },
        next: { revalidate: 0 }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Failed to fetch submissions: ${JSON.stringify(error)}`);
    }

    return response.json();
}

export function processSubmissions(submissions: any[], days: number = 30, startDate?: string, endDate?: string) {
    let filteredSubmissions = submissions;

    /**
     * TIMEZONE CORRECTION (Mexico -06:00)
     * We convert everything to local date strings YYYY-MM-DD for accurate comparison
     * with what the user selects in the frontend calendars.
     */
    const getLocalYYYYMMDD = (dateStr: string) => {
        const d = new Date(dateStr);
        // Offset for Mexico (-6 hours)
        const localDate = new Date(d.getTime() - (6 * 60 * 60 * 1000));
        return localDate.toISOString().split('T')[0];
    };

    if (startDate || endDate) {
        if (startDate) {
            filteredSubmissions = filteredSubmissions.filter(s => getLocalYYYYMMDD(s.createdAt) >= startDate);
        }
        if (endDate) {
            filteredSubmissions = filteredSubmissions.filter(s => getLocalYYYYMMDD(s.createdAt) <= endDate);
        }
    } else if (days > 0) {
        const now = new Date();
        const cutoff = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
        filteredSubmissions = filteredSubmissions.filter(s => new Date(s.createdAt) >= cutoff);
    }

    const total = filteredSubmissions.length;

    /**
     * Re-check and update to exact GHL form labels for reliability
     */
    const FIELD_MAP = {
        nausea: {
            id: 'av3Da3rmDCxVzLdBuNpH',
            options: ['Ninguna', 'Leve, tolerable', 'Moderada', 'Severa e intensa']
        },
        vomitos: {
            id: '15LcvpbMB20NN0u7OYUo',
            options: ['No', 'Sí, 1 vez', 'Sí, 2 o más veces']
        },
        estrenimiento: {
            id: 'FJtzPLHgJgk0W7toqVlW',
            options: ['No', 'Regular, tolerable', 'Intenso (no mejora)']
        },
        dolor: {
            id: 'j3WqVlu3EfhvnNP6z6h4',
            options: ['No', 'Leve', 'Moderado', 'Intenso']
        },
        comidas: {
            id: 'kS7ZwkE5DGPLacO7fwmE',
            options: ['3 comidas', '2 comidas', '1 comida o menos']
        },
        estado: {
            id: 'uOCjjNKdYJ1C4x9w2noU',
            options: ['Bien', 'Regular, tolerable', 'Mal, muy limitado']
        },
    };

    const normalize = (str: string) => {
        if (!str) return '';
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]/g, "")
            .trim();
    };

    const stats: any = {};

    Object.keys(FIELD_MAP).forEach(key => {
        const config = (FIELD_MAP as any)[key];
        const counts: Record<string, number> = {};

        config.options.forEach((opt: string) => {
            counts[opt] = 0;
        });

        if (total > 0) {
            filteredSubmissions.forEach(s => {
                const rawAnswer = (s.answers?.[config.id] || s.others?.[config.id] || '').toString().trim();

                if (rawAnswer) {
                    const matchLetter = rawAnswer.match(/^([A-E])\s*\)/i);
                    if (matchLetter) {
                        const index = matchLetter[1].toUpperCase().charCodeAt(0) - 65;
                        if (index >= 0 && index < config.options.length) {
                            counts[config.options[index]]++;
                            return;
                        }
                    }

                    const normalizedAnswer = normalize(rawAnswer);
                    const matchedOption = config.options.find((opt: string) => {
                        const normalizedOpt = normalize(opt);
                        return normalizedAnswer.includes(normalizedOpt) || normalizedOpt.includes(normalizedAnswer);
                    });

                    if (matchedOption) {
                        counts[matchedOption]++;
                    }
                }
            });
        }

        stats[key] = config.options.map((opt: string) => ({
            label: opt,
            percent: total > 0 ? Math.round((counts[opt] / total) * 100) : 0
        }));
    });

    return {
        total,
        stats
    };
}

export async function discoverFieldIds(locationId: string, formId: string) {
    const apiKey = process.env.GHL_API_KEY;
    const url = `${GHL_API_BASE}/forms/${formId}?locationId=${locationId}`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Version': '2021-07-28'
        }
    });

    return response.json();
}
