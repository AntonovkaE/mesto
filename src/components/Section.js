export default class Section {
  constructor({ item, renderer }, selector) {
    this._renderedItems = item;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  addItem(item) {
    const card = this._renderer(item);
    this._container.append(card);
  }
  addItemToTop(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }

  renderItems() {
    if (Array.isArray(this._renderedItems)) {
      this._renderedItems.forEach(item => this.addItem(item))

    }
    else {
      this._renderer(this._renderedItems)
    }
  }
}