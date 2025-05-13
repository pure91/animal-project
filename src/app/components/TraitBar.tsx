import React from "react";

/** 수치 막대바 표시 컴포넌트 */
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
                                               element
                                           }) => {

    const total = leftValue + rightValue;
    const leftPercent = total === 0 ? 50 : (leftValue / total) * 100;
    const rightPercent = 100 - leftPercent;

    const [leftDesc, rightDesc] = description ? description.split(",") : ["", ""];

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
                            <strong>{leftLabel}</strong><span>{leftPercent.toFixed(1)}%</span>
                        </span>
                    )}
                </div>
                <div className="trait-bar-right" style={{width: `${rightPercent}%`}}>
                    {rightPercent > 0 && (
                        <span className="bar-text bar-text-right">
                            <span>{rightPercent.toFixed(1)}%</span><strong>{rightLabel}</strong>
                        </span>
                    )}
                </div>
                {leftPercent === 0 && (
                    <span className="bar-text bar-text-left fixed-text">
                        <strong>{leftLabel}</strong> 0.0%
                    </span>
                )}
                {rightPercent === 0 && (
                    <span className="bar-text bar-text-right fixed-text">
                        0.0% <strong>{rightLabel}</strong>
                    </span>
                )}
            </div>
        </div>
    );
};

export default TraitBar;