import React from "react";
import { useParams } from "react-router";
import Template from "../../Template";

import styles from "./Repo.module.css";

const Repo = () => {
  const { user, repo } = useParams();
  return (
    <Template>
      <div className={styles.Repo}>
        <header>
          <h1>3. Choose an issue</h1>
        </header>
        <main>
          <h2>
            {user} / {repo}
          </h2>
          <form>
            <input type="search" name="query" placeholder="Memory leak" />
            <button type="submit">Search</button>
          </form>
          <div className={styles.sidebar}>Status: open / closed</div>
          <div>Issues</div>
        </main>
      </div>
    </Template>
  );
};

export default Repo;
