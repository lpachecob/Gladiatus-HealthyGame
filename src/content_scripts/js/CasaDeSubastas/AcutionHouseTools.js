import { Menu } from "../Menu/Menu.js";
import { insertOnPage } from "../utils/insertOnPage.js";

export function AcutionHouseTools() {
  let item = document.getElementsByTagName("TD");
  let oro = parseInt(
    document.getElementById("sstat_gold_val").textContent.replace(/\./g, "")
  );

  let menu = document.getElementsByClassName("section-header")[1];
  menu.insertAdjacentHTML(
    "beforebegin",
    `
  <h2
	   id = "MenuCompraTitle"
	   class = "section-header"
	   style = "cursor: pointer;">
	   Compra Rápida
  </h2>
  <section
	   id = "MenuCompra"
	   style = "display: block;">
  </section>`
  );

  let SectionMenuCompra = document.getElementById("MenuCompra");
  /*
    SectionMenuCompra.insertAdjacentHTML('beforeend', `
    <p>Indica un precio máximo para comprar o compra todo lo que te alcance.</p>
    <p><small>No se sobrepujará a los compañeros de alianza.</small></p>
    `);
    */
  SectionMenuCompra.insertAdjacentHTML(
    "beforeend",
    `
  <p>Se comprará todo lo que alcance con el oro que tienes.</p>
  <p><small>No se sobrepujará a los compañeros de alianza.</small></p>
  `
  );

  SectionMenuCompra.insertAdjacentHTML(
    "beforeend",
    `
  <input
	   type = "number"
	   id = "OroMaximo"
	   placeholder = "Oro máximo a gastar"
	   style = "width:150px" hidden>`
  );

  SectionMenuCompra.insertAdjacentHTML(
    "beforeend",
    `
    <button
	    id = "BotonComprar"
	    class = "awesome-button"
	    style = "margin:5px;"
      data-tooltip="[[[&quot;Comprar Todo&quot;,&quot;#BA9700&quot;],
      [&quot;Se compraran toda la comida hasta que &quot;,&quot;white&quot;],
      [&quot;o ya no haya más comida o te quedes sin oro.&quot;,&quot;white&quot;],
      [&quot;Información: En la configuración puedes añadir &quot;,&quot;#808080&quot;],
      [&quot;los nombres de los objetos que no deseas comprar&quot;,&quot;#808080&quot;]
      ]]">
	    Comprar todo
    </button>`
  );

  Menu.addConfig(`
  <section id="auction">
    <h3>Casa de Subastas</h3>
    <ul id="CasaDeSubasta" style="display: flex;background-color: white;width: 324px;height: auto;margin-left: 43px;padding: 6px;flex-direction: row;flex-wrap: wrap;">
      <input type="text" id="InputCasaDeSubasta" placeholder="Items Excluidos" style="background-color: #bebebe;color: white;font-weight: bold;font-size: 12px;width: 110px;height: 23px;">
    </ul>
  </section>
  `);

  let InputCasaDeSubasta = document.getElementById("InputCasaDeSubasta");
  let subastaNombres = [];
  if (localStorage.subastaNombres == undefined) {
    localStorage.subastaNombres = "[]";
  } else {
    subastaNombres = JSON.parse(localStorage.subastaNombres);
  }

  InputCasaDeSubasta.addEventListener("keypress", (input) => {
    if (input.key === "Enter") {
      if (
        !subastaNombres.includes(InputCasaDeSubasta.value) &&
        InputCasaDeSubasta.value != ""
      ) {
        subastaNombres.push(InputCasaDeSubasta.value);
        InputCasaDeSubasta.value = "";
        localStorage.subastaNombres = JSON.stringify(subastaNombres.sort());
        window.location.reload();
      }
    }
  });

  let oroMaximo = document.getElementById("OroMaximo");
  let botonComprar = document.getElementById("BotonComprar");

  botonComprar.addEventListener("click", () => {
    //document.getElementsByClassName("auction_bid_div")[0].children[3]

    let auction_bid_div = Array.from(
      document.getElementsByClassName("auction_bid_div")
    ).filter((item) => item.children[0].children[0].tagName == "BR");

    for (const [index, item] of auction_bid_div.entries()) {
      let subastaNombres = JSON.decode(localStorage.subastaNombres);
      for (let nombres of subastaNombres) {
        if (
          item.parentElement
            .getElementsByClassName("auction_item_div")[0]
            .children[1].children[0].attributes[
              "data-tooltip"
            ].textContent.includes(nombres)
        ) {
          auction_bid_div.splice(index, 1);
        }
      }
    }

    console.log(auction_bid_div);

    for (const item of auction_bid_div) {
      item.children[3].click();
    }
  });

  let menuCompraTitle = document.getElementById("MenuCompraTitle");
  menuCompraTitle.addEventListener("click", () => {
    if (SectionMenuCompra.style.display == "none") {
      SectionMenuCompra.style.display = "block";
    } else {
      SectionMenuCompra.style.display = "none";
    }
  });

  MostrarNombresSeleccionados();
  Eliminar();
}

function MostrarNombresSeleccionados() {
  let subastaNombres = JSON.parse(localStorage.subastaNombres);
  let ListaNombres = document.getElementById("CasaDeSubasta");
  let contador = 0;
  for (let nombre of subastaNombres) {
    insertOnPage.beforeend(
      ListaNombres,
      `
             <div style="border-style: groove;color: black;width: fit-content;padding: 2px;font-size: 12px;">
                 ` +
        nombre +
        `
                 <button name="NombreBorrar" data-index="` +
        contador +
        `" style="color: red;font-weight: bold;font-size: 16px;border: none;background: none;">x</button>
             </div>
         `
    );
    contador++;
  }
}
function Eliminar() {
  let subastaNombres = JSON.parse(localStorage.subastaNombres);
  let NombreBorrar = document.getElementsByName("NombreBorrar");
  for (let boton of NombreBorrar) {
    boton.addEventListener("click", () => {
      subastaNombres.splice(boton.attributes[1].value, 1);
      localStorage.subastaNombres = JSON.stringify(subastaNombres.sort());
      window.location.reload();
    });
    boton.addEventListener("touchstart", () => {
      subastaNombres.splice(boton.attributes[1].value, 1);
      localStorage.subastaNombres = JSON.stringify(subastaNombres.sort());
      window.location.reload();
    });
  }
}
