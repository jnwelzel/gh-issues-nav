import React from "react";

export const NoMatch = () => {
  return (
    <main className="flex flex-col bg-yellow-100 items-center justify-center h-full">
      <h1 className="text-2xl text-yellow-400 font-bold">Oh no!</h1>
      <h2 className="text-yellow-400 font-normal">
        Looks like your glass is empty :(
      </h2>
    </main>
  );
};

export default NoMatch;
