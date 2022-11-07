import { CommonDivProps } from "@models/common/props";
import Player from "@models/game/player/Player";
import RockPaperScissors from "@models/game/state/domain/RockPaperScissors";
import PlayerGameState from "@models/game/state/PlayerGameState";
import { FunctionComponent as FC, useLayoutEffect, useRef } from "react";
import CurrentRPSCell from "./widgets/CurrentRPSCell";

export interface PlayerGamePannelProps extends CommonDivProps {
  player: Player;
  currentRPS: RockPaperScissors | null;
  gameState: PlayerGameState | null;
  historyScrollTop?: number;
  setHistoryScrollTop?: (historyScrollTop: number) => void;
}

const PlayerGamePannel: FC<PlayerGamePannelProps> = ({
  player,
  currentRPS,
  gameState,
  className,
  historyScrollTop,
  setHistoryScrollTop,
}) => {
  const currentBoxRef = useRef<HTMLDivElement | null>(null);
  const historyBoxRef = useRef<HTMLDivElement | null>(null);
  const historyOLRef = useRef<HTMLOListElement | null>(null);

  useLayoutEffect(() => {
    if (!currentBoxRef.current) return;
    if (!historyBoxRef.current) return;

    const resize = () => {
      if (!currentBoxRef.current) return;
      if (!historyBoxRef.current) return;

      const windowSize = window.innerWidth;
      if (windowSize < 768) {
        return;
      }

      historyBoxRef.current.style.height =
        `${currentBoxRef.current?.offsetHeight}px` ?? "auto";
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, [currentBoxRef.current, historyBoxRef.current]);

  useLayoutEffect(() => {
    if (historyScrollTop == null || !historyOLRef.current) return;

    historyOLRef.current.scrollTo({ top: historyScrollTop });
    console.log("historyScrollTop", historyScrollTop);
  }, [historyScrollTop]);

  return (
    <section className={`flex flex-col gap-4 px-4 ${className}`}>
      <h1 className="md:text-lg font-bold">{player.nickname}</h1>
      <section className="border min-h-[5rem] rounded bg-gray-50 shadow-inner px-4 py-8 flex flex-col gap-4">
        {/* 주 게임판 */}
        <section className="grid md:grid-cols-4 gap-4">
          {/* Current RPS Box */}
          <article
            ref={currentBoxRef}
            className="h-fit md:col-span-3 flex flex-col"
          >
            <h1 className="md:text-lg font-bold">State</h1>
            <CurrentRPSCell className="border-dark" rps={currentRPS} />
          </article>

          {/* 히스토리 */}
          <aside
            ref={historyBoxRef}
            className="flex flex-col gap-2 border p-2 bg-white shadow-inner"
            style={{ height: currentBoxRef.current?.offsetHeight ?? "auto" }}
          >
            <h1 className="text-sm lg:text-lg font-bold h-fit">History</h1>
            <ol
              ref={historyOLRef}
              className="flex flex-col items-center gap-1 flex-auto overflow-scroll"
              onScroll={(evt) => {
                setHistoryScrollTop &&
                  setHistoryScrollTop((evt.target as HTMLElement).scrollTop);
              }}
            >
              {[...(gameState?.rpsHistory ?? [])]
                ?.reverse()
                .slice(1, 13)
                .map((rps, idx) => (
                  <li
                    key={`RPS-HISTORY-${idx}`}
                    className={`w-1/3 md:w-full ${
                      0 === idx ? "md:col-span-2 md:row-span-2" : ""
                    }`}
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
