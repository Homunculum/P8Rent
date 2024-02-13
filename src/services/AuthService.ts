import axios from 'axios';


export const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
  },
};
