import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  onAssignCargo: () => void;
}

export default function AssignCargoForm({ onAssignCargo }: Props) {
  const [cargoInput, setCargoInput] = useState({
    name: "",
    weight: "",
    distance: "",
  });

  const handleAssignCargo = async () => {
    const res = await fetch("/api/assign-cargo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cargoInput.name,
        weight: parseFloat(cargoInput.weight),
        distance: parseFloat(cargoInput.distance),
      }),
    });

    const result = await res.json();
    toast(result.message);

    if (res.ok) {
      onAssignCargo();
      setCargoInput({ name: "", weight: "", distance: "" });
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-md font-semibold mb-2">Assign Cargo</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Cargo Name"
          className="border p-2"
          value={cargoInput.name}
          onChange={(e) =>
            setCargoInput((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Weight (Tons)"
          className="border p-2"
          value={cargoInput.weight}
          onChange={(e) =>
            setCargoInput((prev) => ({ ...prev, weight: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Distance (Km)"
          className="border p-2"
          value={cargoInput.distance}
          onChange={(e) =>
            setCargoInput((prev) => ({ ...prev, distance: e.target.value }))
          }
        />
      </div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleAssignCargo}
      >
        Assign Cargo
      </button>
    </div>
  );
}
