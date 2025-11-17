import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/src/firebase";

interface Props {
    params: Promise<{ slug: string[] }>;
}

export async function GET(req: NextRequest, props: Props) {
    try {
        const { params } = props;
        const { slug } = await params;
        
        const snapshot = await db
            .collection('benedictoryCourses')
            .where('slug', '==', slug[1])
            .get()

        const course = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        const courseData = course[0]

        return NextResponse.json(courseData);
    } catch (err) {
        console.error(err);
    }
}
