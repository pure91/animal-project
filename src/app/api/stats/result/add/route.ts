import {NextResponse} from "next/server";
import {addUserResult} from "@/lib/userResult";

/** 사용자 결과 add */
export async function POST(req: Request) {
    try {
        const {type, level} = await req.json();
        if (!type || !level) {
            return NextResponse.json({error: "Invalid input"}, {status: 400});
        }
        await addUserResult(type, level);
        return NextResponse.json({success: true});
    } catch (error) {
        console.error("add fail:", error);
        return NextResponse.json({error: 'server error'}, {status: 500});
    }
}