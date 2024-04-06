import { Member } from "./Member";
import { Task } from "./Task";

export class PertTask extends Task{
    duration: number;
    priority: number;
    members: Member[];

    constructor(
        id: string, 
        title: string,
        duration: number,
        priority: number,
        members: Member[]
      ) {
        super(id, title);
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.priority = priority;
        this.members = members;
    }
}

// Fonction de mapping
export function mapApiObjectToPertTask(apiObject: any): PertTask {
  return new PertTask(
    apiObject.id,
    apiObject.title,
    apiObject.duration,
    apiObject.priority,
    apiObject.members
  );
}