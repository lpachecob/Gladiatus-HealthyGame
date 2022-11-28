import { insertOnPage } from "../utils/insertOnPage.js";
import { Formatter } from "../utils/Formatter.js";
import { Menu } from "../Menu/Menu.js";
import { oro } from "../main.js";

export class Notificaciones {
  static Rotativos() {
    Menu.addConfig(`
        <h2>Notificaciones</h2>
        <ul>
            <label><input type="checkbox" id="NotificarOro" style=""> Notifica si tengo oro para guardar</label>
        </ul>
        <ul id="MontosNotificar" style="display: flex;background-color: white;width: 324px;height: auto;margin-left: 43px;padding: 6px;flex-direction: row;flex-wrap: wrap;">
           <input type="number" title="Presiona ENTER para guardar." id="InputNotificarOro" placeholder="Oro" style="background-color: #bebebe;color: white;font-weight: bold;font-size: 12px;width: 79px;height: 23px;">
        </ul>

        `);

    let MontosNotificar = document.getElementById("MontosNotificar");
    let InputNotificarOro = document.getElementById("InputNotificarOro");
    let MontosGuardados = [];

    if (localStorage.MontosGuardados == undefined) {
      localStorage.MontosGuardados = '["100000"]';
    } else {
      MontosGuardados = JSON.parse(localStorage.MontosGuardados);
    }

    InputNotificarOro.addEventListener("keypress", (input) => {
      if (input.key === "Enter") {
        if (!MontosGuardados.includes(InputNotificarOro.value) &&
          InputNotificarOro.value != "") {
          MontosGuardados.push(InputNotificarOro.value);
          InputNotificarOro.value = "";
          localStorage.MontosGuardados = JSON.stringify(
            MontosGuardados.sort(function (a, b) {
              return a - b;
            })
          );
          window.location.reload();
        }
      }
    });

    let NotificarOro = document.getElementById("NotificarOro"); //.checked indica si está activo o no
    if (localStorage.NotificarOro == undefined) {
      localStorage.NotificarOro = NotificarOro.checked;
    } else {
      NotificarOro.checked = JSON.parse(localStorage.NotificarOro);
    }
    NotificarOro.addEventListener("change", () => {
      localStorage.NotificarOro = NotificarOro.checked;
      location.reload();
    });

    if (JSON.parse(localStorage.NotificarOro) == true) {
      Notificaciones.Mensaje();
      Notificaciones.MostrarRotativosSeleccionados();
      Notificaciones.EliminarRotativo();
    }
  }
  static Mensaje() {
    let MontosGuardados = JSON.parse(localStorage.MontosGuardados);
    let mensaje = "";

    for (let monto of MontosGuardados) {
      if (Math.floor(oro / monto) >= 2) {
        mensaje +=
          `Empaqueta ` +
          Math.floor(oro / monto) +
          ` rotativos de ` +
          Formatter.abbreviateNumber(monto) +
          `\n`;
      } else if (Math.floor(oro / monto) == 1) {
        mensaje +=
          `Empaqueta ` +
          Math.floor(oro / monto) +
          ` rotativo de ` +
          Formatter.abbreviateNumber(monto) +
          `\n`;
      }
    }

    if (mensaje != "") {
      document.getElementById("mmonetbar").insertAdjacentHTML(
        "beforeend",
        `
                <a href="game/index.php?mod=guildMarket" style="display: contents;">
                    <div id="testnoti" class="notification-box notification-info" style="position: fixed;right: 0px;"><div class="icon"></div>` +
        mensaje +
        `</div>
                </a>`
      );
    }
  }
  static MostrarRotativosSeleccionados() {
    let MontosGuardados = JSON.parse(localStorage.MontosGuardados);
    let indiceDeRotativoBorrar;
    let MontosNotificar = document.getElementById("MontosNotificar");
    let contador = 0;
    for (let monto of MontosGuardados) {
      insertOnPage.beforeend(
        MontosNotificar,
        `
               <div style="border-style: groove;color: black;width: fit-content;padding: 2px;font-size: 12px;">
                   ` +
        Formatter.abbreviateNumber(monto) +
        `
                   <button name="NotificaRotativoBorrar" data-index="` +
        contador +
        `" style="color: red;font-weight: bold;font-size: 16px;border: none;background: none;">x</button>
               </div>
           `
      );
      contador++;
    }
  }
  static EliminarRotativo() {
    let MontosGuardados = JSON.parse(localStorage.MontosGuardados);
    let NotificaRotativoBorrar = document.getElementsByName(
      "NotificaRotativoBorrar"
    );
    for (let boton of NotificaRotativoBorrar) {
      boton.addEventListener("click", () => {
        MontosGuardados.splice(boton.attributes[1].value, 1);
        localStorage.MontosGuardados = JSON.stringify(
          MontosGuardados.sort(function (a, b) {
            return a - b;
          })
        );
        window.location.reload();
      });
      boton.addEventListener("touchstart", () => {
        MontosGuardados.splice(boton.attributes[1].value, 1);
        localStorage.MontosGuardados = JSON.stringify(
          MontosGuardados.sort(function (a, b) {
            return a - b;
          })
        );
        window.location.reload();
      });
    }
  }
}
