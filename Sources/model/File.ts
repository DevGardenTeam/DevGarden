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