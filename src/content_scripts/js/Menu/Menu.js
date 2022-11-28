import { insertOnPage } from "../utils/insertOnPage.js";

export class Menu {
  static Dibujar() {
    insertOnPage.afterend(
      document.getElementById("submenufooter"),
      `<button id="MenuOpen" class="menuitem">GhG <i class="fa-solid fa-bars"></i></button>`
    );
    document.body.insertAdjacentHTML(
      "afterbegin",
      `
      <div id="menuSidenav" class="menutools">
            <h1>Configuración</h1>
            <hr/>
            <a id="CloseMenu" href="#" class="closebtn">&times;</a>
            <div id="menuContent"></div>
      </div>`
    );
    let menuOpen = document.getElementById("MenuOpen");
    menuOpen.addEventListener("click", Menu.openNav);
    menuOpen.addEventListener("touchstart", Menu.openNav);
    let closeMenu = document.getElementById("CloseMenu");
    closeMenu.addEventListener("click", Menu.closeNav);
  }
  static openNav() {
    document.getElementById("menuSidenav").style.display = "block";
  }

  static closeNav() {
    document.getElementById("menuSidenav").style.display = "none";
  }
  static addConfig(html) {
    html += "<hr/>";
    insertOnPage.beforeend(document.getElementById("menuContent"), html);
  }
}
