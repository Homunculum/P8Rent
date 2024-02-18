
export interface Role {
    id: number;
  }
  
  export interface AddUser {
    name: string;
    surname: string;
    gsm: string;
    email: string;
    password: string;
    roles: Role[];
  }
  