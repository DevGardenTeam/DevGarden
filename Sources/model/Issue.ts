import { Label } from "./Label";

export class Issue{
    id: string;
    name: string;
    labels: Label[];

    constructor(
        id: string, 
        name: string, 
        labels: Label[]
      ) {
        this.id = id;
        this.name = name;
        this.labels = labels;
    }
}

// Fonction de mapping
export function mapApiObjectToIssue(apiObject: any): Issue {
  return new Issue(
    apiObject.id.toString(),
    apiObject.name,
    apiObject.labels,
  );
}