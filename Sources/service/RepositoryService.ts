import { Repository } from "../model/Repository";
import { BaseRepository } from "../model/generic_repository/BaseRepository";

class RepositoryService extends BaseRepository<Repository>{
    collection = 'DevGardenRepositoryController';

    getMany(){
        return super.getMany();
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
}

export default RepositoryService;