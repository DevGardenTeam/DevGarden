import { Issue, mapApiObjectToIssue } from "../model/Issue";
import { BaseResources } from "../model/generic_repository/BaseResources";
import { ApiResponse } from "../model/generic_repository/ApiReponse";

export class IssueService extends BaseResources<Issue>{
    collection = 'Issue';
    getManyString = "GetAllIssues"

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

    create(id: string, data: Issue){
        return super.create(id,data);
    }

    update(id: string, data: Issue){
        return super.update(id,data);
    }

    delete(id: string){
        return super.delete(id);
    }

    private deserialize(response: ApiResponse<Issue[]>): Issue[] {
        return (response.data || []).map((item: any) => {
            return mapApiObjectToIssue(item);
          });
    }
}
