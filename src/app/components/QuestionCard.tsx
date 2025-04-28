/** 공통 질문 컴포넌트 */

export default function QuestionCard({ question, options, onSelect } : {
    question: string,
    options: string[],
    onSelect: (option: string) => void
}) {
    return (
        <div className="question-card">
            <h2>{question}</h2>
            {options.map((option, idx) => (
                <button
                    key={idx}
                    onClick={() => onSelect(option)}
                    className={`question-option ${option === "예" ? "yes" : "no"}`}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}