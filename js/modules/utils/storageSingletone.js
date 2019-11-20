export default class StorageSingletone {
  constructor() {
    if (StorageSingletone.instance) {
      return StorageSingletone.instance
    }
    StorageSingletone.instance = this;
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