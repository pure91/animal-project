import React from "react";

/** 수치 막대바 표시 컴포넌트 */
interface TraitBarProps {
    leftLabel: string;
    rightLabel: string;
    leftValue: number; // 0~100 기준
}

const TraitBar: React.FC<TraitBarProps> = ({
                                               leftLabel,
                                               rightLabel,
                                               leftValue,
                                           }) => {
    const rightValue = 100 - leftValue;

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
                            width: `${leftValue}%`,
                            background: "linear-gradient(to right, #60a5fa, #3b82f6)", // blue tone
                            transition: "width 0.6s ease",
                        }}
                    />
                    <div
                        style={{
                            width: `${rightValue}%`,
                            background: "linear-gradient(to right, #fca5a5, #f87171)", // red tone
                            transition: "width 0.6s ease",
                        }}
                    />
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    color: "#6b7280", // gray-500
                    marginTop: "4px",
                }}>
                    <span>{leftValue}%</span>
                    <span>{rightValue}%</span>
                </div>
            </div>
        </div>
    );
};

export default TraitBar;