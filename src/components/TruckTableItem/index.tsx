import { Truck } from "@/types/truck";

interface Props {
  truck: Truck;
  handleRefuel: (truckId: string) => void;
}
export default function TruckTableItem({ truck, handleRefuel }: Props) {
  return (
    <tr key={truck._id} className="border-t text-center">
      <td>{truck.name}</td>
      <td>{truck.max_weight}</td>
      <td>{truck.max_mileage}</td>
      <td>{truck.mileage}</td>
      <td>{truck.total_historical_weight}</td>
      <td>{truck.total_historical_mileage}</td>
      <td>
        {truck.historical_cargo_names.length > 0
          ? truck.historical_cargo_names.join(", ")
          : "-"}
      </td>
      <td>
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
          onClick={() => handleRefuel(truck._id)}
        >
          Refuel
        </button>
      </td>
    </tr>
  );
}
