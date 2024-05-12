type Props = {
  wrongLetters: string[];
};

export default function WrongLetters({ wrongLetters }: Props) {
  return (
    <div className="wrong-letters-container">
      <div>
        {wrongLetters.length > 0 && <p>Wrong</p>}
        {wrongLetters.length > 0 && <span>{wrongLetters.join(",")}</span>}
      </div>
    </div>
  );
}
