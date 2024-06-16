import { useState, useEffect } from "react";
import List from "@/app/components/List";
import styles from "@/app/ui/toggler.module.css";

interface Settings {
  title: string;
  description: string;
  url: string;
  logo: string;
}

// checkbox toggle
const Toggler = ({ categories, tags, site }) => {
  const [selected, setSelected] = useState("categories");
  const createInitials = (name: string) => {
    const parts = name.split(" ");
    return parts
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
  };

  return (
    <div>
      <header>
        <div className={styles.logo}>
          {site.site_icon_url.length > 1 && (
            <img
              className={styles.avatar}
              src={site.site_icon_url}
              alt={site.name}
            />
          )}
          {site.site_icon_url.length === 0 && (
            <div className={styles.avatar}>
              <span>{createInitials(site.name)}</span>
            </div>
          )}
        </div>
        <h2>{site.name}</h2>
        <p>{site.description}</p>
      </header>
      <div className={styles.tabs}>
        <ul className={styles.items}>
          <li
            className={`${styles.glider} ${
              selected === "categories" ? styles.gliderLeft : styles.gliderRight
            }`}
            aria-hidden="true"
          ></li>
          <li className={styles.item}>
            <input
              type="radio"
              value="categories"
              checked={selected === "categories"}
              onChange={(e) => setSelected(e.target.value)}
              id="categories"
              className={styles.input}
            />
            <label
              className={`${styles.label} ${
                selected === "categories" ? styles.selected : ""
              }`}
              htmlFor="categories"
            >
              Categories
            </label>
          </li>
          <li className={styles.item}>
            <input
              type="radio"
              value="tags"
              checked={selected === "tags"}
              onChange={(e) => setSelected(e.target.value)}
              id="tags"
              className={styles.input}
            />

            <label
              className={`${styles.label} ${
                selected === "tags" ? styles.selected : ""
              }`}
              htmlFor="tags"
            >
              Tags
            </label>
          </li>
        </ul>
      </div>

      {selected === "categories" && (
        <List data={categories} label="categories" />
      )}
      {selected === "tags" && <List data={tags} label="tags" />}
    </div>
  );
};
export default Toggler;
