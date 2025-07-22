// 서버 컴포넌트 metadata

import { Metadata } from "next";
import Privacy from "./Privacy";

export const metadata: Metadata = {
    title: "개인정보처리방침 | zootypes 동물 성격 테스트",
    description: "zootypes 동물 성격 테스트 개인정보처리방침 페이지입니다.",
};

export default function PrivacyPage() {
    return <Privacy />;
}