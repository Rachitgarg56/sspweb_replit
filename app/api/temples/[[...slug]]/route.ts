import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/src/firebase'; 
import { replaceImageSrcDomain, wrapYouTubeIframes } from '@/utils/helpers';

interface Props {
    params: Promise<{ slug: string[] }>;
}

export async function GET(request: Request, props: Props) {
    const params = await props.params;
    const slug = params.slug ? `${params.slug.join('/')}` : '';
    const link = slug ? `temples/${slug}` : 'temples';
    const response = await db.collection('temporaryPages').where("link", "==", link).get();

    if (response.empty) {
        return NextResponse.json({ error: 'temple not found' }, { status: 404 });
    }
    const temple = response.docs[0].data();
    temple.content = wrapYouTubeIframes(replaceImageSrcDomain(temple.content));

    return NextResponse.json(temple);
}