import mysql from 'mysql2/promise';

// MariaDb 연결
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true, // 연결이 사용 가능할 때까지 대기
    connectionLimit: 10, // 연결 풀의 최대 연결 수
    queueLimit: 0,  // 대기열에 들어갈 연결 요청의 최대 수 (0은 무제한을 말함)
});