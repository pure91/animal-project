import {NextResponse} from 'next/server';
import {getCount} from "@/lib/db";

/** 참여자 수 count */
export async function GET() {
    try {
        const count = await getCount();
        return NextResponse.json({count});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'server error'}, {status: 500});
    }
}