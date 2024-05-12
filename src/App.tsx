import { useEffect, useState } from "react";
import "./App.css";
import Answer from "./components/Answer";
import Figure from "./components/Figure";
import Header from "./components/Header";
import Notification from "./components/Notification";
import PopupMessage from "./components/PopupMessage";
import WrongLetters from "./components/WrongLetters";
import { getQuestion } from "./utils";

function App() {
  const [playInProgress, setPlayInProgress] = useState(true);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [question, setQuestion] = useState("");
  const [questionLoaded, setQuestionLoaded] = useState(false);

  async function loadQuestion() {
    const newQuestion = await getQuestion();
    setQuestion(newQuestion);
    setQuestionLoaded(true);
  }

  function resetGame() {
    setPlayInProgress(true);
    setQuestionLoaded(false);
    setCorrectLetters([]);
    setWrongLetters([]);
    loadQuestion();
  }

  useEffect(() => {
    loadQuestion();
  }, []);

  useEffect(() => {
    function displayAndHideNotification() {
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }

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
        }
      } else {
        if (wrongLetters.includes(letter)) {
          displayAndHideNotification();
        } else {
          setWrongLetters(() => [...wrongLetters, letter]);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [correctLetters, playInProgress, question, wrongLetters]);

  if (!questionLoaded) {
    return <></>;
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Answer question={question} correctLetters={correctLetters} />
      </div>
      <PopupMessage
        question={question}
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        setPlayInProgress={setPlayInProgress}
        resetGame={resetGame}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
