/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "@/lib/axios.config";
import useSWR from "swr";
import { notification } from "antd";

export interface CheckInDTO {
  plateNumber: string;
  parkingLotId: string;
}

export interface CheckOutDTO {
  plateNumber: string;
}

export interface ParkingRecord {
  id: string;
  checkInTime: string;
  checkOutTime: string | null;
  duration: number | null;
  amountPaid: number | null;
  parkingLotId: string;
  vehicleId: string;
  vehicle?: any;
  parkingLot?: any;
}

const useParkingRecords = (plateNumber?: string) => {
  const {
    data: history,
    isLoading,
    error,
    mutate,
  } = useSWR<ParkingRecord[]>(
    plateNumber ? `/parking-records/history/${plateNumber}` : null,
    async (url: string) => {
      const response = await axios.get(url);
      return response.data.body;
    }
  );

  const checkIn = async (data: CheckInDTO): Promise<boolean> => {
    try {
      await axios.post("/parking-records/check-in", data);
      notification.success({
        message: "Checked In",
        description: "Vehicle successfully checked into the parking lot.",
      });
      mutate(); // refresh if history is shown
      return true;
    } catch (err: any) {
      notification.error({
        message: "Check-In Failed",
        description: err?.response?.data?.message || "Unable to check in.",
      });
      return false;
    }
  };

  const checkOut = async (data: CheckOutDTO): Promise<boolean> => {
    try {
      await axios.post("/parking-records/check-out", data);
      notification.success({
        message: "Checked Out",
        description: "Vehicle successfully checked out.",
      });
      mutate();
      return true;
    } catch (err: any) {
      notification.error({
        message: "Check-Out Failed",
        description: err?.response?.data?.message || "Unable to check out.",
      });
      return false;
    }
  };

  const searchRecords = async (query: {
    plateNumber?: string;
    nationalId?: string;
    parkingLotId?: string;
  }): Promise<ParkingRecord[] | null> => {
    try {
      const response = await axios.get("/parking-records/search", {
        params: query,
      });
      notification.success({
        message: "Records Found",
        description: "Parking records were successfully retrieved.",
      });
      return response.data.body;
    } catch (err: any) {
      notification.error({
        message: "Search Failed",
        description: err?.response?.data?.message || "Could not search records.",
      });
      return null;
    }
  };

  return {
    history,
    isLoading,
    error,
    checkIn,
    checkOut,
    searchRecords,
    mutate,
  };
};

export default useParkingRecords;
