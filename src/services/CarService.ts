import axios, { AxiosResponse } from 'axios';

import { CarModel } from '../models/responses/CarModel';

class CarService {
  static getById(carId: any) {
      throw new Error('Method not implemented.');
  }

  
  async getAll(): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.get<any>('http://localhost:8080/api/cars/getAll');
      return response;
    } catch (error) {
     
      console.error('Error fetching data:', error);
      throw error; 
    }
  }
  async getById(id: number): Promise<AxiosResponse<{ data: CarModel }>> {
    try {
      const response = await axios.get<{ data: CarModel }>(`http://localhost:8080/api/cars/${id}`);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

export default CarService;