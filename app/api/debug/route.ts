import { NextResponse } from 'next/server';
import { getFormSubmissions } from '@/lib/ghl';

export async function GET() {
    const locationId = process.env.GHL_LOCATION_ID;
    const formId = process.env.GHL_FORM_ID;

    try {
        const data = await getFormSubmissions(locationId!, formId!);
        return NextResponse.json(data.submissions.map((s: any) => ({
            name: s.name,
            createdAt: s.createdAt,
            dateObj: new Date(s.createdAt).toLocaleString()
        })));
    } catch (e) {
        return NextResponse.json({ error: 'Failed' });
    }
}
