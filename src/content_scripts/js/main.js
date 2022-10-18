import { OuterLinks } from "./utils/OuterLinks.js";
import { Menu } from "./Menu/Menu.js";
import { Notificaciones } from "./Notificaciones/Notificaciones.js";
import { Mercado } from "./Mercado/Mercado.js";
import { AcutionHouseTools } from "./CasaDeSubastas/AcutionHouseTools.js";
import { SmelteryTimeSaverExtension } from "./TimeSaver/SmelteryTimeSaverExtension.js";
import { Herreria } from "./Herreria/Herreria.js";
import { Paquetes } from "./Paquetes/Paquetes.js";
import { TimeSaver } from "./TimeSaver/TimeSaver.js";
import { ExtenderBotones } from "./ExtenderBotones/ExtenderBotones.js";
import { GuardarOro } from "./GuardarOro/GuardarOro.js";
import { insertOnPage } from "./utils/insertOnPage.js";
import { AutoComer } from "./AutoComer/AutoComer.js";

//global variables
export const getURL = window.location.search.split("&");
export const oro = parseInt(
  document.getElementById("sstat_gold_val").innerText.replace(/\./g, "")
);

export var dobleClickEvent = document.createEvent("MouseEvents");
dobleClickEvent.initEvent("dblclick", true, true);

export let sh = {
  get: () => {
    for (let element of getURL) {
      if (element.includes("sh=") == true) {
        return element;
      }
    }
  },
};

/* It's a class that has a static method that runs a bunch of other static methods. */
class Main {
  static SetTool() {
    if (getURL[0] == "?mod=guildMarket" && getURL[1] != "submod=control") {
      Mercado.Run();
    } else if (
      getURL[0] == "?mod=guildMarket" &&
      getURL[1] == "submod=control"
    ) {
      //comming soon
    } else if (getURL[0] == "?mod=auction") {
      AcutionHouseTools();
    } else if (getURL[0] == "?mod=forge" && getURL[1] == "submod=smeltery") {
      SmelteryTimeSaverExtension();
    } else if (getURL[0] == "?mod=forge" && getURL[1] == "submod=forge") {
      Herreria.run();
    } else if (getURL[0] == "?mod=packages") {
      Paquetes.UI();
      Paquetes.MoverFiltros();
      Paquetes.ExtendsInput();
      Paquetes.AbrirdesdeMercado();
    }
  }
  static Run() {
    Menu.Dibujar();
    Main.SetTool();
    Notificaciones.Rotativos();
    GuardarOro.Run();
    ExtenderBotones.Paquetes();
    ExtenderBotones.Reports();
    OuterLinks.run();
    AutoComer.run();
    window.addEventListener("load", () => {
      localStorage.TimeSaverExist = TimeSaver.Exist();
      TimeSaver.setKeyForStop(JSON.parse(localStorage.TimeSaverExist));
      TimeSaver.StopOnKey();
      TimeSaver.StopOnClick();
      TimeSaver.cambiarInterfaz();
      TimeSaver.Touch();
    });
  }
}

/**
 * run script
 */
Main.Run();

let footer_links = document.getElementsByClassName("footer_links")[0];
insertOnPage.beforeend(
  footer_links,
  `
 | <a target="blank" href="https://github.com/lpachecob/Gladiatus-HealthyGame" style="color: #a78e3d;text-decoration: none;">GHG V1.1.0</a>
`
);
