import {redirect} from "next/navigation";
import rawAnimalTypes from "@/app/data/animalTypes.json";
import type {AnimalData} from "@/types/animalTypes";
import type {Metadata} from "next";
import {getCharacterProfile} from "@/utils/animalUtils";
import {parseShareSlug} from "@/utils/shareUtils";

/** 동적 메타데이터 공유용 서버 사이드 페이지 */
const animalTypes = rawAnimalTypes as Record<string, AnimalData>;

// 타입별 동물 이미지 매핑
const animalImages: Record<string, string> = {
    IRES: "/images/hedgehog.png",
    IRCS: "/images/turtle.png",
    IDES: "/images/cat.png",
    IDCS: "/images/penguin.png",
    IREA: "/images/rabbit.png",
    IRCA: "/images/badger.png",
    IDEA: "/images/fox.png",
    IDCA: "/images/weasel.png",
    ORES: "/images/dog.png",
    ORCS: "/images/wolf.png",
    ODES: "/images/lion.png",
    ODCS: "/images/elephant.png",
    OREA: "/images/dolphin.png",
    ORCA: "/images/shark.png",
    ODEA: "/images/squirrel.png",
    ODCA: "/images/octopus.png",
    HUMAN: "/images/human.png",
};

// 하나 이상의 메타데이터 필드를 포함하는 Metadata 객체를 반환(동적 페이지 메타데이터 생성 방법 -> use client 쓰면 안됨)
export async function generateMetadata({params}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const {slug} = await params; // 15.1버전 이후부터 params를 Promise로 받아야하고 그 실제값도 꺼내줘야함

    const parsed = parseShareSlug(slug);
    if (!parsed) {
        return { title: "파싱 오류", description: "파싱에 실패하였습니다." };
    }

    const {traits, type, level} = parsed;
    if (!level) {
        return { title: "레벨 없음", description: "레벨이 존재하지 않습니다" };
    }

    const animalData = animalTypes[type];
    if (!animalData) {
      return {title: "알 수 없는 유형", description: "데이터가 존재하지 않습니다.",};
    }

    const imageUrl = `https://zootypes.com${animalImages[type] ?? "/images/animalAll.png"}`;

    const characterProfile = animalData?.types
        ? getCharacterProfile(traits, animalData.types)
        : null;

    return {
        title: `나의 유형은 ${type}`,
        description: `⭐${characterProfile?.name ?? "알 수 없음"}⭐ - ${characterProfile?.description ?? ""}`,
        openGraph: {
            title: `나의 유형은 ${type}`,
            description: `⭐${characterProfile?.name ?? "알 수 없음"}⭐ - ${characterProfile?.description ?? ""}`,
            images: [imageUrl],
            url: `https://zootypes.com/share/${slug}`,
        },
    };
}

export default async function Page({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const parsed = parseShareSlug(slug);

    if (!parsed) {
        redirect(`/result?type=${slug}`);
        return;
    }

    const searchParams = new URLSearchParams({
        I: String(parsed.traits.I),
        O: String(parsed.traits.O),
        R: String(parsed.traits.R),
        D: String(parsed.traits.D),
        E: String(parsed.traits.E),
        C: String(parsed.traits.C),
        S: String(parsed.traits.S),
        A: String(parsed.traits.A),
        type: parsed.type,
        level: parsed.level,
    });
    redirect(`/result?${searchParams.toString()}`);
}