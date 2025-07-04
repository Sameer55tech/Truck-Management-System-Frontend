export interface Truck {
  _id: string;
  name: string;
  max_weight: number;
  max_mileage: number;
  mileage: number;
  total_historical_weight: number;
  total_historical_mileage: number;
  historical_cargo_names: string[];
}
