import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoggedInLinks from "./components/LoggedInLinks";
import { selectUser } from "./features/auth/authSlice";

const Template = ({ children }) => {
  const user = useSelector(selectUser);

  return (
    <Fragment>
      <nav>
        GitHub Issues Navigator |{" "}
        {user?.email ? (
          <LoggedInLinks email={user.email} />
        ) : (
          <Link to="/login" />
        )}
      </nav>
      {children}
    </Fragment>
  );
};

export default Template;
