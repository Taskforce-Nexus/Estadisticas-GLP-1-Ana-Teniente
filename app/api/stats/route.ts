import { NextResponse } from 'next/server';
import { getFormSubmissions, processSubmissions } from '@/lib/ghl';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;

    const locationId = process.env.GHL_LOCATION_ID;
    const formId = process.env.GHL_FORM_ID;

    if (!locationId || !formId) {
        return NextResponse.json({ error: 'Missing configuration' }, { status: 500 });
    }

    try {
        const data = await getFormSubmissions(locationId, formId);
        const processed = processSubmissions(data.submissions || [], days, startDate, endDate);

        return NextResponse.json({
            success: true,
            data: processed
        });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
