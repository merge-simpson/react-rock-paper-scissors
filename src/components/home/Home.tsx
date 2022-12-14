import RockPaperScissors from "@models/game/state/domain/RockPaperScissors";
import useToast from "@utils/common/toast/store/useToast";
import useGameStore from "@store/game/gameStore";
import { DarkButton, DefaultButton } from "@styles/button";
import IntegerInput from "@utils/common/form/IntegerInput";
import { useCallback, useEffect, useState } from "react";
import ControlPannel from "./game/layout/control/ControlPannel";
import PlayerGamePannel from "./game/layout/player-pannel/PlayerGamePannel";

const Home = () => {
  const toast = useToast();
  const gameStore = useGameStore();
  const {
    onGame,
    self,
    counters,
    selfGameState,
    counterGameStates: couterGameStates,

    currentRPS,
    currentCountersRPS,
    setRPS,
    setCountersRPS,

    init: initGame,
    startWithComs,
    deal,
  } = gameStore;

  const [cntCounterAI, setCntCounterAI] = useState<number>(1);
  const [historyScrollTop, setHistoryScrollTop] = useState<number>(0);

  useEffect(() => {
    // not necessary on this logic
    initGame();
  }, []);

  useEffect(() => {
    setCountersRPS([...new Array(couterGameStates?.length)].fill(null));
  }, [couterGameStates?.length]);

  const doDealAction = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      // Execute deal action
      if (!onGame) {
        toast.open("Game not started.");
        return;
      }
      if (!currentRPS) {
        toast.open("Select one of the Rock, Paper, Scissors.");
        return;
      }

      const getCounterRPS = () => {
        if (!currentCountersRPS) {
          const error = new Error(`No current counter rps generated.`);
          throw error;
        }

        const countersRPS =
          counters?.map((counter, idx) => {
            const RPSList = //
              ["ROCK", "PAPER", "SCISSORS"] as RockPaperScissors[];
            const rps = counter.isAI
              ? RPSList[Math.floor(Math.random() * 3)]
              : currentCountersRPS[idx];

            return rps;
          }) ?? null;

        setCountersRPS(countersRPS);
      };

      getCounterRPS();
      deal();
    },
    [currentRPS, currentCountersRPS]
  );

  return (
    <div>
      <h1 className="text-2xl">Rock Paper Scissors</h1>
      <div className="flex flex-col items-center gap-4">
        <main className="w-[80vw] max-h-[85vh] flex flex-col items-center gap-4 py-8 border shadow rounded-md">
          <h1 className="text-2xl font-bold">Game Board</h1>
          <div className="w-full px-4 flex flex-col gap-2 items-end">
            <aside className="w-fit px-2 flex flex-col gap-2">
              <h1 className="font-bold">Set COMs</h1>
              {/* Mk Component props: {disabled: boolean, onNagativeClick, onPositiveClick, min, max, ... } */}
              <div className="flex gap-2 items-center">
                <button
                  className="flex justify-center items-center border shadow rounded-full w-10 h-10"
                  disabled={onGame}
                  onClick={() => {
                    const min = 1;
                    setCntCounterAI(
                      cntCounterAI - +(min != null ? cntCounterAI > min : 1)
                    );
                  }}
                >
                  -
                </button>
                <IntegerInput
                  readOnly
                  className="border border-dark w-10 text-right px-1 py-2 rounded-md text-xl font-bold"
                  value={cntCounterAI}
                  onChange={(event) =>
                    setCntCounterAI(+(event.target as HTMLInputElement).value)
                  }
                />
                <button
                  className="flex justify-center items-center border shadow rounded-full w-10 h-10"
                  disabled={onGame}
                  onClick={() => {
                    const max = undefined;
                    setCntCounterAI(
                      cntCounterAI + +(max != null ? cntCounterAI < max : 1)
                    );
                  }}
                >
                  +
                </button>
              </div>
            </aside>
            {onGame && (
              <DefaultButton onClick={() => initGame()}>?????????</DefaultButton>
            )}
            {!onGame && (
              <DarkButton
                disabled={onGame}
                onClick={() => startWithComs(cntCounterAI)}
              >
                ??????
              </DarkButton>
            )}
          </div>
          <section className="w-full grid grid-cols-2 px-4 max-h-[38rem] overflow-scroll">
            {/* Player's Game Pannel: ???????????? ????????? ????????? ????????? ?????? ????????? ????????? ??? ??????. */}
            <PlayerGamePannel
              className="py-4"
              player={self}
              currentRPS={currentRPS}
              gameState={selfGameState}
              historyScrollTop={historyScrollTop}
              setHistoryScrollTop={setHistoryScrollTop}
            />
            {!counters?.length && (
              <div className="px-4 border-l-2">
                <div className="border font-bold h-full rounded bg-gray-50 shadow-inner flex justify-center items-center">
                  ???????????? ???????????? ???????????????.
                </div>
              </div>
            )}
            {/* Counters' Game Pannels */}
            {!!counters &&
              counters.map((counter, idx) => (
                <PlayerGamePannel
                  key={`COUNTER-${idx}`}
                  className={`py-4 ${!(idx & 1) ? "border-l-2" : ""} ${
                    idx > 0 ? "border-t-2" : ""
                  }`}
                  player={counter}
                  currentRPS={
                    (couterGameStates &&
                      couterGameStates[idx].rpsHistory.at(-1)) ??
                    null
                  }
                  gameState={
                    (couterGameStates && couterGameStates[idx]) ?? null
                  }
                  historyScrollTop={historyScrollTop}
                  setHistoryScrollTop={setHistoryScrollTop}
                />
              ))}
          </section>
          <div>
            <ControlPannel
              onGame={onGame}
              rps={currentRPS}
              setRPS={setRPS}
              onDeal={doDealAction}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
