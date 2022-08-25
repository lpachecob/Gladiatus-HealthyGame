import { insertOnPage } from "../utils/insertOnPage.js";
import { Formatter } from "../utils/Formatter.js";
import { Menu } from "../Menu/Menu.js";
import { getURL, sh } from "../main.js";

export class Mercado {
  static Config() {
    Menu.addConfig(`
            <h2>Mercado de la Alianza</h2>
            <ul id="MercadoAlianza" style="display: flex;background-color: white;width: 324px;height: auto;margin-left: 43px;padding: 6px;flex-direction: row;flex-wrap: wrap;">
                <input type="number" title="Presiona ENTER para guardar." id="InputMercadoAlianza" placeholder="Oro" style="background-color: #bebebe;color: white;font-weight: bold;font-size: 12px;width: 79px;height: 23px;">
            </ul>
        `);
    let MercadoAlianza = document.getElementById("MercadoAlianza");
    let InputMercadoAlianza = document.getElementById("InputMercadoAlianza");
    let MontosMercado = [];

    if (localStorage.MontosMercado == undefined) {
      localStorage.MontosMercado = '["100000"]';
    } else {
      MontosMercado = JSON.parse(localStorage.MontosMercado);
    }

    InputMercadoAlianza.addEventListener("keypress", (input) => {
      if (input.key === "Enter") {
        if (
          !MontosMercado.includes(InputMercadoAlianza.value) &&
          InputMercadoAlianza.value != ""
        ) {
          MontosMercado.push(InputMercadoAlianza.value);
          InputMercadoAlianza.value = "";
          localStorage.MontosMercado = JSON.stringify(
            MontosMercado.sort(function (a, b) {
              return a - b;
            })
          );
          window.location.reload();
        }
      }
    });
  }
  static MostrarRotativosSeleccionados() {
    let MontosMercado = JSON.parse(localStorage.MontosMercado);
    let indiceDeRotativoBorrar;
    let MercadoAlianza = document.getElementById("MercadoAlianza");
    let contador = 0;
    for (let monto of MontosMercado) {
      insertOnPage.beforeend(
        MercadoAlianza,
        `
               <div style="border-style: groove;color: black;width: fit-content;padding: 2px;font-size: 12px;">
                   ` +
          Formatter.abbreviateNumber(monto) +
          `
                   <button name="MercadoRotativoBorrar" data-index="` +
          contador +
          `" style="color: red;font-weight: bold;font-size: 16px;border: none;background: none;">x</button>
               </div>
           `
      );
      contador++;
    }
  }
  static EliminarRotativo() {
    let MontosMercado = JSON.parse(localStorage.MontosMercado);
    let NotificaRotativoBorrar = document.getElementsByName(
      "MercadoRotativoBorrar"
    );
    for (let boton of NotificaRotativoBorrar) {
      boton.addEventListener("click", () => {
        MontosMercado.splice(boton.attributes[1].value, 1);
        localStorage.MontosMercado = JSON.stringify(
          MontosMercado.sort(function (a, b) {
            return a - b;
          })
        );
        window.location.reload();
      });
      boton.addEventListener("touchstart", () => {
        MontosMercado.splice(boton.attributes[1].value, 1);
        localStorage.MontosMercado = JSON.stringify(
          MontosMercado.sort(function (a, b) {
            return a - b;
          })
        );
        window.location.reload();
      });
    }
  }
  static VentaRapida() {
    let market_sell_box = document.getElementById("market_sell_box");
    let inputPrecio = document.getElementById("preis");
    let inputDuracion = document.getElementById("dauer");
    let botonVender = document.getElementsByName("anbieten")[0];
    let marketInventory = document.getElementById("market_inventory");
    let oro = parseFloat(document.getElementById("sstat_gold_val").textContent);
    let cajaVenta = document.getElementsByClassName("ui-droppable")[0];
    let contentItem = document.getElementsByClassName("contentItem")[0];

    insertOnPage.afterbegin(
      contentItem,
      `
            <h2 id="VentaRapidaMenuTitle" class="section-header" style="cursor: pointer;">Venta Rapida</h2>
	        <section id="VentaRapidaMenu" style="display: block;"> <p>Coloca un item y elige el precio para vender.</p> </section>
        `
    );
    insertOnPage.afterbegin(
      market_sell_box,
      `
            <h2 class="section-header" style="cursor: pointer; margin-top: 5px;">Comprar</h2>
	        <section id="CompraRapidaMenu" style="display: block; margin-bottom: -8px;">
                <label data-tooltip="[[[&quot;Comprar rápida&quot;,&quot;#BA9700&quot;],
                [&quot;Presiona aqui para comprar un&quot;,&quot;#DDDDDD&quot;],
                [&quot;objeto vendido en el mercado.&quot;,&quot;#DDDDDD&quot;],
                [&quot;Información: Los objetos que se comprarán &quot;,&quot;#808080&quot;],
                [&quot;son aquellos guardados en la configuración &quot;,&quot;#808080&quot;],
                [&quot;de los botones de venta rápida.&quot;,&quot;#808080&quot;]]]" style="cursor: pointer;">
                    <button id="CompraTodo" class="awesome-button">Comprar</button>
                </label>
                <select id="TipoCompra" style="margin: 8px; font-size: 14px;">
                    <option>Mayor a menor ⬇</option>
                    <option>Menor a mayor ⬆</option>
                </select>
            </section>
        `
    );
    let MontosMercado = JSON.parse(localStorage.MontosMercado);
    let ventaRapidaMenu = document.getElementById("VentaRapidaMenu");

    for (let monto of MontosMercado) {
      insertOnPage.beforeend(
        ventaRapidaMenu,
        `
             <button name="BotonVender" data-input="` +
          monto +
          `" class="awesome-button" style="margin:5px;"
        data-tooltip="[[[&quot;Costo de venta&quot;,&quot;#BA9700&quot;],[&quot;Costo de venta: ` +
          Formatter.abbreviateNumber(monto * 0.04) +
          `💰.&quot;,&quot;#DDDDDD&quot;]]]" >` +
          Formatter.abbreviateNumber(monto) +
          `</button>
            `
      );
    }
    insertOnPage.beforeend(
      ventaRapidaMenu,
      `
            <section id="" style="display: block; margin: 11px">
                <small>Elegir duración</small>
                <select id="SelectHora" size="1">
				    <option value="1">2 h</option>
				    <option value="2">8 h</option>
				    <option value="3">24 h</option>
		        </select>
	        </section>`
    );
    let selectHora = document.getElementById("SelectHora");
    if (localStorage.SelectHora == undefined) {
      localStorage.SelectHora = 1;
      selectHora.value = 1;
    } else {
      selectHora.value = localStorage.SelectHora;
    }
    selectHora.addEventListener("change", (event) => {
      localStorage.SelectHora = selectHora.value;
    });
    let ventaRapidaMenuTitle = document.getElementById("VentaRapidaMenuTitle");
    ventaRapidaMenuTitle.addEventListener("click", () => {
      if (ventaRapidaMenu.style.display == "none") {
        ventaRapidaMenu.style.display = "block";
      } else {
        ventaRapidaMenu.style.display = "none";
      }
    });
    ventaRapidaMenuTitle.addEventListener("touchstart", () => {
      if (ventaRapidaMenu.style.display == "none") {
        ventaRapidaMenu.style.display = "block";
      } else {
        ventaRapidaMenu.style.display = "none";
      }
    });

    let BotononesVender = document.getElementsByName("BotonVender");

    for (let boton of BotononesVender) {
      boton.addEventListener("click", () => {
        inputPrecio.value = boton.attributes[1].value;
        inputDuracion.value = localStorage.SelectHora;
        botonVender.click();
      });
      boton.addEventListener("touchstart", () => {
        inputPrecio.value = boton.attributes[1].value;
        inputDuracion.value = localStorage.SelectHora;
        botonVender.click();
      });
    }
  }
  static Comprar() {
    let CompraTodo = document.getElementById("CompraTodo");
    let TipoCompra = document.getElementById("TipoCompra");
    let MontosMercado = JSON.parse(localStorage.MontosMercado);

    if (localStorage.TipoCompra == undefined) {
      localStorage.TipoCompra = 0;
    } else {
      TipoCompra.selectedIndex = localStorage.TipoCompra;
    }
    TipoCompra.addEventListener("change", (event) => {
      localStorage.TipoCompra = TipoCompra.selectedIndex;
    });
    let market_item_table = Array.from(
      document.getElementById("market_item_table").children[0].children
    ).filter(
      (item) =>
        item.tagName == "TR" &&
        !!item.children[0].style["background-image"] &&
        item.children[1].children[0].children[0].children[0].style.color ==
          "green"
    );
    let marketItems = [];
    for (let item of market_item_table) {
      if (
        MontosMercado.includes(item.children[2].innerText.replace(/\./g, ""))
      ) {
        marketItems.push(item);
      }
    }
    CompraTodo.addEventListener("click", () => {
      switch (TipoCompra.selectedIndex) {
        case 0:
          Mercado.Mayor_Menor(marketItems);
          break;
        case 1:
          Mercado.Menor_Mayor(marketItems);
          break;
        default:
          console.error("No se pudo procesar la compra");
          break;
      }
    });
  }
  static Mayor_Menor(marketItems) {
    let oro = parseInt(
      document.getElementById("sstat_gold_val").textContent.replace(/\./g, "")
    );
    let orden = marketItems;
    orden.sort(function (a, b) {
      if (
        parseInt(a.children[2].innerText.replace(/\./g, "")) <
        parseInt(b.children[2].innerText.replace(/\./g, ""))
      ) {
        return 1;
      }
      if (
        parseInt(a.children[2].innerText.replace(/\./g, "")) >
        parseInt(b.children[2].innerText.replace(/\./g, ""))
      ) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    for (let item of orden) {
      let valor = parseInt(item.children[2].innerText.replace(/\./g, ""));
      if (valor < oro) {
        item.children[5].children[0].click();
        break;
      }
    }
  }
  static Menor_Mayor(marketItems) {
    let oro = parseInt(
      document.getElementById("sstat_gold_val").textContent.replace(/\./g, "")
    );
    let orden = marketItems;
    orden.sort(function (a, b) {
      if (
        parseInt(a.children[2].innerText.replace(/\./g, "")) >
        parseInt(b.children[2].innerText.replace(/\./g, ""))
      ) {
        return 1;
      }
      if (
        parseInt(a.children[2].innerText.replace(/\./g, "")) <
        parseInt(b.children[2].innerText.replace(/\./g, ""))
      ) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
    for (let item of orden) {
      let valor = parseInt(item.children[2].innerText.replace(/\./g, ""));
      if (valor < oro) {
        item.children[5].children[0].click();
      }
    }
  }
  static PackageShortcut() {
    let mainnav =
      document.getElementById("mainnav").children[0].children[0].children[0]
        .children[0];
    if (
      getURL[getURL.length - 1].slice(0, 11).includes("precioventa") == true
    ) {
      insertOnPage.beforeend(
        mainnav,
        `<td><a id="irapaquetes" href="index.php?mod=packages&${sh.get()}&searchItems&${
          getURL[getURL.length - 1]
        }" class="awesome-tabs">Paquetes<div class="navBG"></div></a></td>`
      );
    } else {
      insertOnPage.beforeend(
        mainnav,
        `<td><a href="index.php?mod=packages&${sh.get()}&searchItems" class="awesome-tabs">Paquetes<div class="navBG"></div></a></td>`
      );
    }
  }
  static ValorDeRotativosEnVenta() {
    let market_item_table = Array.from(
      document.getElementById("market_item_table").children[0].children
    ).filter(
      (item) =>
        item.tagName == "TR" &&
        !!item.children[0].style["background-image"] &&
        item.children[1].children[0].children[0].children[0].style.color ==
          "green"
    );
    let market_item_tableSelled = Array.from(
      document.getElementById("market_item_table").children[0].children
    ).filter(
      (item) =>
        item.tagName == "TR" &&
        !!item.children[0].style["background-image"] &&
        item.children[1].children[0].children[0].children[0].style.color ==
          "blue"
    );
    let TotalDePaquetesSinComprar = 0;
    for (let item of market_item_table) {
      TotalDePaquetesSinComprar =
        TotalDePaquetesSinComprar +
        parseInt(item.children[2].innerText.replace(/\./g, ""));
    }
    let TotalDePaquetesVendidos = 0;
    for (let item of market_item_tableSelled) {
      TotalDePaquetesVendidos =
        TotalDePaquetesVendidos +
        parseInt(item.children[2].innerText.replace(/\./g, ""));
    }
    let standalone = document.getElementsByClassName("standalone")[0];
    insertOnPage.beforeend(
      standalone,
      `<div id="MontodeRotativos">Oro total por comprar: ${Formatter.abbreviateNumber(
        TotalDePaquetesSinComprar
      )}<img alt="" src="9407/img/res2.gif" title="Oro" align="absmiddle" border="0"></div>`
    );
    insertOnPage.beforeend(
      standalone,
      `<div id="MontodeRotativos">Oro total Vendido: ${Formatter.abbreviateNumber(
        TotalDePaquetesVendidos
      )}<img alt="" src="9407/img/res2.gif" title="Oro" align="absmiddle" border="0"></div>`
    );
  }
  static ColorearMercado() {
    let itemsParaComprar = Array.from(
      document.getElementById("market_item_table").children[0].children
    ).filter(
      (item) =>
        item.tagName == "TR" &&
        !!item.children[0].style["background-image"] &&
        item.children[1].children[0].children[0].children[0].style.color ==
          "green"
    );
    for (let item of itemsParaComprar) {
      item.style["background-color"] = "#0b800057";
    }
  }

  static ObtenerItemsComprados() {
    let init = {
      ponerContenedor() {
        let inventoryBox = document.getElementsByClassName("inventoryBox")[0];
        insertOnPage.beforebegin(
          inventoryBox,
          `<div id="paquetesMercado"></div>`
        );
      },
      ponerBotonBusqueda() {
        let paquetesMercado = document.getElementById("paquetesMercado");
        insertOnPage.afterbegin(
          paquetesMercado,
          `<button id="obtenerPaquetes" class="awesome-button" style="display: block;position: relative;left: 175px;margin-top: 9px;">Obtener Paquetes</button>`
        );
      },
      eventos() {
        let obtenerPaquetes = document.getElementById("obtenerPaquetes");
        obtenerPaquetes.addEventListener("click", init.buscar);
      },
      ranuras() {
        this.slots = [];
        for (let i = 0; i < 6; i++) {
          let wrapper = document.createElement("div");
          wrapper.className = "magus_itembox";
          wrapper.style.display = "none";
          wrapper.style.position = "relative";
          wrapper.style.margin = "0 auto";
          this.wrapper.appendChild(wrapper);
          this.slots.push({
            triggered: false,
            active: false,
            slot: i,
            item: null,
            wrapper: wrapper,
          });
        }
      },
      buscar() {},
    };
    init.ponerContenedor();
    init.ponerBotonBusqueda();
    init.eventos();
  }
  static AddVariableToForm() {
    let market_item_table_TR = Array.from(
      document.getElementById("market_item_table").children[0].children
    ).filter(
      (item) =>
        item.tagName == "TR" &&
        !!item.children[0].style["background-image"] &&
        item.children[1].children[0].children[0].children[0].style.color ==
          "green"
    );
    let market_item_table_FORMS = Array.from(
      document.getElementById("market_item_table").children[0].children
    ).filter((item) => item.tagName == "FORM");
    for (let [indice, objeto] of market_item_table_TR.entries()) {
      let precio = objeto.children[2].innerText
        .replace(".", "")
        .replace(".", "");
      market_item_table_FORMS[indice].action =
        market_item_table_FORMS[indice].action + `&precioventa=${precio}`;
    }
  }
  static AutoCompra() {
    let market_item_table_TR = Array.from(
      document.getElementById("market_item_table").children[0].children
    ).filter(
      (item) =>
        item.tagName == "TR" &&
        !!item.children[0].style["background-image"] &&
        item.children[1].children[0].children[0].children[0].style.color ==
          "green"
    );

    if (market_item_table_TR.length > 0) {
      //ejecutar compra
    }
  }
  static Run() {
    Mercado.Config();
    Mercado.MostrarRotativosSeleccionados();
    Mercado.EliminarRotativo();
    Mercado.VentaRapida();
    Mercado.Comprar();
    Mercado.PackageShortcut();
    Mercado.ValorDeRotativosEnVenta();
    Mercado.ColorearMercado();
    Mercado.AddVariableToForm();
    //Mercado.ObtenerItemsComprados();
  }
}
