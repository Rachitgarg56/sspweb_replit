import { NextRequest, NextResponse } from 'next/server';

import {db} from '../../../src/firebase';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function GET(request: Request, props: Props) {
    const params = await props.params;
    const { slug } = params;
    let response = await db.collection('announcements').where("slug", "==", slug).get();
    if (response.empty) {
        return NextResponse.json({ error: 'Announcement not found' }, { status: 404 });
    }
    let announcement = response.docs[0].data();
    let announcementWithId = { id: response.docs[0].id, ...announcement };
    return NextResponse.json(announcementWithId);
}