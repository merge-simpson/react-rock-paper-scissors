# Rock paper scissors 

(주요 기술: Vite + React 18 + Typescript + Tailwind + Zustand)

- react 18
- react router dom v6
- vite 2.9
- typescript
- tailwind
- zustand v2

# Logic

Using matrix to notice who won.

```
// RPS: Rock Paper Scissors
const compositions = [
  ...new Set<RockPaperScissors>([currentRPS, ...currentCountersRPS]),
];

// ... (codes for validation or decision to draw)
// For example, if length of composition is not 2, no one can win.

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
```
