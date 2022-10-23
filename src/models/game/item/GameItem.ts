import GameItemType from "./domain/GameItemType";

export default interface GameItem {
  id: string;
  name: string;
  content: string;
  type: GameItemType;
}
