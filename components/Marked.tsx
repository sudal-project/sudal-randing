import styles from "./shared.module.css";

/** 문구 속 ==…== 부분을 형광펜으로 칠한다 */
export default function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split(/==(.+?)==/).map((part, i) =>
        i % 2 ? (
          <mark key={i} className={styles.mark}>
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}
