import { storeItem, getItem } from './storage';

export const storeTokenSecurely = async (platform: string, token: string) => {
  const key = `${platform}_token`;
  console.log("Storing token securely");
  await storeItem(key, token);
};

export const retrieveTokenSecurely = async (platform: string) => {
  const key = `${platform}_token`;
  return await getItem(key);
};