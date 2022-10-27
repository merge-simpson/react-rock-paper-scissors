import ContextCallbackOption from "@models/common/api/ContextCallbackOption";
import Player from "@models/game/player/Player";
import RockPaperScissors from "@models/game/state/domain/RockPaperScissors";
import PlayerGameState from "@models/game/state/PlayerGameState";
import create from "zustand";

export type RPSResult = "DRAW" | "LEFT_WIN" | "RIGHT_WIN";

interface GameState {
  onGame: boolean;

  self: Player;
  counters: Player[] | null;
  selfGameState: PlayerGameState | null;
  counterGameStates: PlayerGameState[] | null;

  currentRPS: RockPaperScissors | null;
  currentCountersRPS: (RockPaperScissors | null)[] | null;

  setRPS: (rps: RockPaperScissors | null) => void;
  setCountersRPS: (rpsList: (RockPaperScissors | null)[] | null) => void;

  init: (option?: ContextCallbackOption) => void;
  startWithComs: (num?: number, option?: ContextCallbackOption) => boolean;
  deal: (option?: ContextCallbackOption) => void;
}

const useGameStore = create<GameState>((set, get) => {
  // 이 정도 스코프에 생성해 둘 수 있음(재사용성).
  const D = "DRAW";
  const R = "RIGHT_WIN";
  const L = "LEFT_WIN";
  const DEAL_MAP: RPSResult[][] = [
    [D, R, L],
    [L, D, R],
    [R, L, D],
  ];

  Object.freeze(DEAL_MAP);

  /** Confirms deal
   * @param winRPS  The win state. One of "ROCK", "PAPER", "SCISSORS" or null.
   * @param loseRPS The lose state. One of "ROCK", "PAPER", "SCISSORS" or null.
   * @param drawRPSList Can skip and nullable. The draw state. A 1D list of "ROCK", "PAPER", "SCISSORS" and not be duplicated.
   */
  const confirmDeal = (
    winRPS: RockPaperScissors | null,
    loseRPS: RockPaperScissors | null,
    drawRPSList?: RockPaperScissors[] | null
  ) => {
    type GameStateKey = { [key in RockPaperScissors]: keyof PlayerGameState };

    const gStateKey = {} as GameStateKey;
    winRPS && (gStateKey[winRPS] = "win");
    loseRPS && (gStateKey[loseRPS] = "defeat");
    drawRPSList?.forEach((drawRPS) => (gStateKey[drawRPS] = "draw"));

    // set의 콜백에서 state를 꺼내어 쓸 때 순서 보장이 가장 확실함(해당 시점에 가장 갱신된 상태로 꺼냄)
    // 특히 이 경우 useCallback을 사용할 수 없는 영역에서 생성하는 함수이므로
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
        const error = new Error(
          `Someone didn't send any state of Rock Paper Scissors.`
        );
        throw error;
      }

      const increasingKey = gStateKey[currentRPS];
      const countersIncreasingKeys = //
        currentCountersRPS.map<keyof PlayerGameState>((rps) => gStateKey[rps!]);

      return {
        selfGameState: {
          ...state.selfGameState,
          [increasingKey]: (state.selfGameState[increasingKey] as number) + 1,
          total: state.selfGameState.total + 1,
          rpsHistory: [...(state.selfGameState.rpsHistory ?? []), currentRPS],
        },
        counterGameStates: state.counterGameStates.map((gState, idx, arr) => {
          const increasingKey = countersIncreasingKeys[idx];

          return {
            ...gState,
            [increasingKey]: (arr[idx][increasingKey] as number) + 1,
            total: arr[idx].total + 1,
            rpsHistory: [...gState.rpsHistory, currentCountersRPS[idx]!],
          };
        }),
      };
    });
    // End of confirmDeal
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
        win: 0,
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
        win: 0,
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
        confirmDeal(null, null, compositions);
        return;
      }

      const RPS_TO_IDX: { [key in RockPaperScissors]: number } = {
        ROCK: 0,
        PAPER: 1,
        SCISSORS: 2,
      };

      const l = RPS_TO_IDX[compositions[0]];
      const r = RPS_TO_IDX[compositions[1]];

      const result: RPSResult = DEAL_MAP[l][r];

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

      option?.success && option.success();
    },
    // EOF
  };
});

export default useGameStore;
