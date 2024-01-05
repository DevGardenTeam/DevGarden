import { Member } from "./Member";
import { Repository } from "./Repository";

export class Commit{
    id: string;
    message: string;
    author: Member;
    repository: Repository;
}