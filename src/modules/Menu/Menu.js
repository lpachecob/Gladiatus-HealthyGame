import { insertOnPage } from "../utils/insertOnPage.js";

export class Menu {
  static Dibujar() {
    document.body.insertAdjacentHTML(
      "afterbegin",
      `
            <button id="MenuOpen" class="btnMenu"><img src="mdn-logo-sm.png" alt="GHG"></button>
            <div id="menuSidenav" class="menutools">
                 <h1>Configuración</h1>
                 <hr/>
                 <a id="CloseMenu" href="#" class="closebtn">&times;</a>
                 <div id="menuContent"></div>
            </div>
            `
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
