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
        <div style={{
            marginBottom: "24px",
            width: "100%", // 부모 요소에서 크기 조정
            display: "flex", // flex를 사용해 중앙 정렬
            justifyContent: "center", // 중앙 정렬
        }}>
            <div style={{width: "30%"}}> {/* 자식 요소가 그 안에서 정렬될 수 있도록 설정 */}
                <div style={{display: "flex", justifyContent: "space-between", fontWeight: 600, marginBottom: "4px"}}>
                    <span>{leftLabel}</span>
                    <span>{rightLabel}</span>
                </div>
                <div style={{
                    display: "flex",
                    height: "16px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    background: "#e5e7eb", // gray-200
                }}>
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
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#6b7280",
                    marginTop: "4px",
                }}>
                    <span>{leftPercent.toFixed(1)}%</span>
                    <span>{rightPercent.toFixed(1)}%</span>
                </div>
            </div>
        </div>
    );
};

export default TraitBar;