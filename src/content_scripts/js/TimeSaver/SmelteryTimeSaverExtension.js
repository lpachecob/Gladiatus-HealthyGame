import { insertOnPage } from "../utils/insertOnPage.js";
import { romanize } from "../utils/Romanize.js";

export class Smeltery {
  static UI() {
    let smelterActions = document.getElementsByClassName("smelter-actions")[0];
    if (smelterActions == undefined)
      window.setTimeout(() => {
        let smelterActions =
          document.getElementsByClassName("smelter-actions")[0];
        insertOnPage.beforeend(
          smelterActions,
          `
              <strong>Acciones Rapidas</strong>
              <br />
              Selecciona un inventario para fundir
              <select id="SelectInventario" size="1">
              </select>
              <button class="awesome-button" type="button" id="FundirTodo">
                Fundir Todo
              </button>`
        );
        this.SaveInventory();
        this.fundir();
      }, 1000);
  }
  static SaveInventory() {
    let inventarios = document.getElementById("inventory_nav");
    if (!!inventarios == true) {
      let inventariosActivos = [];
      let SelectInventario = document.getElementById("SelectInventario");
      let contador = 0;
      for (let item of inventarios.children) {
        if (item.attributes["data-available"].value != "false") {
          inventariosActivos.push(item);
          let option = document.createElement("option");
          option.value = contador;
          option.innerHTML = `Inventario ${romanize(contador + 1)}`;
          SelectInventario.appendChild(option);
        }
        contador++;
      }
    }
    if (localStorage.SelectInventario == undefined) {
      localStorage.SelectInventario == SelectInventario.value;
    } else {
      SelectInventario.value = localStorage.SelectInventario;
    }
    SelectInventario.addEventListener("change", () => {
      localStorage.SelectInventario = SelectInventario.value;
      location.reload();
    });
  }
  static fundir() {
    let items = document.getElementsByClassName("ui-draggable");
    let btnFundicion =
      document.getElementsByClassName("smelter-actions")[0].children[1];
    let inventarios = document.getElementById("inventory_nav");
    let SelectInventario = document.getElementById("SelectInventario");
    const FundirTodo = document.getElementById("FundirTodo");
    FundirTodo.addEventListener("click", () => {
      if (
        inventarios.children[
          parseInt(SelectInventario.value)
        ].classList.contains("current") == false
      ) {
        inventarios.children[parseInt(SelectInventario.value)].click();
      }
      btnFundicion.click();
      for (let index = 9; index < items.length; index++) {
        items[index].click();
      }
    });
  }

  static Run() {
    this.UI();
  }
}
