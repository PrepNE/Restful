import React, { useState } from "react";
import {  Card, Typography, Select, Table, Tag, Space } from "antd";
import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";


const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const userVehicles = [
  { id: "v1", plateNumber: "RAB123A", make: "Toyota", model: "Corolla" },
  { id: "v2", plateNumber: "RAC456B", make: "Honda", model: "Civic" },
];

const allParkingRecords = [
  {
    id: "p1",
    vehicleId: "v1",
    plateNumber: "RAB123A",
    parkingLotName: "Kigali Heights",
    checkInTime: new Date("2024-05-01T10:00:00"),
    checkOutTime: new Date("2024-05-01T12:30:00"),
    duration: 150,
    amount: 1500,
  },
  {
    id: "p2",
    vehicleId: "v2",
    plateNumber: "RAC456B",
    parkingLotName: "Remera Parking",
    checkInTime: new Date("2024-05-02T08:15:00"),
    checkOutTime: null,
    duration: null,
    amount: null,
  },
];

const formatDate = (date: Date | null) =>
  date ? new Date(date).toLocaleString() : "N/A";

const formatDuration = (minutes?: number) => {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours > 0 ? `${hours}h ${remainingMinutes}min` : `${remainingMinutes}min`;
};

const History = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | undefined>(undefined);

  const parkingRecords = selectedVehicle
    ? allParkingRecords.filter((r) => r.vehicleId === selectedVehicle)
    : allParkingRecords;

  const sortedRecords = [...parkingRecords].sort(
    (a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime()
  );

  const totalSpent = sortedRecords.reduce((sum, r) => sum + (r.amount || 0), 0);

  const columns = [
    {
      title: "Vehicle",
      dataIndex: "plateNumber",
      key: "plateNumber",
    },
    {
      title: "Parking Location",
      dataIndex: "parkingLotName",
      key: "parkingLotName",
      render: (text: string) => (
        <Space>
          <EnvironmentOutlined style={{ color: "#888" }} />
          {text}
        </Space>
      ),
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
        time ? (
          formatDate(time)
        ) : (
          <Tag color="blue">Active</Tag>
        ),
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
            <ClockCircleOutlined style={{ color: "#1677ff" }} spin />
            In progress
          </Space>
        ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right" as const,
      render: (amount: number | null) => (amount ? `${amount} RWF` : "-"),
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <div className="w-full">
        <Title level={2}>Parking History</Title>

        <Card style={{ marginBottom: 24 }} title="Filter Records">
          <Paragraph type="secondary">Select a vehicle to filter records</Paragraph>
          <Select
            placeholder="All vehicles"
            onChange={(val) => setSelectedVehicle(val)}
            value={selectedVehicle}
            style={{ width: 300 }}
            allowClear
          >
            {userVehicles.map((vehicle) => (
              <Option key={vehicle.id} value={vehicle.id}>
                {vehicle.plateNumber} - {vehicle.make} {vehicle.model}
              </Option>
            ))}
          </Select>
        </Card>

        <Card title="Parking Records">
          {sortedRecords.length > 0 ? (
            <>
              <Table
                columns={columns}
                dataSource={sortedRecords}
                rowKey="id"
                pagination={false}
              />
              <div style={{ textAlign: "right", marginTop: 16 }}>
                <Text>Total Spent: </Text>
                <Text strong>{totalSpent} RWF</Text>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <Paragraph>No parking records found</Paragraph>
              <Paragraph type="secondary">
                {selectedVehicle
                  ? "Try selecting a different vehicle or check-in your vehicle first."
                  : "Your parking history will appear here once you have parked your vehicle."}
              </Paragraph>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default History;
