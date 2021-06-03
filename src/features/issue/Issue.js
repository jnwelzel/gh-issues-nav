import React from "react";
import { useParams } from "react-router";

import styles from "./Issue.module.css";

const Issue = () => {
  const { user, repo, issue } = useParams();
  return (
    <div className={styles.Issue}>
      <header>
        <h1>Issue #{issue}</h1>
      </header>
      <main>
        <h2>
          {user} / {repo} / {issue}
        </h2>
      </main>
    </div>
  );
};

export default Issue;
