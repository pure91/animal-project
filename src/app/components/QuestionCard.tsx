/** 공통 질문 컴포넌트 */

export default function QuestionCard({question, options, onSelect, current, total, onBack, showBackButton}: {
    question: string;
    options: { text: string, score: { [key: string]: number } } [];
    onSelect: (score: { [key: string]: number }) => void;
    current: number;
    total: number;
    onBack?: () => void;
    showBackButton?: boolean;
}) {
    return (
        <div className="question-card">
            <div className="progress-wrapper">
                <div className="progress-bar" style={{width: `${(current / total) * 100}%`}}/>
            </div>
            <p className="question-index">질문 {current} / {total}</p>
            <h2>{question}</h2>
            {options.map((option, idx) => (
                <button
                    key={idx}
                    onClick={() => onSelect(option.score)}
                    className={`question-option option-${idx}`}
                >
                    {option.text}
                </button>
            ))}

            {showBackButton && onBack && (
                <button className="back-button" onClick={onBack}>
                    ⬅️ 뒤로가기
                </button>
            )}
        </div>
    );
}