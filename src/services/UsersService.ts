import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users';

export const UserService = {
  getUserById: async (userId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
