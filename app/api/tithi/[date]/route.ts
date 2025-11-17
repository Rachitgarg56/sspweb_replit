import { NextRequest, NextResponse } from 'next/server';

interface Props {
    params: Promise<{ date: string }>;
}

export async function GET(request: Request, props: Props) {
    const params = await props.params;
    return NextResponse.json({ kn: params.date + 'In kannada', en: params.date + 'In English', sa: params.date + 'In Sanskrit' });
}