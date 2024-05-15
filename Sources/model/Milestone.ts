export class Milestone{
    id: string;
    name: string;

    constructor(
        id: string, 
        name: string
      ) {
        this.id = id;
        this.name = name;
    }
}

// Fonction de mapping
export function mapApiObjectToMilestone(apiObject: any): Milestone {
  console.log(apiObject);
  return new Milestone(
    apiObject.id.toString(),
    apiObject.name,
  );
}