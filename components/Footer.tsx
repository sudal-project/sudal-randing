import { footer } from "@/lib/content";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={`wrap ${styles.inner}`}>
        <span>{footer.copyright}</span>
        <span>{footer.tagline}</span>
      </div>
    </footer>
  );
}
