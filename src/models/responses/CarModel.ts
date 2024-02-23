export interface CarModel {
 
    id: number;
    dailyPrice: number;
    imagePath: string;
    kilometer: number;
    plate: string;
    year: number;
    modelResponse: {
      id: number;
      name: string;
    };
    colorResponse: {
      id: number;
      name: string;
    };

}
