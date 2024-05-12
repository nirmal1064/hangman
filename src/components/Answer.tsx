type Props = {
  question: string;
  correctLetters: string[];
};

export default function Answer({ correctLetters, question }: Props) {
  return (
    <div className="word">
      {question.split("").map((letter, idx) => (
        <span className="letter" key={idx}>
          {correctLetters.includes(letter) ? letter : ""}
        </span>
      ))}
    </div>
  );
}
