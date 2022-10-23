import RockPaperScissors from "@models/game/state/domain/RockPaperScissors";

const generateRandomRPS: () => RockPaperScissors = () => {
  const list: RockPaperScissors[] = ["ROCK", "PAPER", "SCISSORS"];
  const idx = Math.floor(Math.random() * list.length);
  return list[idx];
};

export default generateRandomRPS;
