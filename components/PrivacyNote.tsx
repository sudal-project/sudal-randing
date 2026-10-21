import { privacyNote } from "@/lib/content";
import styles from "./PrivacyNote.module.css";

export default function PrivacyNote() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className={styles.note}>
          <img src={privacyNote.image} alt="" width={72} height={72} />
          <div>
            <h3>{privacyNote.heading}</h3>
            <ul className={styles.list}>
              {privacyNote.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
