import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../src/firebase';

export async function GET(request: NextRequest) {
    try {
        const response = await db.collection('sidebars').get();
        
        if (response.empty) {
            return NextResponse.json({ error: 'Sidebars data not found' }, { status: 404 });
        }

        const sidebars = response.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return NextResponse.json(sidebars);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching sidebars data' }, { status: 500 });
    }
}
