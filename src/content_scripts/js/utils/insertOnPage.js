export class insertOnPage {
  // Antes que el propio elemento.
  static beforebegin(object, html) {
    object.insertAdjacentHTML("beforebegin", html);
  }
  //Justo dentro del elemento, antes de su primer elemento hijo.
  static afterbegin(object, html) {
    object.insertAdjacentHTML("afterbegin", html);
  }
  //Justo dentro del elemento, después de su último elemento hijo.
  static beforeend(object, html) {
    object.insertAdjacentHTML("beforeend", html);
  }
  //Después del propio elemento.
  static afterend(object, html) {
    object.insertAdjacentHTML("afterend", html);
  }
}
