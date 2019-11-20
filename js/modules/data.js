import StorageSingletone from "./utils/storageSingletone.js";
import {TRANSPORT_KEY, COSTS_KEY} from "./utils/constans.js";

export default class Data extends StorageSingletone{
  constructor(prefix) {
    super(prefix);
    this.transport = [];
    this.costs = [];
    this.storage = new StorageSingletone();
    this.transportKey = `${this.prefix}${TRANSPORT_KEY}`;
    this.costsKey = `${this.prefix}${COSTS_KEY}`;
  }

  getItemsFromLocalStorage() {
    console.log(localStorage);
    if (localStorage[this.transportKey]) {
      this.transport = this.storage.getItem(TRANSPORT_KEY);
      this.transport.forEach(item => {
        this.renderItem(item);
      });
    }
    if (localStorage[this.costsKey]) {
      this.costs = this.storage.getItem(COSTS_KEY);
      this.costs.forEach(item => {
        this.renderItem(item);
      });
    }
  }

  renderItem(item) {
    const transportsList = document.querySelector('.transport-list-header');
    const costsList = document.querySelector('.costs-list-header');
    const render = (item) => {
      let result = '';
      for (const i in item) {
        if (item.hasOwnProperty(i)) {
          result += `<div class="item-text"><span>${i}:</span> <i>${item[i]}</i></div>`
        }
      }
      return result;
    };

    if (item.costOfCargo) {
      costsList.insertAdjacentHTML('afterEnd', `
      <div class="list-item">
        ${render(item)}
      </div>
      `);
    } else {
      transportsList.insertAdjacentHTML('afterEnd', `
      <div class="list-item">
        <div class="item-text"><b>${item.type}</b></div>
        ${render(item)}
      </div>
      `);
    }
  }
}