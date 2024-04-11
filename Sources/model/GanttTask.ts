import { Member } from "./Member";
import { PertTask } from "./PertTask";

export class GanttTask extends PertTask{
    dateBegin: Date;
    dateEnd: Date;

    constructor(
        id: string, 
        title: string,
        duration: number,
        priority: number,
        members: Member[],
        dateBegin: Date,
        dateEnd: Date
      ) {
        super(id, title, duration, priority, members);
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.priority = priority;
        this.members = members;
        this.dateBegin = dateBegin;
        this.dateEnd = dateEnd;
    }
}

// Fonction de mapping
export function mapApiObjectToPertTask(apiObject: any): GanttTask {
  return new GanttTask(
    apiObject.id,
    apiObject.title,
    apiObject.duration,
    apiObject.priority,
    apiObject.members,
    apiObject.dateBegin,
    apiObject.dateEnd
  );
}