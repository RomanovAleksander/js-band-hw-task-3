export default class StorageSingleton {
  constructor() {
    if (StorageSingleton.instance) {
      return StorageSingleton.instance
    }
    StorageSingleton.instance = this;
    this.prefix = 'JS-Band-';
    return this;
  }

  getItem(key) {
    return JSON.parse(localStorage.getItem(`${this.prefix}${key}`));
  }

  setItem(key, value) {
    return localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(value));
  }
}