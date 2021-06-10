import React from "react";
import RepoForm from "./RepoForm";
import { Issues } from "./Issues";
import { Helmet } from "react-helmet";

const Repository = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>GitHub Issues Navigator | Repository</title>
      </Helmet>
      <main>
        <RepoForm />
        <Issues />
      </main>
    </React.Fragment>
  );
};

export default Repository;
