import {
  FaHandPaper,
  FaHandRock,
  FaHandScissors,
  FaRegHandPaper,
  FaRegHandRock,
  FaRegHandScissors,
} from "react-icons/fa";
import { FunctionComponent as FC } from "react";
import RockPaperScissors from "@models/game/state/domain/RockPaperScissors";
import { DarkButton } from "@styles/button";

export interface ControlPannelProps {
  rps: RockPaperScissors | null;
  setRPS: (rps: RockPaperScissors) => void;
  onGame: boolean;
  onDeal: (
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
}

const ControlPannel: FC<ControlPannelProps> = ({
  rps,
  setRPS,
  onGame,
  onDeal,
}) => {
  return (
    <section className="flex gap-4 select-none">
      <div className="flex gap-2">
        {/* Rock */}
        <button
          className={`border p-4 rounded-md ${
            rps === "ROCK" ? "bg-white" : "bg-light"
          }`}
          onClick={() => setRPS("ROCK")}
        >
          {rps === "ROCK" ? (
            <FaHandRock className="fill-primary" />
          ) : (
            <FaRegHandRock />
          )}
        </button>

        {/* Paper */}
        <button
          className={`border p-4 rounded-md ${
            rps === "PAPER" ? "bg-white" : "bg-light"
          }`}
          onClick={() => setRPS("PAPER")}
        >
          {rps === "PAPER" ? (
            <FaHandPaper className="fill-primary" />
          ) : (
            <FaRegHandPaper />
          )}
        </button>

        {/* Scissors */}
        <button
          className={`border p-4 rounded-md ${
            rps === "SCISSORS" ? "bg-white" : "bg-light"
          }`}
          onClick={() => setRPS("SCISSORS")}
        >
          {rps === "SCISSORS" ? (
            <FaHandScissors className="fill-primary" />
          ) : (
            <FaRegHandScissors />
          )}
        </button>
      </div>
      <div className="flex justify-end">
        <DarkButton
          // disabled={!onGame}
          onClick={onDeal}
        >
          제출
        </DarkButton>
      </div>
    </section>
  );
};

export default ControlPannel;
