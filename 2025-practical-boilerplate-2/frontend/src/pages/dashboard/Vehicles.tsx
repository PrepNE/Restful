/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import SearchInput from "@/components/shared/SearchInput";
import { Button,  Checkbox } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import DataTable from "@/components/tables/DataTable";
import { IVehicle } from "@/types";
import { dummyVehicles } from "@/utils/constants";

const Vehicles = () => {
  const [searchValue, setSearchValue] = useState("");
  const [vehicles, setVehicles] = useState<IVehicle[]>(dummyVehicles);

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleDelete = async (id: string) => {
    setVehicles((prev) => prev.filter((lot) => lot.id !== id));
  };

  const handleEdit = async (updatedVehicle: IVehicle) => {
    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
      )
    );
  };

  const columns = (
    selectedKey: string | null,
    handleEditRow: (vehicle: IVehicle) => void,
    handleDeleteRow: () => void,
    handleCheckBoxChange: (key: string, item: IVehicle) => void
  ) => {
    const baseColumns = [
      {
        title: "",
        key: "checkbox",
        render: (_: any, record: IVehicle) => (
          <Checkbox
            checked={record.id === selectedKey}
            onChange={() => handleCheckBoxChange(record.id.toString(), record)}
          />
        ),
      },
      {
        title: "Plate Number",
        dataIndex: "plateNumber",
        key: "plateNumber",
      },
      {
        title: "Manufacturer",
        dataIndex: "manufacturer",
        key: "manufacturer",
      },
      {
        title: "Model",
        dataIndex: "model",
        key: "model",
      },
      {
        title: "Color",
        dataIndex: "color",
        key: "color",
      },
    ];
    const actionColumn = {
      title: "Action",
      key: "action",
      render: (_: any, record:IVehicle) =>
        record.id === selectedKey ? (
          <span className="flex flex-1 flex-row gap-x-4">
            <Button onClick={() => handleEditRow(record)}>
              <EditOutlined /> Edit
            </Button>
            <Button danger onClick={handleDeleteRow}>
              <DeleteOutlined /> Delete
            </Button>
          </span>
        ) : null,
    };

    return selectedKey ? [...baseColumns, actionColumn] : baseColumns;
  };
  return (
    <div className="bg-white px-10 py-6 rounded-lg">
      <div className="flex flex-1 sm:flex-row flex-col gap-y-4 justify-between pb-6">
        <div>
          <h1 className="text-base font-medium">Manage Vehicles</h1>
          <p className="text-gray-500 text-[14px]">
            View, edit, and delete your vehicles below.
          </p>
        </div>
        <div className="flex flex-row gap-x-2">
          <SearchInput
            searchQueryValue={searchValue}
            handleSearchQueryValue={handleSearchQueryChange}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="h-[40px]"
            // onClick={() => setShowCreateModal(true)}
          >
            New Vehicle
          </Button>
        </div>
      </div>

      <DataTable<IVehicle>
        data={vehicles}
        searchQuery={searchValue}
        onDelete={handleDelete}
        onEdit={handleEdit}
        columns={columns}
        rowKey="id"
        DeleteModalComponent={DeleteConfirmationModal}
        modalTitle="Edit Parking Lot"
      />
    </div>
  );
};

export default Vehicles;
