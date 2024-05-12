import { useEffect, useState } from "react";
import "./App.css";
import Answer from "./components/Answer";
import Figure from "./components/Figure";
import Header from "./components/Header";
import WrongLetters from "./components/WrongLetters";
import PopupMessage from "./components/PopupMessage";
import Notification from "./components/Notification";

const words: string[] = ["javascript", "cpp", "java"];
let question = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playInProgress, setPlayInProgress] = useState(true);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  // const [showPopup, setShowPopup] = useState(false);
  // const [message, setMessage] = useState("");
  // const [gameStatus, setGameStatus] = useState<"Win" | "Lost" | "">("");

  function resetGame() {
    setPlayInProgress(true);
    setCorrectLetters([]);
    setWrongLetters([]);
    question = words[Math.floor(Math.random() * words.length)];
  }

  useEffect(() => {
    function displayAndHideNotification() {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }

    // function checkWinOrLose() {
    //   let isGameOver = true;
    //   let status: "Win" | "Lost" | "" = "Win";

    //   console.log(correctLetters);

    //   question.split("").forEach((letter) => {
    //     if (!correctLetters.includes(letter)) {
    //       status = "";
    //       isGameOver = false;
    //     }
    //   });

    //   if (wrongLetters.length == 6) {
    //     setMessage("Unfortunately You Lost. 😕");
    //     setGameStatus("Lost");
    //   }

    //   if (isGameOver) {
    //     setPlayInProgress(false);
    //     setShowPopup(true);
    //   }
    //   if (status === "Win") {
    //     setMessage("Congratualtions You Won. 😎");
    //     setGameStatus("Win");
    //   }
    // }

    function handleKeyDown(e: KeyboardEvent) {
      const isAlphabet = /^[a-zA-Z]$/;
      const { key } = e;
      if (!playInProgress) return;
      if (!isAlphabet.test(key)) return;
      const letter = key.toLowerCase();
      if (question.includes(letter)) {
        if (correctLetters.includes(letter)) {
          displayAndHideNotification();
        } else {
          setCorrectLetters(() => [...correctLetters, letter]);
          // setCorrectLetters((prevLetters) => [...prevLetters, letter]);
        }
      } else {
        if (wrongLetters.includes(letter)) {
          displayAndHideNotification();
        } else {
          setWrongLetters(() => [...wrongLetters, letter]);
          // setWrongLetters((prevLetters) => [...prevLetters, letter]);
        }
      }
      console.log(correctLetters);
      // checkWinOrLose();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [correctLetters, playInProgress, wrongLetters]);

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Answer question={question} correctLetters={correctLetters} />
      </div>
      {/* {showPopup && (
        <PopupMessage message={message} status={gameStatus} word={question} />
      )} */}
      <PopupMessage
        question={question}
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        setPlayInProgress={setPlayInProgress}
        resetGame={resetGame}
      />
      {<Notification showNotification={showNotification} />}
    </>
  );
}

export default App;
