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