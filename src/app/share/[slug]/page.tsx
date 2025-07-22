import rawAnimalTypes from "@/app/data/animalTypes.json";
import type {AnimalData} from "@/types/animalTypes";
import type {Metadata} from "next";
import {getCharacterProfile} from "@/utils/animalUtils";
import {parseShareSlug} from "@/utils/shareUtils";
import {getAnimalImageUrl} from "@/utils/getAnimalImageUrl";

/** 동적 메타데이터 공유용 서버 사이드 페이지 */
const animalTypes = rawAnimalTypes as Record<string, AnimalData>;

// 사용자 공유 요청 시 url의 slug 파싱하여 동적 메타태그 생성, 서버가 렌더링하는 HTML문서의 head에 삽입(sns 크롤러가 미리보기 읽을 수 있게)
export async function generateMetadata({params}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const {slug} = await params; // 15.1버전 이후부터 params를 Promise로 받아야하고 그 실제값도 꺼내줘야함

    const parsed = parseShareSlug(slug);
    if (!parsed) {
        return {title: "파싱 오류", description: "파싱에 실패하였습니다."};
    }

    const {traits, type, level} = parsed;
    if (!level) {
        return {title: "레벨 없음", description: "레벨이 존재하지 않습니다"};
    }

    const animalData = animalTypes[type];
    if (!animalData) {
        return {title: "알 수 없는 유형", description: "데이터가 존재하지 않습니다.",};
    }

    const imageUrl = `https://zootypes.com${getAnimalImageUrl(type, level)}`;

    const characterProfile = animalData?.types
        ? getCharacterProfile(traits, animalData.types)
        : null;

    return {
        title: `나의 유형은 ${type}`,
        description: `⭐${characterProfile?.name ?? "알 수 없음"}⭐ - ${characterProfile?.description ?? ""}`,
        // 페이스북 메타태그
        openGraph: {
            title: `나의 유형은 ${type}`,
            description: `⭐${characterProfile?.name ?? "알 수 없음"}⭐ - ${characterProfile?.description ?? ""}`,
            images: [imageUrl],
            url: `https://zootypes.com/share/${slug}`,
        },
        // 트위터 메타태그
        twitter: {
            card: "summary",
            title: `나의 유형은 ${type}`,
            description: `⭐${characterProfile?.name ?? "알 수 없음"}⭐ - ${characterProfile?.description ?? ""}`,
            images: [imageUrl],
        },
    };
}

// 서버 렌더링 시, 클라이언트가 자동으로 /result 페이지로 이동하도록 페이지 HTML에 스크립트를 포함해서 응답
export default async function SharePage({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const parsed = parseShareSlug(slug);

    if (!parsed) {
        return <div>잘못된 링크입니다.</div>;
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

    // canonical 태그 헤드에 삽입
    return (
        <>
            <head>
                <title>나의 유형은 {parsed?.type ?? "알 수 없음"}</title>
                {/* 해당페이지는 공유용이지 실제 대표 컨텐츠는 result 파일이라는것을 알리기 위함*/}
                <link rel="canonical" href={`https://zootypes.com/result?${searchParams.toString()}`} />
                {/*  robots noindex 추가, 해당 페이지는 검색 결과에 색인(검색 노출)하지 말것(공유 페이지는 노출말고 실제 콘텐츠는 result만 인도하기 위함) */}
                <meta name="robots" content="noindex, follow" />
            </head>
            <div>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.location.href = "/result?${searchParams.toString()}"`,
                    }}
                />
            </div>
        </>
    );
}