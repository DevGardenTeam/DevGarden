import { Task } from "./Task";

export class Wbs{
    tasks: Map<string, Task[]>;

    constructor(
        tasks: Map<string, Task[]>
      ) {
        this.tasks = tasks;
    }
}

// Fonction de mapping
export function mapApiObjectToTask(apiObject: any): Wbs {
  return new Wbs(
    apiObject.tasks,
  );
}