import type {LevelKeys} from "@/types/animalTypes";

/**
 * 타입, 레벨에 맞는 동물 이미지 경로 반환
 * @param type
 * @param level
 * @return ex: "/public/images/animals/IRES/1.png"
 */
export function getAnimalImageUrl(type: string, level: LevelKeys): string {
    return `/images/animals/${type}/${level}.png`;
}

/**
 * 타입, 레벨에 맞는 동물 이미지 절대 경로 반환
 * @param type
 * @param level
 */
export function getAnimalImageAbsoluteUrl(type: string, level: LevelKeys): string {
    const relativePath = getAnimalImageUrl(type, level);
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${relativePath}`;
}