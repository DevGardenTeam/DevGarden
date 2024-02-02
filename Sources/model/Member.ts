import { Repository } from "./Repository";

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