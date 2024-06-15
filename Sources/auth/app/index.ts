import { HttpClient } from "../../model/generic_repository/HttpClient";
import { CURRENT_BASE_URL } from "../../constants/constants";
import StringUtils from "../../helper/StringUtils";

interface RegisterResult {
  success: boolean;
  message: string;
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

    const requestUrl = `${url}?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    try {
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return { success:false , message:await response.text() };
      }
    } catch (error) {
      console.error('Error:', error);
      return { success:false , message:"Une erreur inattendue est apparue" };
    }
    return { success:true , message:"ok" } ;
  }

  static async login(username: string, password: string): Promise<RegisterResult> {

    if (!StringUtils.isNotNullOrEmpty(username) || !StringUtils.isNotNullOrEmpty(password)){
      return { success:false , message:"Veuillez remplir tous les champs !!" };
    }

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
        return { success:false , message:await response.text() };
      }
    } catch (error) {
      console.error('Error:', error);
      return { success:false , message:"Une erreur inattendue est apparue" };
    }
    return { success:true , message:"ok" };
  }
}

export default Authen;