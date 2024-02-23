import { useRepositoryViewModel } from "../view-models/RepositoryViewModel";
import { Repository, mapApiObjectToRepository } from "./Repository";

export class Member{
    id: string;
    name: string;
    repositories: Repository[];

    constructor(
        id: string, 
        name: string, 
        repositories: Repository[]
      ) {
        this.id = id;
        this.name = name;
        this.repositories = repositories;
    }
}

export function mapApiObjectToMember(apiObject: any): Member {
  return new Member(
    apiObject.id.toString(),
    apiObject.login, //NOT ADAPTED TO ALL PLATFORM (id/sha) ?
    apiObject.repositories
  );
}