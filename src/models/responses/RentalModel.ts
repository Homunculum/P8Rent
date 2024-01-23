import { CarModel } from "./CarModel";

export interface RentalModel {
    id: number;
    startDate: string;
    endDate: string;
    returnDate: string;
    startKilometer: number;
    endKilometer: number;
    totalPrice: number;
    carResponse: CarModel;
  }
  