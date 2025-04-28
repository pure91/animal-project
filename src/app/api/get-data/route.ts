import {NextResponse} from 'next/server';
import {connection} from '@/lib/db';

/** API 관련 코드 */

export async function GET() {
    try {
        const result = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users', (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        return NextResponse.json({data: result});
    } catch (err) {
        console.error(err);
        return NextResponse.json({error: 'DB 쿼리 오류'}, {status: 500});
    }
}
