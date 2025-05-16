import {NextResponse} from 'next/server';
import {getCountTotal} from "@/lib/userResult";

/** 사용자 결과 count */
export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const type = searchParams.get('type');
        const levelStr = searchParams.get('level');
        const level = levelStr ? Number(levelStr) : undefined;

        if (!type) {
            return NextResponse.json({error: 'type parameter is required'}, {status: 400});
        }

        const {totalCount, typeCount, levelCount} = await getCountTotal(type, level);

        return NextResponse.json({totalCount, typeCount, levelCount});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'server error'}, {status: 500});
    }
}