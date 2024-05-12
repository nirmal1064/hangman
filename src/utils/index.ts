export function checkWin(
  question: string,
  correctLetters: string[],
  wrongLetters: string[]
) {
  let status = "win";
  question.split("").forEach((letter) => {
    if (!correctLetters.includes(letter)) {
      status = "";
    }
  });
  if (wrongLetters.length === 6) {
    status = "Lose";
  }
  return status;
}
