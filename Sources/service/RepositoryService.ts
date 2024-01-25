import { Repository, mapApiObjectToRepository } from "../model/Repository";
import { BaseResources } from "../model/generic_repository/BaseResources";
import { ApiResponse } from "../model/generic_repository/ApiReponse";

export class RepositoryService extends BaseResources<Repository>{
    collection = 'DevGardenRepository';
    getManyString = "GetAllRepositories"

    constructor(){
        super();
    }

    async getMany(){
        const result = await super.getMany();
        const deserializedResult = this.deserialize(result);
        return { data: deserializedResult, succeeded: result.succeeded, errors: result.errors };
    }

    get(id: string){
        return super.get(id);
    }

    create(id: string, data: Repository){
        return super.create(id,data);
    }

    update(id: string, data: Repository){
        return super.update(id,data);
    }

    delete(id: string){
        return super.delete(id);
    }

    private deserialize(response: ApiResponse<Repository[]>): Repository[] {
        return (response.data || []).map((item: any) => {
            return mapApiObjectToRepository(item);
          });
    }
}
