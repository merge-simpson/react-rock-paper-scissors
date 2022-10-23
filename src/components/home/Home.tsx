import Player from "@models/game/player/Player";
import RockPaperScissors from "@models/game/state/domain/RockPaperScissors";
import useToast from "@store/common/useToast";
import useGameStore from "@store/game/gameStore";
import { DarkButton, DefaultButton } from "@styles/button";
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
        <main className="w-[80vw] flex flex-col items-center gap-4 py-8 border shadow rounded-md">
          <h1 className="text-2xl font-bold">Game Board</h1>
          <div className="w-full px-4 flex justify-end">
            {onGame && (
              <DefaultButton onClick={() => initGame()}>초기화</DefaultButton>
            )}
            {!onGame && (
              <DarkButton disabled={onGame} onClick={() => startWithComs(0)}>
                시작
              </DarkButton>
            )}
          </div>
          <section className="w-full grid grid-cols-2 divide-x-2 px-4">
            <PlayerGamePannel
              player={self}
              currentRPS={currentRPS}
              gameState={selfGameState}
            />
            {!counters?.length && (
              <div className="px-4">
                <div className="border font-bold h-full rounded bg-gray-50 shadow-inner flex justify-center items-center">
                  상대방이 입장하지 않았습니다.
                </div>
              </div>
            )}
            {!!counters &&
              counters.map((counter, idx) => (
                <PlayerGamePannel
                  key={`COUNTER-${idx}`}
                  player={counter}
                  currentRPS={
                    (couterGameStates && couterGameStates[idx].rpsHistory[0]) ??
                    null
                  }
                  gameState={
                    (couterGameStates && couterGameStates[idx]) ?? null
                  }
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
