import { insertOnPage } from "../utils/insertOnPage.js";
import { Menu } from "../Menu/Menu.js";
import { sh, getURL } from "../main.js";
import { recursos } from "./recursos.js";

export class Paquetes {
  static filtros() {
    let inputQry = document.getElementsByName("qry");
    inputQry[0].setAttribute("list", "customSearch");
    inputQry[0].insertAdjacentHTML(
      "afterend",
      `<datalist id="customSearch"></datalist>`
    );
  }
  static Markethortcut() {
    let mainnav =
      document.getElementById("mainnav").children[0].children[0].children[0]
        .children[0];
    insertOnPage.beforeend(
      mainnav,
      `<td><a href="index.php?mod=guildMarket&${sh.get()}" class="awesome-tabs">Mercado de la alianza<div class="navBG"></div></a></td>`
    );
  }

  static UI() {
    Paquetes.Markethortcut();
    let inventoryBox = document.getElementsByClassName("inventoryBox")[0];
    insertOnPage.afterbegin(
      inventoryBox,
      `
        <div>
            <div class="panelBusqueda"></div>
            <button id="buscarRotativos" class="awesome-button buscarRotativos">🔎 Buscar Items</button>
            <input class="SelectCategorias" type="search" id="categoria" list="listaCategorias" value="Mercado">
            <datalist id="listaCategorias">
                 <option>Banco de trabajo</option>
                 <option>Casa de subastas</option>
                 <option>Ermitaño</option>
                 <option>Expedición</option>
                 <option>Fundición</option>
                 <option>Jefe de la Mazmorra</option>
                 <option>Mazmorra</option>
                 <option>Mercado</option>
                 <option>Panteón</option>
                 <option>Recompensa de la misión</option>
            </datalist>
            <div id="MercadoFavoritos" class="Favoritos" style="display: none"><h2 id="mensaje"></h2></div>
        </div>`
    );
    let buscarRotativos = document.getElementById("buscarRotativos");
    let categoria = document.getElementById("categoria");

    buscarRotativos.addEventListener("click", () => {
      Paquetes.PonerEnFavoritos(categoria.value);
    });
    buscarRotativos.addEventListener("touchstart", () => {
      Paquetes.PonerEnFavoritos(categoria.value);
    });
    if (localStorage.paquetesCategoria == undefined) {
      localStorage.paquetesCategoria = "Mercado";
    } else {
      categoria.value = localStorage.paquetesCategoria;
    }
    categoria.addEventListener("change", () => {
      localStorage.paquetesCategoria = categoria.value;
    });
  }

  static PonerEnFavoritos(textContent) {
    let MercadoFavoritos = document.getElementById("MercadoFavoritos");
    let rotativos = Paquetes.EncontrarRotativos(textContent);
    MercadoFavoritos.style.display = "block";
    MercadoFavoritos.innerHTML = `<h2 id="mensaje"></h2>`;

    let mensaje = document.getElementById("mensaje");
    if (rotativos.length > 0) {
      mensaje.innerText = "Objetos Encontrados!";
      for (let item of rotativos) {
        MercadoFavoritos.append(item);
      }
    } else {
      mensaje.innerHTML = `
        <div title="Se recomienda utilizar la extención gladiatus crazy addon\ny colocar el 'Número de paginas a cargar' desde 10 en adelante" style="text-align: center;">
             No se encontraron objetos, intenta nuevamente.
        </div>
        <br/>`;
    }
  }

  static EncontrarRotativos(textContent) {
    let rotativos = [];
    let packages = document.getElementById("packages");
    //packages.children[1].children[2].children[0].attributes[6].textContent.includes("Oro")
    for (let item of packages.children) {
      if (
        !!item.children[1] == true &&
        item.children[1].textContent == textContent
      ) {
        let atributes = item.children[2].children[0].attributes;
        for (let atribute of atributes) {
          if (atribute.name == "data-tooltip") {
            if (atribute.textContent.includes('Oro","white"') == false) {
              rotativos.push(item);
            }
          }
        }
      }
    }
    return rotativos;
  }
  static MoverFiltros() {
    let filtros = document.getElementsByClassName("package-advance-filters")[0];
    filtros.setAttribute("style", "width: 500px;margin-left: auto;");
    let article = document.getElementsByTagName("article")[0];
    let sectionHeaders = document.getElementsByClassName("section-header");
    for (let section of sectionHeaders) {
      if (section.innerHTML.includes("Paquetes") == true) {
        article.insertBefore(filtros, section);
      }
    }
  }

  static ExtendsInput() {
    let qry = document.getElementsByName("qry")[0];
    qry.setAttribute("list", "Busqueda");
    qry.type = "search";
    insertOnPage.afterend(qry, `<datalist id="Busqueda"></datalist>`);

    Menu.addConfig(`
        <h2>Paquetes</h2>
        <ul id="ListaNombres" style="display: flex;background-color: white;width: 324px;height: auto;margin-left: 43px;padding: 6px;flex-direction: row;flex-wrap: wrap;">
           <input type="text" title="Presiona ENTER para guardar." id="InputNombres" placeholder="Nombre de los items a guardar" style="background-color: #bebebe;color: white;font-weight: bold;font-size: 12px;width: 79px;height: 23px;">
        </ul>

        `);

    let InputNombres = document.getElementById("InputNombres");
    let NombresGuardados = [];
    if (localStorage.NombresGuardados == undefined) {
      localStorage.NombresGuardados = "[]";
    } else {
      NombresGuardados = JSON.parse(localStorage.NombresGuardados);
    }

    InputNombres.addEventListener("keypress", (input) => {
      if (input.key === "Enter") {
        if (
          !NombresGuardados.includes(InputNombres.value) &&
          InputNombres.value != ""
        ) {
          NombresGuardados.push(InputNombres.value);
          InputNombres.value = "";
          localStorage.NombresGuardados = JSON.stringify(
            NombresGuardados.sort()
          );
          window.location.reload();
        }
      }
    });
    Paquetes.MostrarNombresSeleccionados();
    Paquetes.addOptionsToDatalist();
    Paquetes.Eliminar();
  }
  static MostrarNombresSeleccionados() {
    let NombresGuardados = JSON.parse(localStorage.NombresGuardados);
    let indiceDeRotativoBorrar;
    let ListaNombres = document.getElementById("ListaNombres");
    let contador = 0;
    for (let nombre of NombresGuardados) {
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
  static Eliminar() {
    let NombresGuardados = JSON.parse(localStorage.NombresGuardados);
    let NombreBorrar = document.getElementsByName("NombreBorrar");
    for (let boton of NombreBorrar) {
      boton.addEventListener("click", () => {
        NombresGuardados.splice(boton.attributes[1].value, 1);
        localStorage.NombresGuardados = JSON.stringify(NombresGuardados.sort());
        window.location.reload();
      });
      boton.addEventListener("touchstart", () => {
        NombresGuardados.splice(boton.attributes[1].value, 1);
        localStorage.NombresGuardados = JSON.stringify(NombresGuardados.sort());
        window.location.reload();
      });
    }
  }
  static addOptionsToDatalist() {
    let NombresGuardados = JSON.parse(localStorage.NombresGuardados);
    let Busqueda = document.getElementById("Busqueda");
    for (let nombre of NombresGuardados) {
      insertOnPage.beforeend(Busqueda, `<option>` + nombre + `</option>`);
    }
  }
  static AbrirdesdeMercado() {
    if (!!getURL[2] == true && getURL[2] == "searchItems") {
      document.getElementById("buscarRotativos").click();
    }
  }
  static SearchResources() {
    const pf = document.getElementById("pf").children[0].children[0];
    insertOnPage.afterend(
      pf,
      `
      <div id="titleSearchResources" style="cursor: pointer;">Buscar por recursos</div>
      <div id="SearchResources" style="display: none;"></div>
    `
    );
    const titleSearchResources = document.getElementById(
      "titleSearchResources"
    );
    const searchResources = document.getElementById("SearchResources");

    titleSearchResources.addEventListener("click", () => {
      if (searchResources.style.display == "block") {
        searchResources.style.display = "none";
      } else {
        searchResources.style.display = "block";
      }
    });

    for (const categoria in recursos) {
      insertOnPage.beforeend(
        searchResources,
        `<label style="cursor: pointer;">
          <h2 id="${categoria + "h2"}"> ${categoria} </h2>
          <div id="${categoria}" class="paquetesCategoria" style="display: none;"></div>
        </label><hr style="margin: 1px;">`
      );
      const categoriaH2 = document.getElementById(categoria + "h2");
      const categoriaSearch = document.getElementById(categoria);
      categoriaH2.addEventListener("click", () => {
        if (categoriaSearch.style.display == "block") {
          categoriaSearch.style.display = "none";
        } else {
          categoriaSearch.style.display = "block";
        }
      });
      for (const recurso in recursos[categoria]) {
        insertOnPage.beforeend(
          categoriaSearch,
          `<label style="cursor: copy;">
          <h2 id="${recurso + "h2"}"> ${recurso} </h2>
          <div id="${recurso}" class="paquetesRecurso" style="display: none;"></div>
        </label>`
        );
        const recursoH2 = document.getElementById(recurso + "h2");
        const recursoSearch = document.getElementById(recurso);
        recursoH2.addEventListener("click", () => {
          for (let name of document.getElementsByClassName("paquetesRecurso")) {
            name.style.display = "none";
          }
          if (recursoSearch.style.display == "block") {
            recursoSearch.style.display = "none";
          } else {
            recursoSearch.style.display = "block";
          }
          pf.parentElement.children[3].children[1].value = recurso;
        });
        for (
          let index = 0;
          index < recursos[categoria][recurso].length;
          index++
        ) {
          const item = recursos[categoria][recurso][index];
          insertOnPage.beforeend(
            recursoSearch,
            `<div id="${item}" class="paquetesItems">${item}</div>`
          );
          const itemSearch = document.getElementById(item);
          itemSearch.addEventListener("click", () => {
            pf.parentElement.children[3].children[1].value =
              itemSearch.textContent.split(" - ")[0];
          });
        }
      }
    }
  }
}
