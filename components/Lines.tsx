import { Fragment } from "react";

/** 줄 배열을 <br>로 이어 붙인다. */
export default function Lines({ lines }: { lines: readonly string[] }) {
  return lines.map((line, index) => (
    <Fragment key={line}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}
