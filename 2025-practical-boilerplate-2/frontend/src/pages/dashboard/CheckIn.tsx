import React, { useState } from "react";
import {
  Card,
  Typography,
  Form,
  Select,
  Button,
  Alert,
} from "antd";

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface Vehicle {
  id: string;
  plateNumber: string;
  make: string;
  model: string;
}

interface ParkingLot {
  id: string;
  name: string;
  capacity: number;
  currentOccupancy: number;
}

const CheckIn = () => {
  // Dummy data
  const [userVehicles] = useState<Vehicle[]>([
    { id: "v1", plateNumber: "RAA123A", make: "Toyota", model: "Corolla" },
    { id: "v2", plateNumber: "RAB456B", make: "Honda", model: "Civic" },
  ]);

  const [availableParkingLots] = useState<ParkingLot[]>([
    { id: "p1", name: "Kigali Arena", capacity: 50, currentOccupancy: 20 },
    { id: "p2", name: "City Tower", capacity: 100, currentOccupancy: 100 },
  ]);

  const [selectedVehicle, setSelectedVehicle] = useState<string | undefined>();
  const [selectedParkingLot, setSelectedParkingLot] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate async action
    setTimeout(() => {
      console.log("Vehicle checked in:", selectedVehicle, selectedParkingLot);
      setIsSubmitting(false);
    }, 1500);
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

              {userVehicles.length > 0 ? (
                <Form
                  layout="vertical"
                  onFinish={handleSubmit}
                  style={{ marginTop: 24 }}
                >
                  <Form.Item label="Select Vehicle" required>
                    <Select
                      placeholder="Select a vehicle"
                      value={selectedVehicle}
                      onChange={setSelectedVehicle}
                    >
                      {userVehicles.map((vehicle) => (
                        <Option key={vehicle.id} value={vehicle.id}>
                          {vehicle.plateNumber} - {vehicle.make} {vehicle.model}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Select Parking Lot" required>
                    {availableParkingLots.length > 0 ? (
                      <Select
                        placeholder="Select a parking lot"
                        value={selectedParkingLot}
                        onChange={setSelectedParkingLot}
                      >
                        {availableParkingLots.map((lot) => (
                          <Option key={lot.id} value={lot.id}>
                            {lot.name} - {lot.capacity - lot.currentOccupancy} spots available
                          </Option>
                        ))}
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
                      disabled={!availableParkingLots.length}
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
                    onClick={() => (window.location.href = "/register-vehicle")}
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
