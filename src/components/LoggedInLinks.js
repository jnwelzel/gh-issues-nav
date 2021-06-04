import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const LoggedInLinks = ({ email }) => {
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <li>
        You're logged in as <strong>{email}</strong>
      </li>
      <li>
        <button type="button" onClick={onClickHandler}>
          Logout
        </button>
      </li>
    </Fragment>
  );
};

LoggedInLinks.propTypes = {
  email: PropTypes.string.isRequired,
};

export default LoggedInLinks;
