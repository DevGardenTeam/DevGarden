import { IBaseResources } from "./IBaseResources";
import { ApiResponse } from "./ApiReponse";
import { HttpClient } from "./HttpClient";
import { CURRENT_BASE_URL } from "../../constants/constants";

export abstract class BaseResources<T> extends HttpClient implements IBaseResources<T> {
    protected collection: string | undefined;
    protected getString: string | undefined; 
    protected getManyString: string | undefined; 
    protected createString: string | undefined; 
    protected updateString: string | undefined; 
    protected deleteString: string | undefined; 
  
    public async get(id: string): Promise<ApiResponse<T>> {
      const instance = this.createInstance();
      const result = await instance.get(`${CURRENT_BASE_URL}/${this.collection}/${id}`).then(transform);
      return result as ApiResponse<T>;
    }
  
    public async getMany(params?: any): Promise<ApiResponse<T[]>> {
      const instance = this.createInstance();
      let url = `${CURRENT_BASE_URL}/${this.collection}/${this.getManyString}`;

      if (params) {
        const queryParams = new URLSearchParams(params).toString();
        url += `?${queryParams}`;
      }
    
      console.log(url);

      const result = await instance.get(url).then(transform);
      return result as ApiResponse<T[]>;
    }
  
    public async create(id: string, item: T): Promise<ApiResponse<T>> {
      const instance = this.createInstance();
      const result = await instance.post(`${CURRENT_BASE_URL}/${this.collection}/`, item).then(transform);
      return result as ApiResponse<T>;
    }
  
    public async update(id: string, item: T): Promise<ApiResponse<T>> {
      const instance = this.createInstance();
      const result = await instance.put(`${CURRENT_BASE_URL}/${this.collection}/${id}`, item).then(transform);
      return result as ApiResponse<T>;
    }
  
    public async delete(id: any): Promise<ApiResponse<T>> {
      const instance = this.createInstance();
      const result = await instance.delete(`${CURRENT_BASE_URL}/${this.collection}/${id}`).then(transform);
      return result as ApiResponse<T>;
    }
  }

  const transform = (responseData: any): Promise<ApiResponse<any>> => {
    return new Promise((resolve, reject) => {
      if (!responseData) {
        reject(new Error("Response data is undefined"));
        return;
      }
  
      const result: ApiResponse<any> = {
        data: responseData,
        succeeded: true,
        errors: null,
      };
  
      resolve(result);
    });
  };
  
  
