import { CommonDivProps } from "@models/common/props";
import Player from "@models/game/player/Player";
import RockPaperScissors from "@models/game/state/domain/RockPaperScissors";
import PlayerGameState from "@models/game/state/PlayerGameState";
import { FunctionComponent as FC } from "react";
import CurrentRPSCell from "./widgets/CurrentRPSCell";

export interface PlayerGamePannelProps extends CommonDivProps {
  player: Player;
  currentRPS: RockPaperScissors | null;
  gameState: PlayerGameState | null;
}

const PlayerGamePannel: FC<PlayerGamePannelProps> = ({
  player,
  currentRPS,
  gameState,
  className,
}) => {
  return (
    <section className={`flex flex-col gap-4 px-4 ${className}`}>
      <h1 className="text-lg font-bold">{player.nickname}</h1>
      <section className="border min-h-[5rem] rounded bg-gray-50 shadow-inner px-4 py-8 flex flex-col gap-4">
        {/* 주 게임판 */}
        <section className="grid grid-cols-4 gap-4">
          <article className="col-span-3 flex flex-col justify-between">
            <h1 className="text-lg font-bold">State</h1>
            <CurrentRPSCell
              className="border-dark w-[16rem] h-[16rem]"
              rps={currentRPS}
            />
          </article>
          {/* 히스토리 */}
          <aside className="border p-2 w-[5.5rem] bg-white shadow-inner h-[21rem]">
            <h1 className="text-lg font-bold">History</h1>
            <ol className="grid grid-cols-2 gap-1">
              {[...(gameState?.rpsHistory ?? [])]
                ?.reverse()
                .slice(1, 13)
                .map((rps, idx) => (
                  <li
                    key={`RPS-HISTORY-${idx}`}
                    className={`${0 === idx ? "col-span-2 row-span-2" : ""}`}
                  >
                    <CurrentRPSCell
                      className={`p-2 ${!idx ? "" : ""}`}
                      rps={rps}
                    />
                  </li>
                ))}
              {!gameState?.rpsHistory?.length && (
                <li className="col-span-2 row-span-2">
                  <CurrentRPSCell className="p-2" rps={null} />
                </li>
              )}
            </ol>
          </aside>
        </section>
        <ul>
          <li>WIN: {gameState?.win}</li>
          <li>DEFEAT: {gameState?.defeat}</li>
          <li>DRAW: {gameState?.draw}</li>
          <li>(TOTAL: {gameState?.total})</li>
        </ul>
      </section>
    </section>
  );
};

export default PlayerGamePannel;
