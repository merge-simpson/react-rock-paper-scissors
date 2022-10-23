import Player from "../player/Player";
import RockPaperScissors from "./domain/RockPaperScissors";

export default interface PlayerGameState {
  player: Player;
  wins: number;
  defeat: number;
  draw: number;
  total: number;
  rpsHistory: RockPaperScissors[];
}
