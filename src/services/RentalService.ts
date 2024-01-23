import axios, { AxiosResponse } from 'axios';
import { RentalModel } from '../models/responses/RentalModel';

class RentalService {
  async getAll(): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.get<any>('http://localhost:8080/api/rentals/getAll');
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
export default RentalService;