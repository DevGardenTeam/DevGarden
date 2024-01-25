import { Member } from "./Member";
import { Repository } from "./Repository";

export class Commit{
    id: string;
    message: string;
    author: Member;
    repository: Repository;

    constructor(
        id: string, 
        message: string, 
        author: Member, 
        repository: Repository
      ) {
        this.id = id;
        this.message = message;
        this.author = author;
        this.repository = repository;
    }
}