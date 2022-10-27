# Rock paper scissors

(Vite + React + Typescript + Tailwind + Zustand)

- react 18
- react router dom v6
- vite 2.9
- typescript
- tailwind
- zustand v2

# Run

프로젝트 루트 경로에서 터미널에 명령어 입력.

### 의존성 설치

```
npm i
```

### 실행

`localhost:3030`에서 확인할 수 있도록 함.

```
npm run dev
```

# Logic

승부를 가늠하기 위하여 행렬을 사용하는 로직.

Matrix to notice who won.

### 승부 결정 행렬

```typescript
type GameResult = "DRAW" | "LEFT_WIN" | "RIGHT_WIN";
const D = "DRAW";
const R = "RIGHT_WIN";
const L = "LEFT_WIN";

// Matrix to decide winner group
const DEAL_MAP: GameResult[][] = [
  [D, R, L],
  [L, D, R],
  [R, L, D],
];
```

다음처럼 인덱싱하여 승부를 한 번에 확인할 수 있다. `DEAL_MAP[l][r]`

Index tells the winner group or draw. As `DEAL_MAP[l][r]`

`l`, `r` in `[0, 1, 2]` which means ["ROCK", "PAPER", "SCISSORS"]

```typescript
const result: GameResult = DEAL_MAP[l][r];
```

DEAL_MAP 행렬은 지속적으로 사용되므로 재사용 가능하도록(매번 생성하지 않도록) 리팩토링 하는 것이 좋음.

### 가위바위보 낸 조합

```typescript
// RPS: Rock Paper Scissors
const compositions = [
  ...new Set<RockPaperScissors>([currentRPS, ...currentCountersRPS]),
];

/* ... (Codes)
 *  유효성(validation) 체크 또는(or) 비김(draw) 판정 로직
 *  예를 들어, `composisions`의 길이가 2가 아니면 승부가 나뉘지 않는다(1, 3이면 비김. 0이면 이상함.).
 *  For example, if the length of `compositions` is not 2, no one can win.
 */
```

### ROCK -> 0, PAPER -> 1, SCISSORS -> 2

```typescript
const RPS_TO_IDX: { [key in RockPaperScissors]: number } = {
  ROCK: 0,
  PAPER: 1,
  SCISSORS: 2,
};

// const [l, r] = compositions.map((rps) => RPS_TO_IDX[rps]);
const l = RPS_TO_IDX[compositions[0]];
const r = RPS_TO_IDX[compositions[1]];

const result: GameResult = DEAL_MAP[l][r];
```
