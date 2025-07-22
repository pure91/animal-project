// 서버 컴포넌트 metadata

import { Metadata } from "next";
import Terms from "./Terms";

export const metadata: Metadata = {
    title: "이용약관 | zootypes 동물 성격 테스트",
    description: "zootypes 동물 성격 테스트 이용약관 페이지입니다.",
};

export default function TermsPage() {
    return <Terms />;
}