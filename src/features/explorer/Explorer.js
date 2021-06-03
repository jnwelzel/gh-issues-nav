import React from "react";
import { useParams } from "react-router";

const Explorer = () => {
  const { user, repo } = useParams();
  return (
    <div>
      {user}/{repo}
    </div>
  );
};

export default Explorer;
