export class User {
  //Model
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  userName: string;
  token: string;
  reference: string;
  //Calculated
  isAdmin: boolean;
  isVariable: boolean;
  role: string;

  constructor() {
  }
}
