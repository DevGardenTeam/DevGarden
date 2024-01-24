// TODO: import these from env variables

export const GITHUB_CLIENT_ID = 'e2ab8ffbefc5b983f71b';
export const GITEA_CLIENT_ID = '4a0f3bde-8ed7-4e56-869c-6ffb321d945b';
export const GITLAB_CLIENT_ID = '5ada6aa78b7cc94c2536c02756e44f3bbf236dae84f3ae66c83773d5540ddd6d';

// State generator

import { v4 as uuidv4 } from 'uuid';

export function generateState() {
  return uuidv4();
}