import { insertOnPage } from "../utils/insertOnPage.js";
import { queryParams, sh } from "../main.js";

export class Vendedores {
  static AñadirEnlaces() {
    console.log("vendedor");
    const mainnav =
      document.getElementById("mainnav").children[0].children[0].children[0]
        .children[0];

    if (parseInt(queryParams.sub) < 3) {
      insertOnPage.beforeend(
        mainnav,
        `
        <td><a href="index.php?mod=inventory&amp;sub=3&amp;${sh.get()}" class="awesome-tabs">Bienes Generales<div class="navBG"></div></a></td>
        <td><a href="index.php?mod=inventory&amp;sub=3&amp;${sh.get()}" class="awesome-tabs">Alquimista<div class="navBG"></div></a></td>
        <td><a href="index.php?mod=inventory&amp;sub=3&amp;${sh.get()}" class="awesome-tabs">Mercenarios<div class="navBG"></div></a></td>
        <td><a href="index.php?mod=inventory&amp;sub=3&amp;${sh.get()}" class="awesome-tabs">Malefica<div class="navBG"></div></a></td>
      `
      );
    }
    if (parseInt(queryParams.sub) >= 3) {
      insertOnPage.afterbegin(
        mainnav,
        `
        <td><a href="index.php?mod=inventory&amp;sub=1&amp;${sh.get()}" class="awesome-tabs">Armero<div class="navBG"></div></a></td>
        <td><a href="index.php?mod=inventory&amp;sub=2&amp;${sh.get()}" class="awesome-tabs">Herrero<div class="navBG"></div></a></td>
      `
      );
    }
  }
  static Run() {
    this.AñadirEnlaces();
  }
}
