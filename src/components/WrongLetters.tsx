type Props = {
  wrongLetters: string[];
};

export default function WrongLetters({ wrongLetters }: Props) {
  return (
    <div className="wrong-letters-container">
      <div>
        {wrongLetters.length > 0 && <p>Wrong</p>}
        {wrongLetters.length > 0 && <span>{wrongLetters}</span>}
        {/* {wrongLetters.map((letter, idx) => (
          <span key={idx}>{letter}</span>
        ))} */}
      </div>
    </div>
  );
}
