// 서버 컴포넌트 metadata

import Home from "./components/Home";

export const metadata = {
    title: "동물 성격 테스트 | 16가지 동물유형 심리테스트 - zootypes",
    description: "나의 숨겨진 동물 성격유형을 쉽고 재밌게 찾아보세요! 16가지 동물 캐릭터, 64개 레벨 결과, 자세한 해설 제공. 재미와 통찰을 모두 잡은 온라인 심리테스트.",
    keywords: "동물 성격, 동물 심리테스트, 성격유형, 유형 검사, 동물테스트, zootypes, 무료 심리테스트"
};


export default function Page() {
    return <Home/>;
}