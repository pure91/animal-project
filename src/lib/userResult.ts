import {pool} from './db';

/** 사용자 결과 쿼리 */

// 사용자 결과 추가
export const addUserResult = async (type: string, level: string): Promise<void> => {
    await pool.execute(
        "INSERT INTO user_result (type, level, created_at) VALUES (?, ?, NOW())",
        [type, level]
    );
};

// 사용자 결과 카운트
export async function getCountTotal(type: string, level: number | undefined) {
    const [rows] = await pool.execute(
        `
            SELECT 
                (SELECT COUNT(*) FROM user_result) as totalCount,
                (SELECT COUNT(*) FROM user_result WHERE type = ?) as typeCount,
                (
                    SELECT COUNT(*)
                    FROM user_result
                    WHERE type = ?
                    ${level !== undefined ? 'AND level = ?' : ''}
                ) as levelCount
        `,
        level !== undefined ? [type, type, level] : [type, type]
    );

    const result = rows as {
        totalCount: number;
        typeCount: number;
        levelCount: number;
    }[];

    return result[0];
}
