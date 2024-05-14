export class File{
    id: string;
    name: string;
    size: number;
    encoding: string;
    content: string;
    
    constructor(
        id: string, 
        name: string, 
        size: number, 
        encoding: string, 
        content: string
      ) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.encoding = encoding;
        this.content = content;
    }
}

// Fonction de mapping
export function mapApiObjectToFile(apiObject: any): File {
  console.log(apiObject);
  return new File(
    apiObject.id,
    apiObject.name,
    apiObject.size,
    apiObject.encoding,
    apiObject.content,
  );
}