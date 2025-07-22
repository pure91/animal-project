/** 공통 푸터 컴포넌트 */
import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <p>
                해당 테스트는 MBTI® 성격유형 이론을 참고하여 제작된 자체 콘텐츠로 공식 MBTI® 검사와는 무관합니다. 단순 재미로 즐겨주세요😊<br/>
            </p>
            <ul className="footer-menu">
                <Link href="/terms">이용약관</Link> | <Link href="/privacy">개인정보처리방침</Link> | <a href="mailto:kimgudals91@gmail.com">문의 메일</a>
            </ul>
        </footer>
    )
}