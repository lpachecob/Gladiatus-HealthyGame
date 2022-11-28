export class OuterLinks {
  static GTools() {
    if (!!document.getElementById("gca_shortcuts_bar")) {
      let gca_shortcuts_bar = document.getElementById("gca_shortcuts_bar");
      gca_shortcuts_bar.insertAdjacentHTML(
        "beforeend",
        `<div class="icon-out"><a class="icon gtools-icon" href="https://es.gladiatus-tools.com/" title="Ir a Gladiatus Tools" target="_blank"></a></div>`
      );
    }
  }
  static run() {
    OuterLinks.GTools();
  }
}
