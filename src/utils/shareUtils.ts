import type {LevelKeys, TraitKeys} from "@/types/animalTypes";

/** 동적 메타데이터 공유용 slug 유틸 */

// 타입 가드 역할: 문자열이 LevelKeys인지 확인(as로 강제 단언 제거 용도)
function isLevelKey(s: string): s is LevelKeys {
  return ["1", "2", "3", "4"].includes(s);
}

// 링크 클릭 시 클라이언트에서 공유용 URL 만듦
export function createShareSlug(traits: Record<TraitKeys, number>, type: string, level: LevelKeys): string {
    return [
        traits.I, traits.O, traits.R, traits.D, traits.E, traits.C, traits.S, traits.A,
        type,
        level,
    ].join("-");
}

// 공유용 URL을 열때 slug 디코딩
export function parseShareSlug(slug: string): {
    traits: Record<TraitKeys, number>;
    type: string;
    level: LevelKeys;
} | null {
    const parts = slug.split("-");
    if (parts.length !== 10) return null;

    const [I, O, R, D, E, C, S, A, type, levelStr] = parts;
    if (!isLevelKey(levelStr)) return null;

    return {
        traits: { I: +I, O: +O, R: +R, D: +D, E: +E, C: +C, S: +S, A: +A },
        type,
        level: levelStr
    };
}
