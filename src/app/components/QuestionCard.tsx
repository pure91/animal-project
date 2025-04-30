/** 공통 질문 컴포넌트 */
// 25.04.29 re-run 임시

export default function QuestionCard({ question, options, onSelect } : {
    question: string;
    options: { text: string, score:{ [key: string]: number} } [];
    onSelect: (score: { [key: string] : number}) => void;
}) {
    return (
        <div className="question-card">
            <h2>💡{question}</h2>
            {options.map((option, idx) => (
                <button
                    key={idx}
                    onClick={() => onSelect(option.score)}
                    className={`question-option option-${idx}`}
                >
                    {option.text}
                </button>
            ))}
        </div>
    );
}