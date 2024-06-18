// storage.web.js
const storeItem = async (key: string, value: string) => {
    window.localStorage.setItem(key, value);
  };
  
  const getItem = async (key: string) => {
    return window.localStorage.getItem(key);
  };
  
  export { storeItem, getItem };