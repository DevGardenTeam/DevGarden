import { Label } from "./Label";
import { Member } from "./Member";
import { Milestone } from "./Milestone";
import { Repository } from "./Repository";

export class Issue{
    id: string;
    title: string; 
    body: string;
    state: string; 
    creationDate: Date; 
    author: Member;
    milestone: Milestone; 
    repository: Repository;
    labels: Label[];

    constructor(
        id: string, 
        title: string, 
        body: string, 
        state: string, 
        creationDate: Date, 
        author: Member, 
        milestone: Milestone, 
        repository: Repository, 
        labels: Label[]
      ) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.state = state;
        this.creationDate = creationDate;
        this.author = author;
        this.milestone = milestone;
        this.repository = repository;
        this.labels = labels;
    }
}

// Fonction de mapping
export function mapApiObjectToIssue(apiObject: any): Issue {
  return new Issue(
    apiObject.id.toString(),
    apiObject.title,
    apiObject.body,
    apiObject.state,
    apiObject.creationDate,
    apiObject.author,
    apiObject.milestone,
    apiObject.repository,
    apiObject.labels,
  );
}