// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
    
    struct Election {
        uint id;
        string name;
        bool isActive;
        uint[] candidateIds;
    }
    
    address public owner;
    uint public electionCount;
    uint public candidateCount;
    mapping(uint => Election) public elections;
    mapping(uint => Candidate) public candidates;
    mapping(address => mapping(uint => bool)) public hasVoted;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can do this");
        _;
    }
    
    function createElection(string memory _name) public onlyOwner {
        electionCount++;
        
        // Create a new election with empty candidateIds array
        elections[electionCount].id = electionCount;
        elections[electionCount].name = _name;
        elections[electionCount].isActive = true;
        // The candidateIds array is automatically initialized as empty
    }
    
    function addCandidate(uint _electionId, string memory _name) public onlyOwner {
        require(elections[_electionId].isActive, "Election not active");
        
        candidateCount++;
        candidates[candidateCount].id = candidateCount;
        candidates[candidateCount].name = _name;
        candidates[candidateCount].voteCount = 0;
        
        elections[_electionId].candidateIds.push(candidateCount);
    }
    
    function vote(uint _electionId, uint _candidateId) public {
        require(!hasVoted[msg.sender][_electionId], "Already voted in this election");
        require(elections[_electionId].isActive, "Election is not active");
        
        hasVoted[msg.sender][_electionId] = true;
        candidates[_candidateId].voteCount++;
    }
    
    function getCandidates(uint _electionId) public view returns (uint[] memory) {
        return elections[_electionId].candidateIds;
    }
    
    function getElection(uint _id) public view returns (string memory name, bool isActive) {
        Election storage e = elections[_id];
        return (e.name, e.isActive);
    }
}