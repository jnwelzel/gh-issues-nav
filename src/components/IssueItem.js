import React from "react";
import PropTypes from "prop-types";

import styles from "./IssueItem.module.css";
import { Link } from "react-router-dom";

const IssueItem = ({ title, number, totalComments, owner, repo }) => {
  const resourceUrl = `/${owner}/${repo}/issues/${number}`;
  return (
    <div className={styles.IssueItem}>
      <div className={styles["IssueItem-titleAndCount"]}>
        <div>
          <Link to={resourceUrl}>{title}</Link>
        </div>
        <div className={styles["IssueItem-commentsCount"]}>
          <Link to={resourceUrl}>{totalComments}</Link>
        </div>
      </div>
      <div>#{number}</div>
    </div>
  );
};

IssueItem.propTypes = {
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  totalComments: PropTypes.number.isRequired,
};

export default IssueItem;
