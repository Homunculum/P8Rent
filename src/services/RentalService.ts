import axios, { AxiosResponse } from 'axios';
import AddRent from '../models/request/AddRent';


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
  async addRent(rentalData: AddRent): Promise<any> {
    try {
      const response = await axios.post('http://localhost:8080/api/rentals/add', rentalData);
      return response;
    } catch (error) {
      console.error('Error adding rent:', error);
      throw error;
    }
  }
}

export default RentalService;