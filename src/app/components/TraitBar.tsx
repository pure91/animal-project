import React from "react";

interface TraitBarProps {
    leftLabel: string;
    rightLabel: string;
    leftValue: number;
    rightValue: number;
    description?: string;
    element?: string;
}

const TraitBar: React.FC<TraitBarProps> = ({
                                               leftLabel,
                                               rightLabel,
                                               leftValue,
                                               rightValue,
                                               description,
                                               element,
                                           }) => {
    const total = leftValue + rightValue;
    const leftPercent = total === 0 ? 50 : (leftValue / total) * 100;
    const rightPercent = 100 - leftPercent;

    const [leftDesc, rightDesc] = description ? description.split(",") : ["", ""];

    // 이거 시간날때 DB랑 타입 구조 다 바꿀때 뜻도 바꿔야함
    // I = In 내향형
    // O = Outgoing 외향형
    // R = Realistic 현실형
    // D = Divergent 추상형
    // E = Empathy 감정형
    // C = Critical 이성형
    // S = Structure 계획형
    // A = Adaptive 자유형
    const tooltipMap: Record<string, string> = {
        W: "Withdrawn",
        X: "Expressive",
        A: "Aware",
        I: "Intuitive",
        F: "Feeling",
        T: "Thinking",
        S: "Systematic",
        U: "Unstructured",
    };

    return (
        <div className="trait-bar-wrapper">
            <div className="trait-bar-description">
                <span className="desc-left">{leftDesc}</span>
                <span className="desc-element">{element}</span>
                <span className="desc-right">{rightDesc}</span>
            </div>

            <div className="trait-bar-inner">
                <div className="trait-bar-left" style={{width: `${leftPercent}%`}}>
                    {leftPercent > 0 && (
                        <span className="bar-text bar-text-left">
                            <strong className="tooltip">
                                {leftLabel}
                                <span className="tooltip-text">{tooltipMap[leftLabel]}</span>
                            </strong>
                            <span>{leftPercent.toFixed(1)}%</span>
                        </span>
                    )}
                </div>
                <div className="trait-bar-right" style={{width: `${rightPercent}%`}}>
                    {rightPercent > 0 && (
                        <span className="bar-text bar-text-right">
                            <span>{rightPercent.toFixed(1)}%</span>
                            <strong className="tooltip">
                                {rightLabel}
                                <span className="tooltip-text">{tooltipMap[rightLabel]}</span>
                            </strong>
                        </span>
                    )}
                </div>

                {leftPercent === 0 && (
                    <span className="bar-text bar-text-left fixed-text">
                        <strong className="tooltip">
                            {leftLabel}
                            <span className="tooltip-text">{tooltipMap[leftLabel]}</span>
                        </strong>{" "}
                        0.0%
                    </span>
                )}
                {rightPercent === 0 && (
                    <span className="bar-text bar-text-right fixed-text">
                        0.0%{" "}
                        <strong className="tooltip">
                            {rightLabel}
                            <span className="tooltip-text">{tooltipMap[rightLabel]}</span>
                        </strong>
                    </span>
                )}
            </div>
        </div>
    );
};

export default TraitBar;
