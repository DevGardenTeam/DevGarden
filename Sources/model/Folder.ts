import { File } from "./File";

export class Folder extends File{
    id: string;
    name: string;
    size: number;
    files: File[]
}