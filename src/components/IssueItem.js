import React from "react";
import PropTypes from "prop-types";

import styles from "./IssueItem.module.css";

const IssueItem = ({ title, number, totalComments }) => {
  return (
    <div className={styles.IssueItem}>
      <div className={styles["IssueItem-titleAndCount"]}>
        <div>{title}</div>
        <div className={styles["IssueItem-commentsCount"]}>{totalComments}</div>
      </div>
      <div>#{number}</div>
    </div>
  );
};

IssueItem.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  totalComments: PropTypes.number.isRequired,
};

export default IssueItem;
