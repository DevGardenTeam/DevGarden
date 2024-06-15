import { PLATFORMS } from "../constants/constants"

export class Token{
    service: string;
    token: string;

    constructor(
        service: string, 
        token: string,
      ) {
        this.service = service;
        this.token = token;
    }
}