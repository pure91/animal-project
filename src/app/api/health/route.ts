import { NextResponse } from 'next/server'

/** 배포서버 올리기 전에 확실하게 컨테이너 내부에서 localhost 체크 응답 용도 */
export async function GET() {
    return NextResponse.json({ status: 'ok' }, { status: 200 })
}