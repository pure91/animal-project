import mysql from 'mysql2/promise';

// MariaDb 연결
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, // 연결이 사용 가능할 때까지 대기
    connectionLimit: 10, // 연결 풀의 최대 연결 수
    queueLimit: 0,  // 대기열에 들어갈 연결 요청의 최대 수 (0은 무제한을 말함)
});

// 타입 정의
type CountRow = { total_participants: number };

// 참여자 수 조회
export const getCount = async (): Promise<number> => {
    const [rows] = await pool.execute("SELECT COUNT(*) AS total_participants FROM participants");
    console.log("rows:", rows);
    const result = rows as CountRow[];
    console.log("result:", result);
    return result[0].total_participants;
};

// 참여자 추가
export const addParticipant = async (): Promise<void> => {
    // await pool.execute("INSERT INTO participants (created_at) VALUES (NOW())");
    const [result] = await pool.execute(
        "INSERT INTO participants (created_at) VALUES (NOW())"
    );
    console.log("result:", result);
}