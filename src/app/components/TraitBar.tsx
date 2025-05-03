import React from "react";

/** 수치 막대바 표시 컴포넌트 */
interface TraitBarProps {
    leftLabel: string;
    rightLabel: string;
    leftValue: number;
    rightValue: number;
}

const TraitBar: React.FC<TraitBarProps> = ({
                                               leftLabel,
                                               rightLabel,
                                               leftValue,
                                               rightValue,
                                           }) => {

    const total = leftValue + rightValue;
    const leftPercent = total === 0 ? 50 : (leftValue / total) * 100;
    const rightPercent = 100 - leftPercent;

    return (
        <div className="trait-bar-container">
            <div className="trait-bar-inner">
                <div className="trait-bar-inner-label">
                    <span>{leftLabel}</span>
                    <span>{rightLabel}</span>
                </div>
                <div className="trait-bar">
                    <div
                        style={{
                            width: `${leftPercent}%`,
                            background: "linear-gradient(to right, #60a5fa, #3b82f6)",
                            transition: "width 0.6s ease",
                        }}
                    />
                    <div
                        style={{
                            width: `${rightPercent}%`,
                            background: "linear-gradient(to right, #fca5a5, #f87171)",
                            transition: "width 0.6s ease",
                        }}
                    />
                </div>
                <div className="trait-bar-percentage-text">
                    <span>{leftPercent.toFixed(1)}%</span>
                    <span>{rightPercent.toFixed(1)}%</span>
                </div>
            </div>
        </div>
    );
};

export default TraitBar;