import { NextRequest, NextResponse } from 'next/server';
import {db} from '../../../../../src/firebase';

interface Props {
    params: Promise<{ year: string, month: string, day: string, slug: string[] }>;
}

export async function GET(request: Request, props: Props) {
    const params = await props.params;
    const { year, month, day, slug } = params;
    const fullPath = [year, month, day, ...slug].join('/')
    const response = await db.collection('events').where("link", "==", fullPath).get();

    if (response.empty) {
        return NextResponse.json({ error: 'event not found' }, { status: 404 });
    }
    const event = response.docs[0].data();

    return NextResponse.json(event);
}