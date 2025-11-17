import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../src/firebase';
import { replaceImageSrcDomain, wrapYouTubeIframes } from '@/utils/helpers';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function GET(request: Request, props: Props) {
    const params = await props.params;
    const { slug } = params;
    const response = await db.collection('permanentPages').where("link", "==", `/pilgrim-info/branches/${slug}`).get();

    if (response.empty) {
        return NextResponse.json({ error: 'data not found' }, { status: 404 });
    }
    const temple = response.docs[0].data();
    temple.content = wrapYouTubeIframes(replaceImageSrcDomain(temple.content));

    return NextResponse.json(temple);
}