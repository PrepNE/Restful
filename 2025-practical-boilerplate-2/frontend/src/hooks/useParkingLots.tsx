import axios from "@/lib/axios.config";
import useSWR from "swr";
import { notification } from "antd";
import { useEffect, useState } from "react";

export interface ParkingLot {
  id: string;
  name: string;
  capacity: number;
  location:string;
  hourlyRate: number;
  currentOccupancy: number;
}

const fetcher = async (url: string) => {
  const { data } = await axios.get(url);
  return data.body;
};

const useParkingLots = () => {
  const { data: lots, isLoading, error, mutate } = useSWR("/parking-lots", fetcher);
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);

  const getOccupancy = async (id: string) => {
    const { data } = await axios.get(`/parking-lots/${id}/occupancy`);
    return data.body.occupiedSpots;
  };

  useEffect(() => {
    const loadOccupancies = async () => {
      if (!lots) return;

      const lotsWithOccupancy = await Promise.all(
        lots.map(async (lot: Omit<ParkingLot, "currentOccupancy">) => {
          const occupied = await getOccupancy(lot.id);
          return {
            ...lot,
            currentOccupancy: occupied,
          };
        })
      );

      setParkingLots(lotsWithOccupancy);
    };

    loadOccupancies();
  }, [lots]);

  if (error) {
    notification.error({
      message: "Failed to load parking lots",
      description: error.message,
    });
  }

  return {
    parkingLots,
    getOccupancy,
    isLoading,
    error,
    mutate,
  };
};

export default useParkingLots;
