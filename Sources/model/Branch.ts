import { Commit, mapApiObjectToCommit } from "./Commit";

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
  const commits = apiObject.commits.map((commitData: any) => {
    return mapApiObjectToCommit(commitData);
  });
  
  return new Branch(
    apiObject.id.toString(),
    apiObject.name,
    commits
  );
}