import { HttpClient } from "../../model/generic_repository/HttpClient";
import { CURRENT_BASE_URL } from "../../constants/constants";
import axios, { AxiosInstance } from 'axios';

class Authen extends HttpClient {
  constructor() {
    super();
  }

  static async register(username: string, password: string): Promise<boolean> {

    const url = `${CURRENT_BASE_URL}/Authentification/register`;

    const requestUrl = `${url}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    try {
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
    return true;
  }

  static async login(username: string, password: string): Promise<boolean> {
    const url = `${CURRENT_BASE_URL}/Authentification/login`;

    const requestUrl = `${url}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    try {
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
    return true;
  }
}

export default Authen;