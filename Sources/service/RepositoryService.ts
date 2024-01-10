import { Repository } from "../model/Repository";
import { BaseRepository } from "../model/generic_repository/BaseRepository";
import { ApiResponse } from "../model/generic_repository/ApiReponse";

export class RepositoryService extends BaseRepository<Repository>{
    collection = 'DevGardenRepository';

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
