import SearchInput from "@/components/shared/SearchInput";
import ElectionTable from "@/components/table/ElectionTable";
import useElections from "@/hooks/useElection";
import React, { useState } from "react";

const Elections = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { vote } = useElections();

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const handleVote = (electionId: string, candidateId: string) => {
    console.log("Voting for:", electionId, candidateId);
    vote(electionId, candidateId)
      .then((response) => {
        console.log("Vote successful:", response);
      })
      .catch((error) => {
        console.error("Error voting:", error);
      });
  };

  return (
    <div className="bg-white px-10 py-6 rounded-lg">
      <div className="flex flex-1 sm:flex-row flex-col gap-y-4 justify-between pb-6">
        <div>
          <h1 className="text-base font-medium">Manage Elections</h1>
          <p className="text-gray-500 text-[14px]">
            Extract and manipulate the Elections over here!
          </p>
        </div>
        <div className="flex flex-row gap-x-2">
          <SearchInput
            searchQueryValue={searchValue}
            handleSearchQueryValue={handleSearchQueryChange}
          />
        </div>
      </div>
      <ElectionTable searchQuery={searchValue} onVote={handleVote} />
    </div>
  );
};

export default Elections;
