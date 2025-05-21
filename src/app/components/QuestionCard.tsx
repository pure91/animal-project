import {Question} from '@/app/data/questions';

/** 공통 질문 컴포넌트 */
export default function QuestionCard({question, onSelect, current, total, onBack, showBackButton, isTieState}: {
    question: Question;
    onSelect: (score: { [key: string]: number }) => void;
    current: number;
    total: number;
    onBack?: () => void;
    showBackButton?: boolean;
    isTieState: boolean;
}) {
    return (
        <div className={`question-card ${isTieState ? 'tie-mode' : ''}`}>
            <div className="progress-wrapper">
                <div className="progress-bar" style={{width: `${(current / total) * 100}%`}}/>
            </div>
            <p className="question-index">
                {isTieState ? `🔥 추가 질문 ${current} / ${total} 🔥` : `질문 ${current} / ${total}`}
            </p>
            <h2>{question.question}</h2>
            {question.options.map((option, idx) => (
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