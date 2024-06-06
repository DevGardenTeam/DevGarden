import { File, mapApiObjectToFile } from "../model/File";
import { BaseResources } from "../model/generic_repository/BaseResources";
import { ApiResponse } from "../model/generic_repository/ApiReponse";

export class FileService extends BaseResources<File>{
    collection = 'File';
    getManyString = "GetAllFiles"

    constructor(){
        super();
    }

    async getMany(params?: any){
        const result = await super.getMany(params);
        const deserializedResult = this.deserialize(result);
        return { data: deserializedResult, succeeded: result.succeeded, errors: result.errors };
    }

    get(id: string){
        return super.get(id);
    }

    create(id: string, data: File){
        return super.create(id,data);
    }

    update(id: string, data: File){
        return super.update(id,data);
    }

    delete(id: string){
        return super.delete(id);
    }

    private deserialize(response: ApiResponse<File[] | File>): File[] {
        const data = response.data;
    
        if (Array.isArray(data)) {
            return data.map((item: any) => mapApiObjectToFile(item));
        } else if (data !== null && typeof data === 'object') {
            return [mapApiObjectToFile(data)];
        } else {
            console.error('Expected an array or an object but got:', data);
            return [];
        }
    }   
}