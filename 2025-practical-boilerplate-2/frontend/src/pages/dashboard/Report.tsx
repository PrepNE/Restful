import React, { useState } from "react";
import {
  Card,
  Typography,
  Select,
  Input,
  Button,
  Table,
  Tag,
  Space,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  SearchOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

const { Title, Text } = Typography;
const { Option } = Select;

// Types
type ParkingLot = {
  id: string;
  name: string;
};

type ParkingRecord = {
  id: string;
  plateNumber: string;
  parkingLotId: string;
  parkingLotName: string;
  checkInTime: Date;
  checkOutTime: Date | null;
  duration: number | null;
  amount: number | null;
};

// Dummy data
const dummyParkingLots: ParkingLot[] = [
  { id: "1", name: "Kigali Heights" },
  { id: "2", name: "Remera Parking" },
];

const dummyParkingRecords: ParkingRecord[] = [
  {
    id: "rec1",
    plateNumber: "RAB123A",
    parkingLotId: "1",
    parkingLotName: "Kigali Heights",
    checkInTime: new Date("2024-05-01T10:00:00"),
    checkOutTime: new Date("2024-05-01T12:30:00"),
    duration: 150,
    amount: 1500,
  },
  {
    id: "rec2",
    plateNumber: "RAC456B",
    parkingLotId: "2",
    parkingLotName: "Remera Parking",
    checkInTime: new Date("2024-05-02T08:15:00"),
    checkOutTime: null,
    duration: null,
    amount: null,
  },
];

const Reports: React.FC = () => {
  const [searchType, setSearchType] = useState<"plateNumber" | "parkingLotId">("plateNumber");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ParkingRecord[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setHasSearched(true);
    let results: ParkingRecord[] = [];

    switch (searchType) {
      case "plateNumber":
        results = dummyParkingRecords.filter((record) =>
          record.plateNumber?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        break;
      case "parkingLotId":
        { const lot = dummyParkingLots.find(
          (lot) =>
            lot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lot.id === searchQuery
        );
        if (lot) {
          results = dummyParkingRecords.filter((r) => r.parkingLotId === lot.id);
        }
        break; }
    }

    results.sort(
      (a, b) =>
        new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime()
    );
    setSearchResults(results);
  };

  const formatDate = (date: Date | null): string =>
    date ? new Date(date).toLocaleString() : "N/A";

  const formatDuration = (minutes?: number | null): string => {
    if (!minutes) return "In progress";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  const totalRevenue = searchResults.reduce((sum, r) => sum + (r.amount || 0), 0);
  const totalDurationMinutes = searchResults.reduce((sum, r) => sum + (r.duration || 0), 0);

  const columns: ColumnsType<ParkingRecord> = [
    {
      title: "Vehicle",
      dataIndex: "plateNumber",
      key: "plateNumber",
    },
    {
      title: "Parking Location",
      dataIndex: "parkingLotName",
      key: "parkingLotName",
    },
    {
      title: "Check-in Time",
      dataIndex: "checkInTime",
      key: "checkInTime",
      render: (time: Date) => formatDate(time),
    },
    {
      title: "Check-out Time",
      dataIndex: "checkOutTime",
      key: "checkOutTime",
      render: (time: Date | null) =>
        time ? formatDate(time) : <Tag color="blue">Active</Tag>,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration: number | null) =>
        duration ? (
          formatDuration(duration)
        ) : (
          <Space>
            <ClockCircleOutlined />
            In progress
          </Space>
        ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount: number | null) => (amount ? `${amount} RWF` : "-"),
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <div className="w-full">
        <Title level={2}>Parking Reports</Title>

        <Card title="Search Parking Records" style={{ marginBottom: 24 }}>
          <Row gutter={16}>
            <Col xs={24} md={6}>
              <label>Search Type</label>
              <Select
                value={searchType}
                onChange={(val) => setSearchType(val)}
                style={{ width: "100%" }}
              >
                <Option value="plateNumber">Plate Number</Option>
                <Option value="parkingLotId">Parking Lot</Option>
              </Select>
            </Col>
            <Col xs={24} md={12}>
              <label>Search Query</label>
              <Input
                placeholder={
                  searchType === "plateNumber"
                    ? "Enter plate number..."
                    : "Enter parking lot name or ID..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onPressEnter={handleSearch}
                suffix={
                  <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                    Search
                  </Button>
                }
              />
            </Col>
          </Row>
        </Card>

        {hasSearched && (
          <Card
            title={
              <Space>
                Search Results
                <Text type="secondary">
                  ({searchResults.length} records found)
                </Text>
              </Space>
            }
            extra={
              searchResults.length > 0 && (
                <Button icon={<FileTextOutlined />}>Export</Button>
              )
            }
          >
            {searchResults.length > 0 ? (
              <>
                <Table
                  dataSource={searchResults}
                  columns={columns}
                  rowKey="id"
                  pagination={false}
                />
                <Row gutter={16} style={{ marginTop: 24 }}>
                  <Col span={8}>
                    <Statistic title="Total Records" value={searchResults.length} />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Total Duration"
                      value={formatDuration(totalDurationMinutes)}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Total Revenue" value={totalRevenue} suffix="RWF" />
                  </Col>
                </Row>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <Text type="secondary">
                  No records found matching your search criteria.
                </Text>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default Reports;
