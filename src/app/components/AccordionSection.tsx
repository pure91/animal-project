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
                            고슴도치, 거북이, 고양이, 펭귄, 토끼, 오소리, 여우, 족제비, 강아지, 늑대, 사자, 코끼리, 돌고래, 상어, 다람쥐, 문어 등 16가지 동물 유형이 있으며
                            각 동물별 4단계의 레벨이 있어 <b className="em-red">총 64가지 유형</b>을 만나실 수 있습니다.
                        </p>
                        <ul className="main-description-list">
                            <li>
                                만약 너무 중립적인 답변을 반복하면, 예외적으로 <b>특별 캐릭터(HUMAN)</b>가 등장할 수도 있어요!
                            </li>
                            <li>
                                테스트 결과를 통해 나의 동물이 전체에서 <b className="em-green">어느 정도 비율인지 통계</b>도 확인할 수 있으며 캐릭터, 특징, 설명, 어울리는 타입까지 함께 제공되어 관계 이해에 도움을 드립니다.
                            </li>
                            <li>
                                테스트 결과는 <b>링크, 카카오톡, Facebook, Twitter</b>로 손쉽게 공유할 수 있어 친구, 가족, 연인과 함께 즐거운 대화 소재가 되어줍니다.
                            </li>
                            <li>
                                자, 그럼 각 유형별로 제공되는 동물의 특징과 설명을 통해 나만의 <b className="em-red">동물 아이덴티티</b>를 확인해 보세요!
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
                        <div className="accordion-inner">
                            {item.content}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}