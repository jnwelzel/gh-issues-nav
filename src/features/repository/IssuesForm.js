import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearch,
  selectState,
  setIssuesState,
  setSearch,
} from "./repositorySlice";
import { SearchIcon } from "@heroicons/react/outline";

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
    <div className="flex flex-col my-5 items-center">
      <div className="grid items-center grid-rows-1 grid-flow-col gap-4 grid-cols-3 mb-3">
        <p>State</p>
        <div className="flex items-center">
          <input
            type="radio"
            id="open"
            name="state"
            value="open"
            checked={issuesState === "open"}
            onChange={onChangeIssuesState}
            className="mr-2"
          />
          <label htmlFor="open">Open</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="closed"
            name="state"
            value="closed"
            checked={issuesState === "closed"}
            onChange={onChangeIssuesState}
            className="mr-2"
          />
          <label htmlFor="closed">Closed</label>
        </div>
      </div>
      <form onSubmit={onSubmitSearch} className="flex items-center">
        <input
          type="search"
          name="search"
          id="search"
          onChange={onChangeSearch}
          placeholder="in:title in:body"
          className="mr-4 rounded-lg"
        />
        <button
          type="submit"
          className="flex items-center bg-blue-500 hover:bg-blue-600 rounded-lg py-2 px-4 text-white"
        >
          <SearchIcon className="w-5 mr-2" /> Search
        </button>
      </form>
    </div>
  );
};
