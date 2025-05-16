import { pool } from './db';

/** 참여자 수 조회 쿼리 */

// 참여자 수 조회
export const getCount = async (): Promise<number> => {
  const [rows] = await pool.execute("SELECT COUNT(*) AS total_participants FROM participants");
  const result = rows as { total_participants: number }[];
  return result[0].total_participants;
};

// 참여자 수 추가
export const addParticipant = async (): Promise<void> => {
  await pool.execute("INSERT INTO participants (created_at) VALUES (NOW())");
};