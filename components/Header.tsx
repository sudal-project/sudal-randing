import { brand, header } from "@/lib/content";
import { getDownloadUrl, isReleased } from "@/lib/release";
import shared from "./shared.module.css";
import styles from "./Header.module.css";

export default function Header() {
  const released = isReleased();

  return (
    <header className={styles.top} id="top">
      <div className={`wrap ${styles.inner}`}>
        <a className={styles.brand} href="#">
          <img src={brand.icon} alt="" />
          {brand.name}
        </a>
        <a className={`${shared.btnGo} ${styles.cta}`} href={released ? getDownloadUrl() : header.ctaHref}>
          {released ? header.ctaLabelReleased : header.ctaLabel}
        </a>
      </div>
    </header>
  );
}
