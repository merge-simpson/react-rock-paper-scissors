# Rock paper scissors 

(주요 기술: Vite + React 18 + Typescript + Tailwind + Zustand)

- react 18
- react router dom v6
- vite 2.9
- typescript
- tailwind
- zustand v2

# Logic

승부를 가늠하기 위하여 행렬을 사용하는 로직.
Used matrix to notice who won.

```
// RPS: Rock Paper Scissors
const compositions = [
  ...new Set<RockPaperScissors>([currentRPS, ...currentCountersRPS]),
];

// ... (codes for validation or decision to draw)
// For example, if length of composition is not 2, no one can win.
```

승부를 가늠하기 위한 행렬을 만든다.

```
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

// 승부를 가늠하는 행렬(Matrix to decide winner group)
const DEAL_MAP: DLR[][] = [
  [D, R, L],
  [L, D, R],
  [R, L, D],
];
```

다음처럼 인덱싱하여 승부를 한 번에 확인할 수 있다.
Index will let you know which group won.

```
// expected: one of "LEFT_WIN" or "RIGHT_WIN"
const result: DLR = DEAL_MAP[l][r];
```
