import { privacy } from "@/lib/content";
import shared from "./shared.module.css";
import styles from "./Privacy.module.css";

const icons = {
  keyboard: (
    <>
      <rect x="1" y="5" width="20" height="13" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M5 9h2M9 9h2M13 9h2M7 13h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  clock: (
    <>
      <circle cx="11" cy="11" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M11 6v5l3 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  home: (
    <>
      <path d="M3 9l8-6 8 6v10H3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 19v-5h4v5" fill="none" stroke="currentColor" strokeWidth="2" />
    </>
  ),
};

export default function Privacy() {
  return (
    <section className={`${shared.block} ${styles.section}`}>
      <div className="wrap">
        <div className={styles.privacy}>
          <img src={privacy.image} alt="" />
          <div>
            <h2 className={`${shared.h2} ${styles.h2}`}>{privacy.heading}</h2>
            <ul>
              {privacy.items.map((item) => (
                <li key={item.title}>
                  <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                    {icons[item.icon]}
                  </svg>
                  <div>
                    <b>{item.title}</b>
                    <span>{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
