import { Branch, mapApiObjectToBranch } from "../model/Branch";
import { BaseResources } from "../model/generic_repository/BaseResources";
import { ApiResponse } from "../model/generic_repository/ApiReponse";

export class BranchService extends BaseResources<Branch>{
    collection = 'Branch';
    getManyString = "GetAllBranches"

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

    create(id: string, data: Branch){
        return super.create(id,data);
    }

    update(id: string, data: Branch){
        return super.update(id,data);
    }

    delete(id: string){
        return super.delete(id);
    }

    private deserialize(response: ApiResponse<Branch[]>): Branch[] {
        return (response.data || []).map((item: any) => {
            return mapApiObjectToBranch(item);
          });
    }
}