/** 유틸 함수 */
import {TraitKeys, Subtype, AnimalData, LevelKeys} from "@/types/animalTypes";

// 타입 계산
export function calculateTypeAndTies(scores: Record<TraitKeys, number>): {
    type: string;
    ties: string[];
} {
    const totalScore = Object.values(scores).reduce((acc, val) => acc + val, 0);
    const ties: string[] = [];

    // 41점 이하는 사람(모든걸 중립으로 고르면 40점인데 약간의 편차까지 중립으로 보기위함)
    if (totalScore <= 41) {
        return {type: "HUMAN", ties: []};
    }

    // 동점이 있다면 ties 배열에 push
    if (scores.W === scores.X) ties.push("W/X");
    if (scores.A === scores.I) ties.push("A/I");
    if (scores.F === scores.T) ties.push("F/T");
    if (scores.S === scores.U) ties.push("S/U");

    // 동점 발생 시 리턴
    if (ties.length > 0) {
        return {type: "TIE", ties};
    }

    return {
        type: [
            scores.W >= scores.X ? "W" : "X",
            scores.A >= scores.I ? "A" : "I",
            scores.F >= scores.T ? "F" : "T",
            scores.S >= scores.U ? "S" : "U",
        ].join(""),
        ties: []
    };
}

// 사용자 점수 기반 레벨 결정
export function determineLevel(Traits: Record<TraitKeys, number>, AnimalData: AnimalData): LevelKeys {
    let minDiff = Infinity;
    let bestLevel: LevelKeys = "1";
    const keys: TraitKeys[] = ["W", "X", "A", "I", "F", "T", "S", "U"];

    // 모든 level 비교 후 점수와 가장 유사한 레벨 매칭
    for (const level in AnimalData.types) {
        const subtypes = AnimalData.types[level as LevelKeys];
        for (const subtype of subtypes) {
            const diff = keys.reduce((acc, key) => acc + Math.abs(Traits[key] - subtype.traits[key]), 0);
            if (diff < minDiff) {
                minDiff = diff;
                bestLevel = level as LevelKeys;
            }
        }
    }
    return bestLevel;
}

// 타입+레벨에 맞는 캐릭터 조회
export function getCharacterProfile(ResultTraits: Record<TraitKeys, number>, AnimalData: AnimalData["types"]): Subtype | null {
    let bestProfile: Subtype | null = null;
    let minDiff = Infinity;
    const keys: TraitKeys[] = ["W", "X", "A", "I", "F", "T", "S", "U"];

    // 모든 서브 타입을 돌면서 사용자 점수와 가장 비슷한 서브타입을 반환
    Object.values(AnimalData).flat().forEach((subtypes) => {
        const diff = keys.reduce((acc, key) => acc + Math.abs(ResultTraits[key] - subtypes.traits[key]), 0);
        if (diff < minDiff) {
            minDiff = diff;
            bestProfile = subtypes;
        }
    });

    return bestProfile;
}