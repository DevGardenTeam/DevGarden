import { Repository } from "../model/Repository";
import { BaseResources } from "../model/generic_repository/BaseResources";
import { ApiResponse } from "../model/generic_repository/ApiReponse";

export class RepositoryService extends BaseResources<Repository>{
    collection = 'DevGardenRepository';
    getManyString = "GetAllRepositories"

    constructor(){
        super();
    }

    async getMany(){
        console.log("GetMany 1");
        const result = await super.getMany();
        console.log("GetMany 2");
        const deserializedResult = this.deserialize(result);
        console.log("GetMany 3");
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
        console.log("here")

        console.log(response);
        

        return (response.data || []).map((item: any) => {
            return new Repository(
                item.id,
                item.name,
                item.owner,
                item.isPrivate,
                item.description,
                item.isFork,
                item.url,
                item.branches,
                item.commits,
                item.contributors,
                item.issues,
                item.language,
                item.size
            );
        });
    }
}
