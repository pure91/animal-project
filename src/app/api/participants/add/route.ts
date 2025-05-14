import {NextResponse} from "next/server";
import {addParticipant} from "@/lib/db";

/** 참여자 add */
export async function POST() {
    try {
        await addParticipant();
        return NextResponse.json({success: true});
    } catch (error) {
        console.error("add fail:", error);
        return NextResponse.json({error: 'server error'}, {status: 500});
    }
}