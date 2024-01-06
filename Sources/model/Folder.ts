import { File } from "./File";

export class Folder extends File{
    id: string;
    name: string;
    size: number;
    encoding: string;
    content: string;
    files: File[]
    folders: Folder[]

    constructor(
        id: string, 
        name: string, 
        size: number,
        encoding: string,
        content: string, 
        files: File[], 
        folders: Folder[]
      ) {
        super(id, name, size, encoding, content);
        this.id = id;
        this.name = name;
        this.size = size;
        this.encoding = encoding;
        this.content = content;
        this.files = files;
        this.folders = folders;
    }
}