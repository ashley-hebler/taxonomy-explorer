// app/page.js
import React from "react";
import Main from "./components/Main";

import styles from "@/app/ui/page.module.css";


const Page = async () => {
  // const initialData = await fetchInitialData();
  return (
    <>
      <header className={styles.header}>
        <h1>Taxonomy inspector</h1>
        <p>Inspect the tags and categories of any <strong>WordPress</strong> site</p>
      </header>
      <main className={styles.main}>
        <Main />
      </main>
      <footer className={styles.footer}>
        <div>
          <p>No one: How do other sites handle their taxonomy?</p>
          <p>Me: I&apos;m glad you asked</p>
        </div>
      </footer>
    </>
  );
};

export default Page;
