import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users';

export const UserService = {
  getUserById: async (id: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  updateEmail: async (id: number, newEmail: string): Promise<void> => {
    try {
      await axios.put(`${BASE_URL}/${id}/updateEmail`, { email: newEmail });
    } catch (error) {
      throw error;
    }
  },
  updatePhoneNumber: async (id: number, newPhoneNumber: string): Promise<void> => {
    try {
      await axios.put(`${BASE_URL}/${id}/updatePhoneNumber`, { gsm: newPhoneNumber });
    } catch (error) {
      throw error;
    }
  },
  updatePassword: async (id: number, newPassword: string, confirmNewPassword: string): Promise<void> => {
    try {
      await axios.put(`${BASE_URL}/${id}/updatePassword`, { newPassword, confirmNewPassword });
    } catch (error) {
      throw error;
    }
  },
};

