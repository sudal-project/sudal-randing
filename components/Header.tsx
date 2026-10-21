import { brand, header } from "@/lib/content";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.top} id="top">
      <div className={`wrap ${styles.inner}`}>
        <a className={styles.brand} href="#top" aria-label={`${brand.name} 처음으로`}>
          <img src="/assets/otter/idle.webp" alt="" width={34} height={34} />
          <b>{brand.name}</b>
          <small>{brand.nameEn}</small>
        </a>
        <a className={styles.cta} href={header.ctaHref}>
          {header.ctaLabel}
        </a>
      </div>
    </header>
  );
}
