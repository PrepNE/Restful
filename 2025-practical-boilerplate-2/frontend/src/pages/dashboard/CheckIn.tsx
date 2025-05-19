import React, { useState } from "react";
import {
  Card,
  Typography,
  Form,
  Select,
  Button,
  Alert,
  message,
} from "antd";
import { IVehicle } from "@/types";
import useVehicles from "@/hooks/useVehicles";
import useParkingLots from "@/hooks/useParkingLots";
import useParkingRecords from "@/hooks/useParkingRecords";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const CheckIn = () => {
  const [selectedPlate, setSelectedPlate] = useState<string>();
  const [selectedLot, setSelectedLot] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { vehicles, isLoading: vehiclesLoading } = useVehicles();
  const { parkingLots, isLoading: lotsLoading } = useParkingLots();
  const { checkIn } = useParkingRecords();

  const handleSubmit = async () => {
    if (!selectedPlate || !selectedLot) return;

    setIsSubmitting(true);
    const success = await checkIn({
      plateNumber: selectedPlate,
      parkingLotId: selectedLot,
    });

    if (success) {
      message.success("Checked in successfully!");
      setSelectedLot(undefined);
      setSelectedPlate(undefined);
    }

    setIsSubmitting(false);
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Find Parking</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card title={<Title level={4}>Check-In Vehicle</Title>}>
              <Paragraph type="secondary">
                Select your vehicle and parking lot to check in
              </Paragraph>

              {vehicles && vehicles.length > 0 ? (
                <Form
                  layout="vertical"
                  onFinish={handleSubmit}
                  style={{ marginTop: 24 }}
                >
                  <Form.Item label="Select Vehicle" required>
                    <Select
                      placeholder="Select a vehicle"
                      value={selectedPlate}
                      onChange={setSelectedPlate}
                      loading={vehiclesLoading}
                    >
                      {vehicles.map((vehicle: IVehicle) => (
                        <Option key={vehicle.plateNumber} value={vehicle.plateNumber}>
                          {vehicle.plateNumber} - {vehicle.manufacturer} {vehicle.model}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Select Parking Lot" required>
                    {parkingLots.length > 0 ? (
                      <Select
                        placeholder="Select a parking lot"
                        value={selectedLot}
                        onChange={setSelectedLot}
                        loading={lotsLoading}
                      >
                        {parkingLots.map((lot) => {
                          const available = lot.capacity - lot.currentOccupancy;
                          return (
                            <Option key={lot.id} value={lot.id} disabled={available <= 0}>
                              {lot.name} - {available} spot{available !== 1 ? "s" : ""} available
                            </Option>
                          );
                        })}
                      </Select>
                    ) : (
                      <Alert
                        message="No parking lots available"
                        description="All parking lots are full at the moment."
                        type="warning"
                        showIcon
                      />
                    )}
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={isSubmitting}
                      disabled={!parkingLots.length}
                    >
                      {isSubmitting ? "Processing..." : "Check In Vehicle"}
                    </Button>
                  </Form.Item>
                </Form>
              ) : (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                    You need to register a vehicle before checking in
                  </Paragraph>
                  <Button
                    type="primary"
                    onClick={() => (window.location.href = "/dashboard/vehicles")}
                  >
                    Register Vehicle
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
