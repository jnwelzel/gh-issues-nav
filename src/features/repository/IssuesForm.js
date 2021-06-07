import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearch,
  selectState,
  setIssuesState,
  setSearch,
} from "./repositorySlice";

export const IssuesForm = () => {
  const dispatch = useDispatch();
  const issuesState = useSelector(selectState);
  const search = useSelector(selectSearch);
  const [searchValue, setSearchValue] = useState(search);

  const onChangeIssuesState = (e) => {
    dispatch(setIssuesState(e.target.value));
  };
  const onSubmitSearch = (e) => {
    e.preventDefault();
    const value = searchValue.trim();
    dispatch(setSearch(value));
  };
  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <React.Fragment>
      <p>State</p>
      <div>
        <input
          type="radio"
          id="open"
          name="state"
          value="open"
          checked={issuesState === "open"}
          onChange={onChangeIssuesState}
        />
        <label htmlFor="open">Open</label>
      </div>
      <div>
        <input
          type="radio"
          id="closed"
          name="state"
          value="closed"
          checked={issuesState === "closed"}
          onChange={onChangeIssuesState}
        />
        <label htmlFor="closed">Closed</label>
      </div>
      <p>Search</p>
      <form onSubmit={onSubmitSearch}>
        <input
          type="search"
          name="search"
          id="search"
          onChange={onChangeSearch}
        />
        <button type="submit">Search</button>
      </form>
    </React.Fragment>
  );
};
