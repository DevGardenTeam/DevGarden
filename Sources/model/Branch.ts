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

// Fonction de mapping
export function mapApiObjectToBranch(apiObject: any): Branch {

  return new Branch(
    apiObject.id.toString(),
    apiObject.name,
    []
  );
}