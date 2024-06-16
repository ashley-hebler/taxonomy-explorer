import styles from "@/app/ui/examples.module.css";
import { MAINSREAM_SITES, NEWSPACK_SITES } from "@/app/lib/sites";
const SITES = [...MAINSREAM_SITES, ...NEWSPACK_SITES];
import { useState } from "react";
// randomize delay of animation
const randomDelay = () => Math.floor(Math.random() * 1000);
const List = ({ onSelection }) => {
  const [selected, setSelected] = useState("");
  function handleClick(e) {
    setSelected(e.target.textContent);
    onSelection(e.target.dataset.url);
  }
  return (
    <section>
      <ul className={styles.list}>
        {SITES.map((site) => (
          <li
            className={`${styles.item} ${selected === site.name ? styles.selected : ""}`}
            style={{ animationDelay: `${randomDelay()}ms` }}
            key={site.name}
            onClick={handleClick}
            data-url={site.link}
          >
            {site.name}
          </li>
        ))}
      </ul>
    </section>
  );
};
export default List;
