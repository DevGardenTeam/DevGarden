import { HttpClient } from "../../model/generic_repository/HttpClient";
import { CURRENT_BASE_URL } from "../../constants/constants";
import StringUtils from "../../helper/StringUtils";

interface RegisterResult {
  success: boolean;
  message: string;
  response?: Response;
}

class Authen extends HttpClient {
  constructor() {
    super();
  }

  static async register(username: string, password: string, verifPassword: string): Promise<RegisterResult> {

    if (!StringUtils.isNotNullOrEmpty(username) || !StringUtils.isNotNullOrEmpty(password)){
      return { success:false , message:"Veuillez remplir tous les champs !!" };
    }

    if (verifPassword != password){
      return { success:false , message:"Les mots de passe ne sont pas identiques !!" };
    }

    const url = `${CURRENT_BASE_URL}/Authentification/register`;

    // const requestUrl = `${url}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    const payload = {
      username: username,
      password: password
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        return { success:false , message:await response.text() };
      }
    } catch (error) {
      console.error('Error:', error);
      return { success:false , message:"Une erreur inattendue est apparue" };
    }
    return { success: true , message:"ok" } ;
  }

  static async login(username: string, password: string): Promise<RegisterResult> {

    if (!StringUtils.isNotNullOrEmpty(username) || !StringUtils.isNotNullOrEmpty(password)){
      return { success:false , message:"Veuillez remplir tous les champs !!" };
    }

    const url = `${CURRENT_BASE_URL}/Authentification/login`;

    const payload = {
      username: username,
      password: password
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        return { success:false , message:await response.text() };
      } else {
        return { success:true , message:"ok", response: response };
      }
    } catch (error) {
      console.error('Error:', error);
      return { success:false , message:"Une erreur inattendue est apparue" };
    }
  }

  static async getTokens(username: string) {
    const url = `${CURRENT_BASE_URL}/OAuth/tokens?username=${username}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return response.json();
      }
    } catch(error) {
      console.error('Error:', error);
    }
  }
}

export default Authen;