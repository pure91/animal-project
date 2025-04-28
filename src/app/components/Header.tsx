/** 공통 헤더 컴포넌트 */
import Link from "next/link";

export default function Header() {
    return (
        <header>
            <h1>MBTI 웹사이트</h1>
            <nav>
                <Link href="/">홈</Link>
            </nav>
            <br/>
        </header>
    );
}