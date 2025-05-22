/** 유틸 함수 */
import {TraitKeys, Subtype, AnimalData, LevelKeys} from "@/types/animalTypes";

// 타입 계산
export function calculateTypeAndTies(scores: Record<TraitKeys, number>): {
    type: string;
    ties: string[];
} {
    const totalScore = Object.values(scores).reduce((acc, val) => acc + val, 0);
    const ties: string[] = [];

    // 중립 타입(20개의 문항 모두 중립 시 40점)
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

    // 최종 타입 생성
    return {
        type: [
            scores.W > scores.X ? "W" : "X",
            scores.A > scores.I ? "A" : "I",
            scores.F > scores.T ? "F" : "T",
            scores.S > scores.U ? "S" : "U",
        ].join(""),
        ties: []
    };
}

// 사용자 점수 기반 레벨 결정
export function determineLevel(Traits: Record<TraitKeys, number>, AnimalData: AnimalData): LevelKeys {
    let minDiff = Infinity;
    let bestLevel: LevelKeys = "1";
    const keys: TraitKeys[] = ["W", "X", "A", "I", "F", "T", "S", "U"];

    // type은 이미 정해졌기에 AnimalData.types의 모든 레벨(1~4) 탐색
    for (const level in AnimalData.types) {
        const subtypes = AnimalData.types[level as LevelKeys];
        for (const subtype of subtypes) {
            // 사용자가 선택한 것 - 서브타입에 있는 점수 = 각각 tratis 차이를 무조건 양수로 두고 거기서 절대값 총합의 근사치를 구함
            const diff = keys.reduce((acc, key) => acc + Math.abs(Traits[key] - subtype.traits[key]), 0);
            // 최소 차이값 갱신 시 bestLevel 교체
            if (diff < minDiff) {
                minDiff = diff;
                bestLevel = level as LevelKeys;
            }
        }
    }
    return bestLevel;
}

// 타입+레벨에 맞는 캐릭터 프로필 조회
export function getCharacterProfile(ResultTraits: Record<TraitKeys, number>, AnimalData: AnimalData["types"]): Subtype | null {
    let minDiff = Infinity;
    let bestProfile: Subtype | null = null;
    const keys: TraitKeys[] = ["W", "X", "A", "I", "F", "T", "S", "U"];

    // AnimalData의 모든 서브타입 중에서 사용자 traits와 가장 차이가 적은 프로필로 선택
    Object.values(AnimalData).flat().forEach((subtypes) => {
        const diff = keys.reduce((acc, key) => acc + Math.abs(ResultTraits[key] - subtypes.traits[key]), 0);
        if (diff < minDiff) {
            minDiff = diff;
            bestProfile = subtypes;
        }
    });

    return bestProfile;
}