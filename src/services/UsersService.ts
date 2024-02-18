import axios from 'axios';
import { AddUser } from '../models/request/AddUser';
import { UsersModel } from '../models/responses/UsersModel';


export class UsersService {
  static async addUser(user: AddUser) {
    const response = await axios.post('http://localhost:8080/api/users/add', user);
    return response.data;
  }

  static async getAllUsers() {
    const response = await axios.get('http://localhost:8080/api/users/getAll');
    return response.data as UsersModel[];
  }
}
