import React from "react";
import { useParams } from "react-router";

export const Repos = () => {
  const { user } = useParams();
  return <div>User: {user}</div>;
};
