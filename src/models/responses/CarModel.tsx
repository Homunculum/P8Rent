export interface CarModel {
    id: number;
    daily_price: number;
    kilometer: number;
    plate: string;
    year: number;
    modelResponse: {
      name: string;
    };
    colorResponse: {
      name: string;
    };
  }
  