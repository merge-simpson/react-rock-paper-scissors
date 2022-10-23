import { FunctionComponent as FC } from "react";
import { ProceedState } from "../LoginButtonGroup";

export interface ProceedButtonContentProps {
  state: ProceedState;
}

const ProceedButtonContent: FC<ProceedButtonContentProps> = ({ state }) => {
  if (!["NEXT", "LOGIN"].includes(state)) {
    return <>상태 오류</>;
  }

  if ("LOGIN" === state) {
    return <span className="font-bold">LOGIN</span>;
  }

  return (
    <>
      Next
      <span className="font-bold">&gt;</span>
    </>
  );
};

export default ProceedButtonContent;
