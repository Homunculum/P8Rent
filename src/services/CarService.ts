import axios, { AxiosResponse } from 'axios';

import { CarModel } from '../models/responses/CarModel';

class CarService {

  // Java servisine get request yapacak olan metot
  async getAll(): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.get<any>('http://localhost:8080/api/cars/getAll');
      return response;
    } catch (error) {
      // Hata durumunda burada işlem yapabilirsiniz.
      console.error('Error fetching data:', error);
      throw error; // İsterseniz hatayı yukarıya iletebilirsiniz.
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