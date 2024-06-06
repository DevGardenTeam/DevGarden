export class File{
    id: string;
    type: string;
    name: string;
    size: number;
    path: string;
    encoding: string;
    content: string;
    
    constructor(
        id: string, 
        type: string,
        name: string, 
        size: number, 
        path: string,
        encoding: string, 
        content: string
      ) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.size = size;
        this.path = path;
        this.encoding = encoding;
        this.content = content;
    }
}

// Fonction de mapping
export function mapApiObjectToFile(apiObject: any): File {
  return new File(
    apiObject.sha,
    apiObject.type,
    apiObject.name,
    apiObject.size,
    apiObject.path,
    apiObject.encoding,
    apiObject.content,
  );
}