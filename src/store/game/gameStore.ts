import ContextCallbackOption from "@models/common/api/ContextCallbackOption";
import Player from "@models/game/player/Player";
import RockPaperScissors from "@models/game/state/domain/RockPaperScissors";
import PlayerGameState from "@models/game/state/PlayerGameState";
import create from "zustand";

interface GameState {
  onGame: boolean;

  self: Player;
  counters: Player[] | null;
  selfGameState: PlayerGameState | null;
  counterGameStates: PlayerGameState[] | null;

  currentRPS: RockPaperScissors | null;
  currentCountersRPS: (RockPaperScissors | null)[] | null;

  rpsHistory: RockPaperScissors[] | null;
  counterRPSHistory: RockPaperScissors[][] | null;

  setRPS: (rps: RockPaperScissors | null) => void;
  setCountersRPS: (rpsList: (RockPaperScissors | null)[] | null) => void;

  init: (option?: ContextCallbackOption) => void;
  startWithComs: (num?: number, option?: ContextCallbackOption) => boolean;
  deal: (option?: ContextCallbackOption) => void;
}

const useGameStore = create<GameState>((set, get) => {
  const confirmDeal = (
    winRPS: RockPaperScissors,
    loseRPS: RockPaperScissors
  ) => {
    type GameStateKey = { [key in RockPaperScissors]: keyof PlayerGameState };

    const gStateKey = {
      [winRPS]: "wins" as keyof PlayerGameState,
      [loseRPS]: "defeats" as keyof PlayerGameState,
    } as GameStateKey;

    set((state) => {
      const { currentRPS, currentCountersRPS } = state;

      if (
        !currentRPS ||
        !currentCountersRPS ||
        currentCountersRPS.some((_) => !_)
      ) {
        return {
          selfGameState: state.selfGameState,
          counterGameStates: state.counterGameStates,
        };
      }

      if (
        !state.selfGameState ||
        !state.counterGameStates ||
        state.counterGameStates.some((_) => !_)
      ) {
        const error = new Error(``);
        throw error;
      }

      const increasingKey = gStateKey[currentRPS];
      const countersIncreasingKeys = //
        currentCountersRPS.map<keyof PlayerGameState>((rps) => gStateKey[rps!]);

      return {
        selfGameState: {
          ...state.selfGameState,
          [increasingKey]: (state.selfGameState[increasingKey] as number) + 1,
        },
        counterGameStates: state.counterGameStates.map((gState, idx, arr) => {
          const increasingKey = countersIncreasingKeys[idx];

          return {
            ...gState,
            [increasingKey]: (arr[idx][increasingKey] as number) + 1,
          };
        }),
      };
    });
    // End of SET
  };

  const draw = () => {
    set((state) => {
      const selfGameState = state.selfGameState
        ? {
            ...state.selfGameState,
            draw: state.selfGameState.draw + 1,
            total: state.selfGameState.total + 1,
          }
        : null;
      const couterGameStates =
        state.counterGameStates?.map((gState) => ({
          ...gState,
          draw: gState.draw + 1,
          total: gState.total + 1,
        })) ?? null;
      return {
        selfGameState,
        counterGameStates: couterGameStates,
      };
    });
  };

  // Return
  return {
    onGame: false,

    self: {
      userName: "",
      nickname: "나",
      isAI: false,
    },
    counters: null,
    selfGameState: null,
    counterGameStates: null,

    currentRPS: null,
    currentCountersRPS: null,
    rpsHistory: null,
    counterRPSHistory: null,

    setRPS: (rps) => set({ currentRPS: rps }),
    setCountersRPS: (currentCountersRPS) => set({ currentCountersRPS }),

    init: (option) => {
      set({
        onGame: false,

        counters: null,
        selfGameState: null,
        counterGameStates: null,
        currentRPS: null,
        currentCountersRPS: null,
        rpsHistory: null,
        counterRPSHistory: null,
      });
      option?.success && option.success();
    },

    startWithComs: (num, option) => {
      const state = get();
      if (state.onGame) {
        return false;
      }
      if (num == null || num <= 0) {
        num = 1;
      }

      const selfGameState: PlayerGameState = {
        player: state.self,
        wins: 0,
        defeat: 0,
        draw: 0,
        total: 0,
        rpsHistory: [],
      };

      const counters = [...new Array(num)].map<Player>((_, idx) => ({
        userName: `_computer${idx + 1}`,
        nickname: `COM${idx + 1}`,
        isAI: true,
      }));

      const couterGameStates = counters.map<PlayerGameState>((player) => ({
        player,
        wins: 0,
        defeat: 0,
        draw: 0,
        total: 0,
        rpsHistory: [],
      }));

      set({
        onGame: true,

        selfGameState,
        counters,
        counterGameStates: couterGameStates,
        rpsHistory: [] as RockPaperScissors[],
        counterRPSHistory: [
          ...new Array(counters.length).fill([]),
        ] as RockPaperScissors[][],
      });
      option?.success && option.success();
      return true;
    },

    deal: (option) => {
      // 모든 사람이 낸 가위바위보가 한 종류, 세 종류이면 비김. 두 종류이면 승부가 남.
      const state = get();
      const { currentRPS, currentCountersRPS: _untypedCountersRPS } = state;

      if (
        !currentRPS ||
        !_untypedCountersRPS ||
        _untypedCountersRPS.some((_) => !_)
      ) {
        return;
      }

      const currentCountersRPS = _untypedCountersRPS as RockPaperScissors[];
      const compositions = [
        ...new Set<RockPaperScissors>([currentRPS, ...currentCountersRPS]),
      ];

      if (!compositions?.length) {
        return;
      }
      if (compositions.length !== 2) {
        draw();
        return;
      }

      const RPS_TO_IDX: { [key in RockPaperScissors]: number } = {
        ROCK: 0,
        PAPER: 1,
        SCISSORS: 2,
      };

      const l = RPS_TO_IDX[compositions[0]];
      const r = RPS_TO_IDX[compositions[1]];

      type DLR = "DRAW" | "LEFT_WIN" | "RIGHT_WIN"; // But no more draw
      const D = "DRAW";
      const R = "RIGHT_WIN";
      const L = "LEFT_WIN";
      const DEAL_MAP: DLR[][] = [
        [D, R, L],
        [L, D, R],
        [R, L, D],
      ];

      const result: DLR = DEAL_MAP[l][r];

      if (["LEFT_WIN", "RIGHT_WIN"].includes(result)) {
        const winRPS =
          result === "LEFT_WIN" ? compositions[0] : compositions[1];
        const loseRPS =
          result !== "LEFT_WIN" ? compositions[0] : compositions[1];

        confirmDeal(winRPS, loseRPS);
      } else {
        const error = new Error(`Cannot deal. Check logic.`);
        console.error(error.stack);
        return;
      }

      console.log([...(state.rpsHistory ?? []), currentRPS]);

      // set의 콜백에서 state를 꺼내어 쓸 때 순서 보장이 가장 확실함(해당 시점에 가장 갱신된 상태로 꺼냄)
      set((state) => ({
        selfGameState: state.selfGameState
          ? {
              ...state.selfGameState,
              rpsHistory: [
                ...(state.selfGameState.rpsHistory ?? []),
                currentRPS,
              ],
            }
          : state.selfGameState,

        counterGameStates: state.counterGameStates?.map(
          (gState, counterIndex) =>
            gState
              ? {
                  ...gState,
                  rpsHistory: [
                    ...gState.rpsHistory,
                    currentCountersRPS[counterIndex],
                  ],
                }
              : gState
        )!,
      }));

      option?.success && option.success();
    },
    // EOF
  };
});

export default useGameStore;
