import { Member } from "./Member";
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
}