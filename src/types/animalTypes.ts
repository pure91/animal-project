/** 타입 정의 */

// traits 키 배열
export type TraitKeys = "I" | "O" | "R" | "D" | "E" | "C" | "S" | "A";

// 유형별 레벨 정의
export type LevelKeys = "1" | "2" | "3" | "4";

// 궁합 정보 타입
export interface MatchInfo {
    good: string;
    bad: string;
}

// 하위 타입
export interface Subtype {
    name: string;
    description: string;
    traits: Record<TraitKeys, number>;
    characteristics: string[];
    match: MatchInfo;
};

// 동물 유형
export interface AnimalData {
    types: Record<LevelKeys, Subtype[]>;
};