/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Card,
  Typography,
  Select,
  Table,
  Tag,
  Space,
  Button,
} from "antd";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import useVehicles from "@/hooks/useVehicles";
import useParkingRecords from "@/hooks/useParkingRecords";
import CheckOutModal from "@/components/modals/CheckoutModal"; // ✅ Ensure correct path

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const formatDate = (date: string | null) =>
  date ? new Date(date).toLocaleString() : "N/A";

const formatDuration = (minutes?: number | null) => {
  if (!minutes) return "N/A";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours > 0 ? `${hours}h ${remainingMinutes}min` : `${remainingMinutes}min`;
};

const History = () => {
  const [selectedPlate, setSelectedPlate] = useState<string | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [selectedForCheckOut, setSelectedForCheckOut] = useState<string | null>(null);

  const { vehicles, isLoading: vehiclesLoading } = useVehicles();
  const {
    history: parkingRecords,
    isLoading: recordsLoading,
    mutate,
  } = useParkingRecords(selectedPlate);

  const totalSpent = parkingRecords?.reduce(
    (sum, r) => sum + (r.amountPaid || 0),
    0
  ) || 0;

  const columns = [
    {
      title: "Vehicle",
      dataIndex: "vehicle",
      key: "plateNumber",
      render: (vehicle: any) => vehicle?.plateNumber || "N/A",
    },
    {
      title: "Parking Location",
      dataIndex: "parkingLot",
      key: "parkingLotName",
      render: (parkingLot: any) => (
        <Space>
          <EnvironmentOutlined style={{ color: "#888" }} />
          {parkingLot?.name || "Unknown"}
        </Space>
      ),
    },
    {
      title: "Check-in Time",
      dataIndex: "checkInTime",
      key: "checkInTime",
      render: (time: string) => formatDate(time),
    },
    {
      title: "Check-out Time",
      dataIndex: "checkOutTime",
      key: "checkOutTime",
      render: (time: string | null) =>
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
      dataIndex: "amountPaid",
      key: "amountPaid",
      align: "right" as const,
      render: (amount: number | null) => (amount ? `${amount} RWF` : "-"),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) =>
        !record.checkOutTime ? (
          <Button
            size="small"
            type="primary"
            onClick={() => {
              setSelectedForCheckOut(record.vehicle?.plateNumber);
              setShowModal(true);
            }}
          >
            Check Out
          </Button>
        ) : (
          <Tag color="green">Completed</Tag>
        ),
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
            onChange={(val) => setSelectedPlate(val)}
            value={selectedPlate}
            style={{ width: 300 }}
            allowClear
            loading={vehiclesLoading}
          >
            {vehicles?.map((vehicle) => (
              <Option key={vehicle.plateNumber} value={vehicle.plateNumber}>
                {vehicle.plateNumber} - {vehicle.manufacturer} {vehicle.model}
              </Option>
            ))}
          </Select>
        </Card>

        <Card title="Parking Records">
          {recordsLoading ? (
            <Paragraph>Loading records...</Paragraph>
          ) : parkingRecords && parkingRecords.length > 0 ? (
            <>
              <Table
                columns={columns}
                dataSource={parkingRecords}
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
                {selectedPlate
                  ? "Try selecting a different vehicle or check-in your vehicle first."
                  : "Your parking history will appear here once you have parked your vehicle."}
              </Paragraph>
            </div>
          )}
        </Card>
      </div>

      <CheckOutModal
  open={showModal}
  plateNumber={selectedForCheckOut} // 👈 pass selected vehicle
  onClose={() => {
    setShowModal(false);
    setSelectedForCheckOut(null);
  }}
  onSuccess={() => {
    setShowModal(false);
    setSelectedForCheckOut(null);
    mutate(); // refresh history
  }}
/>

    </div>
  );
};

export default History;
