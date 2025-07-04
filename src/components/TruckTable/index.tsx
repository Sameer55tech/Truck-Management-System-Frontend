"use client";
import { useState } from "react";
import TruckTableItem from "../TruckTableItem";
import AssignCargoForm from "../AssignCargoForm";
import { toast } from "react-toastify";

interface Truck {
  _id: string;
  name: string;
  max_weight: number;
  max_mileage: number;
  mileage: number;
  total_historical_weight: number;
  total_historical_mileage: number;
  historical_cargo_names: string[];
}

export default function TruckTable({
  initialTrucks,
}: {
  initialTrucks: Truck[];
}) {
  const [trucks, setTrucks] = useState<Truck[]>(initialTrucks);

  const onAssignCargo = async () => {
    const updated = await fetch("/api/trucks");
    const newTrucks = await updated.json();
    setTrucks(newTrucks);
  };

  const handleRefuel = async (truckId: string) => {
    const res = await fetch("/api/refuel-truck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ truckId }),
    });

    const result = await res.json();
    toast(result.message);

    if (res.ok) {
      const updated = await fetch("/api/trucks"); // assuming a GET API exists to re-fetch all
      const newTrucks = await updated.json();
      setTrucks(newTrucks);
    }
  };

  return (
    <div className="grid grid-cols-12">
      <table className="w-full border border-separate border-spacing-y-2 col-span-9">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Max Weight (Tons)</th>
            <th>Max Mileage (Km)</th>
            <th>Current Mileage</th>
            <th>Total Historical Weight</th>
            <th>Total Historical Mileage</th>
            <th>Historical Cargo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trucks.map((truck: Truck) => (
            <TruckTableItem
              key={truck._id}
              truck={truck}
              handleRefuel={handleRefuel}
            />
          ))}
        </tbody>
      </table>
      <div className="col-span-3 p-4 border-l">
        <AssignCargoForm onAssignCargo={onAssignCargo} />
      </div>
    </div>
  );
}
