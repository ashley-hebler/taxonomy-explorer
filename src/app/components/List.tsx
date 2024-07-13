import { TagOrCategory } from "@/app/types";
import styles from "@/app/ui/list.module.css";

type ListProps = {
  data: TagOrCategory[];
  label: string;
};

// convert html entities to special characters
const convertToSpecial = (str: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

// pretty numbers
const prettyNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ArrowComponent = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);
const List = ({ data, label }: ListProps) => {
  return (
    <section>
      <h3 className={styles.heading}>Top 10 most used {label}:</h3>
      <ul className={styles.list}>
        {data.map((item) => (
          <li className={styles.item} key={item.id}>
            <span className={styles.title}>{convertToSpecial(item.name)}</span>
            <a href={item.link} className={styles.link} title="total articles">
              {prettyNumber(item.count)}
              <ArrowComponent />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default List;
