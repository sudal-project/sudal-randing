import { footer } from "@/lib/content";
import { isReleased } from "@/lib/release";
import styles from "./Footer.module.css";

export default function Footer() {
  const released = isReleased();

  return (
    <footer>
      <div className={`wrap ${styles.inner}`}>
        <span>{footer.copyright}</span>
        <span>{released ? footer.taglineReleased : footer.tagline}</span>
      </div>
    </footer>
  );
}
