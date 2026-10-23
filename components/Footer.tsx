import { brand, footer } from "@/lib/content";
import { isReleased } from "@/lib/release";
import styles from "./Footer.module.css";

export default function Footer() {
  const released = isReleased();

  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <span className={styles.brand}>
          <img src={brand.icon} alt="" />
          {footer.copyright}
        </span>
        <span>{released ? footer.taglineReleased : footer.tagline}</span>
      </div>
    </footer>
  );
}
