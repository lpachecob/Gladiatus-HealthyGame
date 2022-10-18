import { getURL, sh, dobleClickEvent } from "../main.js";
import { Menu } from "../Menu/Menu.js";

export class AutoComer {
  static VerificarSalud() {
    const salud = parseInt(
      document
        .getElementById("header_values_hp_points")
        .children[0].innerText.split(".")
        .join("")
    );
    const saludtotal = parseInt(
      document
        .getElementById("header_values_hp_points")
        .innerText.split("/")[1]
        .split(".")
        .join("")
    );
    const porcentaje = parseFloat(
      "0." + document.getElementById("inputVida").value
    );
    const saludResultante = saludtotal * porcentaje;
    const verificar = salud <= saludResultante ? true : false;
    return verificar;
  }

  static Regresar() {
    document.getElementsByClassName("cooldown_bar_link")[0].click();
  }

  static curar() {
    const items = document.getElementById("inv").children;
    window.setTimeout(items[0].dispatchEvent(dobleClickEvent), 10000);
    window.setTimeout(this.Regresar(), 5000);
  }

  static IrInventario() {
    const link = `https://s45-es.gladiatus.gameforge.com/game/index.php?mod=overview&${sh.get()}`;
    const mod = getURL[0].split("?")[1].slice(4);
    if (this.VerificarSalud() == true && mod != "overview") {
      window.location.href = link;
    }
    if (this.VerificarSalud() == false && mod == "overview") {
      this.Regresar();
    }
    this.curar();
  }

  static config() {
    let CurarCheck = document.getElementById("CurarCheck");
    let inputVida = document.getElementById("inputVida");
    if (localStorage.CurarCheck == undefined) {
      localStorage.CurarCheck = CurarCheck.checked;
    } else {
      CurarCheck.checked = JSON.parse(localStorage.CurarCheck);
    }
    CurarCheck.addEventListener("change", () => {
      localStorage.CurarCheck = CurarCheck.checked;
      location.reload();
    });

    if (localStorage.inputVida == undefined) {
      localStorage.inputVida = inputVida.value;
    } else {
      inputVida.value = JSON.parse(localStorage.inputVida);
    }
    inputVida.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        localStorage.inputVida = inputVida.value;
        location.reload();
      }
    });
  }
  static run() {
    Menu.addConfig(`
    <h3>Auto curar</h3>
        <ul><label><input id="CurarCheck" type="checkbox"> Curar automaticamente<label></ul>
        <ul>
            <input id="inputVida" placeholder="Ingresa % de salud: 50" value=50></input>
        </ul>
    `);
    this.config();
    let CurarCheck = document.getElementById("CurarCheck");
    if (CurarCheck.checked == true) {
      this.IrInventario();
    }

    //this.IrInventario();
  }
}
