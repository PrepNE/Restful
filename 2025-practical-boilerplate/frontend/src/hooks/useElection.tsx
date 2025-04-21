/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import axios from "../lib/axios.config";
import { IElection } from "@/types";
import { notification } from "antd";

const useElections = () => {
  const {
    data: elections,
    isLoading,
    error,
    mutate,
  } = useSWR<IElection[]>("/elections", async (url: string) => {
    const { data } = await axios.get(url);
    return data.elections;
  });

  const vote = async (electionId: string, candidateId: string) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const voterAddress = accounts[0];
      const { data } = await axios.post(
        `/candidates/elections/${electionId}/candidates/${candidateId}/vote`,
        { voterAddress }
      );

      if (data.success) {
        notification.success({
          message: data.message,
        });
        mutate();
      } else {
        notification.error({
          message: data?.message || "Vote failed",
        });
      }

      return data;
    } catch (err: any) {
      notification.error({
        message: err?.response?.data?.message || "An error occurred",
      });
      throw err;
    }
  };

  return {
    elections,
    isLoading,
    error,
    vote,
  };
};

export default useElections;
