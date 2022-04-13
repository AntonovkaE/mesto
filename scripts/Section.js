export default class Section {
  constructor({ item, renderer }, selector) {
    this._renderedItems = item;
    this._renderer = renderer;
    
    this._container = document.querySelector(selector);
  }
  addItem(element) {
    this._container.append(element);
  }

  // renderItems() {
  //   this._renderedItems.forEach(item => this._renderer(item))
  // }

  // setItem(element) {
  //   this._container.append(element);
  // }
}