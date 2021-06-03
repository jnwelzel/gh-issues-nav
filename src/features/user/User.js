import React from "react";
import { useParams } from "react-router";

import styles from "./User.module.css";

const User = () => {
  const { user } = useParams();
  return (
    <div className={styles.User}>
      <header>
        <h1>2. Choose a repository</h1>
      </header>
      <main>
        <h2>{user}</h2>
      </main>
    </div>
  );
};

export default User;
