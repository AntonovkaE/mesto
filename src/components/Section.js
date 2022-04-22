export default class Section {
  constructor({ item, renderer }, selector) {
    this._renderedItems = item;
    this._renderer = renderer;
    
    this._container = document.querySelector(selector);
  }
  addItem(element) {
    this._container.append(element);
  }
  addItemToTop(element) {
    this._container.prepend(element);
  }

  renderItems() {
    if (Array.isArray(this._renderedItems)) {
      this._renderedItems.forEach(item => this._renderer(item))
    }
    else {
      this._renderer(this._renderedItems)
    }
    
  }
}