import React from "react";
import Template from "../../Template";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ISSUE } from "./getIssueQuery";

const Issue = () => {
  let location = useLocation();
  const { loading, error, data } = useQuery(GET_ISSUE, {
    variables: { url: location.pathname },
  });
  console.log(">>>>>>>>>>>>", data);

  return (
    <Template>
      <article>
        <h1>{data?.resource.title}</h1>
      </article>
    </Template>
  );
};

export default Issue;
