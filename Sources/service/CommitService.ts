import { Commit, mapApiObjectToCommit } from "../model/Commit";
import { BaseResources } from "../model/generic_repository/BaseResources";
import { ApiResponse } from "../model/generic_repository/ApiReponse";

export class CommitService extends BaseResources<Commit>{
    collection = 'Commit';
    getManyString = "GetAllCommits"

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

    create(id: string, data: Commit){
        return super.create(id,data);
    }

    update(id: string, data: Commit){
        return super.update(id,data);
    }

    delete(id: string){
        return super.delete(id);
    }

    private deserialize(response: ApiResponse<Commit[]>): Commit[] {
        return (response.data || []).map((item: any) => {
            return mapApiObjectToCommit(item);
          });
    }
}