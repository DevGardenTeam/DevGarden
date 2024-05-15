import { File, mapApiObjectToFile } from "./File";

export class Folder extends File{
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

// Fonction de mapping
export function mapApiObjectToFolder(apiObject: any): Folder {
  const files = apiObject.files.map((fileData: any) => {
    return mapApiObjectToFile(fileData);
  });
  const folders = apiObject.folders.map((folderData: any) => {
    return mapApiObjectToFolder(folderData);
  });

  console.log(apiObject);
  return new Folder(
    apiObject.id,
    apiObject.name,
    apiObject.size,
    apiObject.encoding,
    apiObject.content,
    files,
    folders
  );
}