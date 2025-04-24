/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Button, Tag } from "antd";
import React, { useState, useEffect } from "react";
import { paginate } from "@/lib/utils";
import useElections from "@/hooks/useElection";
import { IElection } from "@/types";
import VoteModal from "@/components/modals/VoteModal";

interface ElectionTableProps {
  searchQuery: string;
  onVote: (electionId: string, candidateId: string) => void;
}

const ElectionTable: React.FC<ElectionTableProps> = ({ searchQuery, onVote }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Try to get the wallet address on mount
  useEffect(() => {
    const fetchWalletAddress = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        } catch (err) {
          console.warn("Could not fetch wallet address:", err);
        }
      }
    };

    fetchWalletAddress();
  }, []);

  const { elections, error } = useElections(walletAddress);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3);
  const [filteredElections, setFilteredElections] = useState<IElection[]>([]);
  const [selectedElection, setSelectedElection] = useState<IElection | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (elections) {
      const filtered = elections.filter((election) =>
        election.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredElections(filtered);

      const totalPages = Math.ceil(filtered.length / pageSize);
      if (currentPage > totalPages && totalPages > 0) {
        setCurrentPage(totalPages);
      }
    }
  }, [elections, searchQuery, pageSize, currentPage]);

  if (error) {
    return <div>Error loading elections</div>;
  }

  const handleTableChange = (pagination: any) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const paginatedData = paginate(filteredElections || [], pageSize, currentPage);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (active: boolean) => (
        <Tag color={active ? "green" : "red"}>{active ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Vote",
      key: "vote",
      render: (_: any, record: IElection) => {
        const hasVoted = record.hasVoted;
        const isActive = record.isActive;

        return (
          <Button
            type="primary"
            size="small"
            disabled={!isActive || hasVoted}
            className={`rounded-xl ${
              !isActive
                ? "bg-gray-400 cursor-not-allowed"
                : hasVoted
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-green-600 hover:bg-green-700"
            } text-white border-none`}
            onClick={() => {
              setSelectedElection(record);
              setModalVisible(true);
            }}
          >
            {hasVoted ? "Voted" : "Vote"}
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <Table<IElection>
        dataSource={paginatedData}
        columns={columns}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredElections?.length || 0,
          showSizeChanger: true,
          pageSizeOptions: ["3", "5", "10", "20", "50"],
        }}
        onChange={handleTableChange}
      />
      <VoteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        election={selectedElection}
        onVote={onVote}
      />
    </div>
  );
};

export default ElectionTable;
