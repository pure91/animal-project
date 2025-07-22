"use client"

import React, {useState} from 'react';
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";

/** 상세설명 아코디언 */
export default function AccordionSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const accordionData = [
            {
                title: "🐾 무슨 테스트인가요?",
                content: (
                    <>
                        <p>
                            zootypes는 16가지 동물을 기반으로 아래의 4가지 지표를 조합하여 사용자의 성격 유형을 파악하는 <b>온라인
                            성격 테스트</b>입니다.</p>
                        <ul className="main-description-list">
                            <li>
                                <b>I</b> (내향형/Inward) / <b className="em-red">O</b> (외향형/Outward)
                            </li>
                            <li>
                                <b>R</b> (현실형/Realistic) / <b className="em-red">D</b> (추상형/Divergent)
                            </li>
                            <li>
                                <b>E</b> (감성형/Empathy) / <b className="em-red">C</b> (이성형/Critical)
                            </li>
                            <li>
                                <b>S</b> (계획형/Structure) / <b className="em-red">A</b> (적응형/Adaptive)
                            </li>
                        </ul>
                    </>
                )
            },
            {
                title: "💡 어떤 점이 특별한가요?",
                content: (
                    <>
                        <p>
                            고슴도치, 거북이, 고양이, 펭귄, 토끼, 오소리, 여우, 족제비, 강아지, 늑대, 사자, 코끼리, 돌고래, 상어, 다람쥐, 문어 등 16가지 동물 유형이 있고 <b className="em-green">각 동물별로 4단계의 레벨</b>이 있어 <b className="em-red">총 64가지 유형</b>을 만나실 수 있습니다.
                        </p>
                        <ul className="main-description-list">
                            <li>
                                만약 너무 중립적인 답변을 반복 선택했다면, 예외적으로 <b className="em-red">HUMAN</b>이라는 특별한 캐릭터도 등장할 수 있습니다.
                            </li>
                            <li>
                                나의 동물이 전체에서 어느 정도의 비율을 차지하는지 <b>통계</b>도 확인할 수 있으며
                                타입, 특징, 설명, <b className="em-red">잘 맞는 타입❤️</b>과 <b className="em-red">안 맞는 타입💔</b>까지 함께 제공하여 관계 이해에 도움을 드립니다.
                            </li>
                            <li>
                                테스트 결과는 <b>링크, 카카오톡, 메타, X</b>를 통해 친구, 가족, 연인과 손쉽게 공유하여 유쾌하게 웃을 수 있는 대화 소재가 되어줍니다.
                            </li>
                            <li>
                                자 그럼, 각 유형별로 제공되는 설명과 동물 그리고 실생활에 적용할 수 있는 팁까지 통해 <b>나만의 동물 아이덴티티를 완성해 보세요</b>🐯
                            </li>
                        </ul>
                    </>
                )
            }
        ]
    ;

    return (
        <div className="accordion-container">
            {accordionData.map((item, index) => (
                <div key={index} className="accordion-item">
                    <div
                        className={`accordion-title ${openIndex === index ? 'open' : ''}`}
                        onClick={() => toggleAccordion(index)}
                    >
                        {item.title}
                        <span>
                            {openIndex === index ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                        </span>
                    </div>
                    <div className={`accordion-content ${openIndex === index ? 'open' : ''}`}>
                        {item.content}
                    </div>
                </div>
            ))}
        </div>
    );
}