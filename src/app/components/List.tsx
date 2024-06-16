import styles from "@/app/ui/list.module.css";
const List = ({ data, label }) => {
  return (
    <section>
      <ul className={styles.list}>
        {data.map((item) => (
          <li className={styles.item} key={item.id}>
            <a className={styles.link} href={item.link}>
              {item.name} - <span title="total articles">{item.count}</span>{" "}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default List;
