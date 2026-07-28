import { Icon } from "./Icon";
import styles from "./Kicker.module.css";

/**
 * The "NN / LABEL" section index plus its heading. The numbering is a design
 * device (an operations-document tell), not navigation.
 */
export function Kicker({
  index,
  label,
  icon,
  heading,
  id,
}: {
  index: string;
  label: string;
  icon: string;
  heading: string;
  /** Set on the <h2> so aria-labelledby can point at it. */
  id?: string;
}) {
  return (
    <div>
      <div className={styles.kicker}>
        <Icon name={icon} size={18} color="var(--cyan)" />
        {index} / {label}
      </div>
      <h2 id={id} className={styles.heading}>
        {heading}
      </h2>
    </div>
  );
}
