import { CommonDivProps } from "@models/common/props";
import RockPaperScissors from "@models/game/state/domain/RockPaperScissors";
import { FunctionComponent as FC } from "react";
import {
  FaRegHandPaper,
  FaRegHandRock,
  FaRegHandScissors,
} from "react-icons/fa";
import { GrStatusUnknown } from "react-icons/gr";

export interface CurrentRPSCellProps extends CommonDivProps {
  rps: RockPaperScissors | null;
}

const CurrentRPSCell: FC<CurrentRPSCellProps> = ({ rps, className }) => {
  return (
    <div
      className={`border rounded-md shadow-inner bg-white flex items-center justify-center p-[10%] ${className}`}
    >
      {!rps && <GrStatusUnknown className="w-full h-full" />}
      {rps === "ROCK" && <FaRegHandRock className="w-full h-full" />}
      {rps === "PAPER" && <FaRegHandPaper className="w-full h-full" />}
      {rps === "SCISSORS" && <FaRegHandScissors className="w-full h-full" />}
    </div>
  );
};

export default CurrentRPSCell;
