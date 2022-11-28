import { OuterLinks } from './utils/OuterLinks.js';
import { Menu } from './Menu/Menu.js';
import { Notificaciones } from './Notificaciones/Notificaciones.js';
import { Mercado } from './Mercado/Mercado.js';
import { AcutionHouseTools } from './CasaDeSubastas/AcutionHouseTools.js';
import { Smeltery } from './TimeSaver/SmelteryTimeSaverExtension.js';
import { Herreria } from './Herreria/Herreria.js';
import { Paquetes } from './Paquetes/Paquetes.js';
import { ExtenderBotones } from './Atajos/ExtenderBotones.js';
import { GuardarOro } from './GuardarOro/GuardarOro.js';
import { insertOnPage } from './utils/insertOnPage.js';
import { AutoComer } from './AutoComer/AutoComer.js';
import { Bot } from './bot/init.js';
import { Vendedores } from './Atajos/ExtenderVendedores.js';

//global variables
export const getURL = window.location.search.split('&');
export const oro = parseInt(
  document.getElementById('sstat_gold_val').innerText.replace(/\./g, '')
);

export var dobleClickEvent = document.createEvent('MouseEvents');
dobleClickEvent.initEvent('dblclick', true, true);

export let sh = {
  get: () => {
    for (let element of getURL) {
      if (element.includes('sh=') == true) {
        return element;
      }
    }
  },
};

export let queryParams = new Proxy(
  new URLSearchParams(window.location.search),
  {
    get: (searchParams, prop) => searchParams.get(prop),
  }
);
/* It's a class that has a static method that runs a bunch of other static methods. */
export class Main {
  static Run() {
    const tools = {
      guildMarket: () => {
        if (!queryParams.submod) Mercado.Run();
      },
      auction: () => {
        AcutionHouseTools();
      },
      forge: () => {
        if (queryParams.submod == 'smeltery') Smeltery.Run();
        if (queryParams.submod == 'forge') Herreria.run();
      },
      packages: () => {
        Paquetes.UI();
        Paquetes.MoverFiltros();
        Paquetes.ExtendsInput();
        Paquetes.AbrirdesdeMercado();
        Paquetes.SearchResources();
      },
      inventory: () => {
        Vendedores.Run();
      },
    };

    Bot.run();
    Menu.Dibujar();
    Notificaciones.Rotativos();
    GuardarOro.Run();
    ExtenderBotones.Paquetes();
    ExtenderBotones.Reports();
    OuterLinks.run();
    AutoComer.run();
    if (!!tools[queryParams.mod]) {
      tools[queryParams.mod]();
    }
  }
}
