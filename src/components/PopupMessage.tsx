import { Dispatch, SetStateAction, useEffect } from "react";
import { checkWin } from "../utils";

// type Props = {
//   message: string;
//   status: "Win" | "Lost" | "";
//   word: string;
// };

type Props = {
  question: string;
  correctLetters: string[];
  wrongLetters: string[];
  setPlayInProgress: Dispatch<SetStateAction<boolean>>;
  resetGame: () => void;
};

export default function PopupMessage({
  question,
  correctLetters,
  wrongLetters,
  setPlayInProgress,
  resetGame
}: Props) {
  let finalMessage = "";
  let finalMessageRevealWord = "";
  let playInProgress = true;

  const status = checkWin(question, correctLetters, wrongLetters);

  if (status === "win") {
    finalMessage = "Congratualtions You Won. 😎";
    finalMessageRevealWord = `The word is ${question}`;
    playInProgress = false;
  } else if (status === "Lose") {
    finalMessage = "Unfortunately You Lost. 😕";
    finalMessageRevealWord = `...the word was ${question}`;
    playInProgress = false;
  }

  useEffect(() => {
    setPlayInProgress(playInProgress);
    return () => {};
  }, [playInProgress, setPlayInProgress]);

  if (finalMessage.length === 0) {
    return <></>;
  }

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>{finalMessage}</h2>
        {finalMessageRevealWord.length > 0 && <h3>{finalMessageRevealWord}</h3>}
        <button onClick={resetGame}>Play Again</button>
      </div>
    </div>
  );
}
