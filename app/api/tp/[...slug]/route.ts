import { wrapYouTubeIframes, replaceImageSrcDomain } from "@/utils/helpers";
import { db } from "../../../src/firebase";
import { NextResponse } from "next/server";

interface PageData {
    slug: [];
    id?: string;
    attachments?: string[];
    images?: string[];
    title: string;
    mainMenu: string;
    subMenu: string;
    subSubMenu: string;
    breadcrumbs: [];
    content: string;
    created_at: string;
    link: string;
    address?: string[];
    bulletPoints?: string[];
    contactNumbers?: string[];
    downloadLink?: string;
    locationLink?: string;
    locationText?: string;
}
  
interface PageDataProps {
    params: Promise<{ slug: string[] }>; 
}

export async function GET(req: Request, props: PageDataProps) {
    const params = await props.params;

    if (!params || !params.slug || params.slug.length === 0) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const slug = `${params.slug.join('/')}`;

    const response = await db.collection('temporaryPages').where("link", "==", slug).get();

    if (response.empty) {
        return NextResponse.json({ error: slug }, { status: 404 });
    }

    const page = response.docs[0].data();
    page.content = wrapYouTubeIframes(replaceImageSrcDomain(page.content));
    return NextResponse.json(page);
}