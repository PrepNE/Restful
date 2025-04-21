/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Button, Tag } from "antd";
import React, { useState, useEffect } from "react";
import { paginate } from "@/lib/utils";
import useElections from "@/hooks/useElection";
import { IElection } from "@/types";
import VoteModal from "@/components/modals/VoteModal"; // Adjust path if needed

interface ElectionTableProps {
  searchQuery: string;
  onVote: (electionId: string, candidateId: string) => void;
}

const ElectionTable: React.FC<ElectionTableProps> = ({ searchQuery, onVote }) => {
  const { elections, error } = useElections();
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
      render: (active: boolean) => <Tag color={active ? "green" : "red"}>{active ? "Yes" : "No"}</Tag>,
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
      render: (_: any, record: IElection) => (
        <Button
          type="primary"
          size="small"
          disabled={!record.isActive}
          onClick={() => {
            setSelectedElection(record);
            setModalVisible(true);
          }}
        >
          Vote
        </Button>
      ),
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
