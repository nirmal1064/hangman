export async function getQuestion() {
  try {
    const response = await fetch(
      "https://random-word.ryanrk.com/api/en/word/random"
    );
    const result = await response.json();
    return result[0];
  } catch (error) {
    const words: string[] = [
      "destrer",
      "bemixing",
      "fleckiest",
      "essenwood",
      "endemic",
      "Weisman",
      "Exeland",
      "misadd",
      "aposteme",
      "behaving"
    ];
    return words[Math.floor(Math.random() * words.length)];
  }
}

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
