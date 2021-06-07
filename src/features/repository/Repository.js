import React from "react";
import styles from "./Repository.module.css";
import RepoForm from "./RepoForm";
import { Issues } from "./Issues";

const Repository = () => {
  return (
    <div className={styles.Repository}>
      <main>
        <RepoForm />
        <Issues />
      </main>
    </div>
  );
};

export default Repository;
