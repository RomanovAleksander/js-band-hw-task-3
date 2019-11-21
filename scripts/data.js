import LocalStorage from "./utils/localStorage.js";
import {TRANSPORT_KEY, COSTS_KEY} from "./utils/constans.js";

export default class Data extends LocalStorage{
  constructor(prefix) {
    super(prefix);
    this.transport = [];
    this.costs = [];
    this.storage = new LocalStorage();
    this.transportKey = `${this.prefix}${TRANSPORT_KEY}`;
    this.costsKey = `${this.prefix}${COSTS_KEY}`;
  }

  getItemsFromLocalStorage() {
    console.log(localStorage);
    if (localStorage[this.transportKey]) {
      this.transport = this.storage.getItem(TRANSPORT_KEY);
      this.renderList(this.transport);
    }
    if (localStorage[this.costsKey]) {
      this.costs = this.storage.getItem(COSTS_KEY);
      this.renderList(this.costs);
    }
  }

  renderList(list) {
    list.forEach(item => {
      this.renderLogic(item);
    });
  }

  renderLogic(item) {
    const costsList = document.querySelector('.costs-list-header');
    const transportsList = document.querySelector('.transport-list-header');

    if (item.costOfCargo) {
      this.renderItem(costsList, item);
    } else {
      this.renderItem(transportsList, item);
    }
  }

  renderItem(list, item) {
    const isType = item.type ? item.type : 'Cost';
    const render = (item) => {
      let result = '';
      for (const i in item) {
        if (item.hasOwnProperty(i)) {
          result += `<div class="item-text"><span>${i}:</span> <i>${item[i]}</i></div>`
        }
      }
      return result;
    };
    list.insertAdjacentHTML('afterEnd', `
      <div class="list-item">
      <div class="item-text"><b>${isType}</b></div>
        ${render(item)}
      </div>
      `);
  }
}