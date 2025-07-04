import TruckTable from "@/components/TruckTable";

export default async function Home() {
  // In latest next.js you can use getServerSideProps to fetch data at SSR.
  // refer: https://nextjs.org/docs/app/getting-started/fetching-data
  const res = await fetch(`http://localhost:8000/api/trucks`);
  const trucks = await res.json();

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Truck List</h2>
      <TruckTable initialTrucks={trucks} />
    </div>
  );
}

