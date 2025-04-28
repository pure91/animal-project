/** 공통 헤더 컴포넌트 */

export default function Header() {
    return (
        <header>
            <h1>
                <nav>
                    {/* 동일위치에서 Link는 작동하지 않기 때문에 a태그 사용*/}
                    <a href="/" style={{textDecoration: 'none'}}>
                        MBTI 웹사이트
                    </a>
                </nav>
            </h1>
        </header>
    );
}