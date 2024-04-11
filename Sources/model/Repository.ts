import { Member, mapApiObjectToMember } from "./Member";
import { Branch } from "./Branch";
import { Commit } from "./Commit";
import { Issue } from "./Issue";

export class Repository{
    id: string;
    name: string;
    owner: Member;
    isPrivate: boolean;
    description: string;
    isFork: boolean;
    url: string;
    branches: Branch[];
    commits: Commit[];
    contributors: Member[];
    issues: Issue[];
    language: string;
    size: number;

    constructor(
        id: string,
        name: string,
        owner: Member,
        isPrivate: boolean,
        description: string,
        isFork: boolean,
        url: string,
        branches: Branch[],
        commits: Commit[],
        contributors: Member[],
        issues: Issue[],
        language: string,
        size: number
      ) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.isPrivate = isPrivate;
        this.description = description;
        this.isFork = isFork;
        this.url = url;
        this.branches = branches;
        this.commits = commits;
        this.contributors = contributors;
        this.issues = issues;
        this.language = language;
        this.size = size;
      }
}

// Fonction de mapping
export function mapApiObjectToRepository(apiObject: any): Repository {
  const owner = mapApiObjectToMember(apiObject.owner);

  return new Repository(
    apiObject.id.toString(),
    apiObject.name,
    owner,
    apiObject.isPrivate,
    apiObject.description || "",
    apiObject.isFork,
    apiObject.url,
    [],
    [],
    [],
    [],
    apiObject.language,
    apiObject.size
  );
}