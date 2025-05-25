"use client"

/** 공통 헤더 컴포넌트 */
import Link from "next/link";

export default function Header() {
    const handleClick = () => {
        window.location.href = '/';
    };

    return (
        <header>
            <h1>
                <nav>
                    <Link href="/" onClick={handleClick} style={{textDecoration: 'none'}}>
                        동물 성격 테스트
                    </Link>
                </nav>
            </h1>
        </header>
    );
}