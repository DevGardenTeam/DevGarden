export class Label{
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
export function mapApiObjectToLabel(apiObject: any): Label {
  console.log(apiObject);
  return new Label(
    apiObject.id,
    apiObject.name,
  );
}