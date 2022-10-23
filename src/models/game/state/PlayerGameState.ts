import Player from "../player/Player";
import RockPaperScissors from "./domain/RockPaperScissors";

export default interface PlayerGameState {
  player: Player;
  win: number;
  defeat: number;
  draw: number;
  total: number;
  rpsHistory: RockPaperScissors[];
}
