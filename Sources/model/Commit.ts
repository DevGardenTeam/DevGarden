import { Member } from "./Member";
import { Repository } from "./Repository";

export class Commit{
    id: string;
    message: string;
    date: Date;
    author: Member;
    repository: Repository;

    constructor(
        id: string, 
        message: string,
        date: Date, 
        author: Member, 
        repository: Repository
      ) {
        this.id = id;
        this.message = message;
        this.date = date;
        this.author = author;
        this.repository = repository;
    }
}

// Fonction de mapping
export function mapApiObjectToCommit(apiObject: any): Commit {
  console.log(apiObject);
  return new Commit(
    apiObject.id.toString(),
    apiObject.message,
    apiObject.date,
    apiObject.author,
    apiObject.repository
  );
}