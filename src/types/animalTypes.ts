/** 타입 정의 */

// traits 키 배열
export type TraitKeys = "I" | "O" | "R" | "D" | "E" | "C" | "S" | "A";

// 유형별 레벨 정의
export type LevelKeys = "1" | "2" | "3" | "4";

// 하위 타입
export type Subtype = {
    name: string;
    description: string;
    traits: Record<TraitKeys, number>;
    characteristics: string[];
};

// 동물 유형
export type AnimalData = {
    types: Record<LevelKeys, Subtype[]>;
};