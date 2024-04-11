export class Task{
    id: string;
    title: string;

    constructor(
        id: string, 
        title: string,
      ) {
        this.id = id;
        this.title = title;
    }
}

// Fonction de mapping
export function mapApiObjectToTask(apiObject: any): Task {
  return new Task(
    apiObject.id,
    apiObject.title,
  );
}