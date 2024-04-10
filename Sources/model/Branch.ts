import { Commit } from "./Commit";

export class Branch{
    id: string;
    name: string;
    commits: Commit[];

    constructor(
        id: string, 
        name: string, 
        commits: Commit[]
      ) {
        this.id = id;
        this.name = name;
        this.commits = commits;
    }
}