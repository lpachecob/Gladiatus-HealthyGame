import { insertOnPage } from "../utils/insertOnPage.js";
import { Menu } from "../Menu/Menu.js";
import { sh, getURL } from "../main.js";

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
    const qry = document.getElementsByName("qry")[0].parentElement.children[0];
    insertOnPage.afterend(
      qry,
      `
      <div id="titleSearchResources">Buscar por recursos</div>
      <div id="SearchResources" style="display: none;">
        <div id="Materiales">Materiales
          <div id="MaterialesItems" class="paquetesResourcesItems" style="display: none;">
            <div> Hilo de lana
              <div style="display: none;">
                <div>Elrarangs	19</div>
                <div>Lurtscharas	15</div>
                <div>Skiterus	11</div>
                <div>Mermereus	11</div>
                <div>Kerrannas	7</div>
                <div>Umilawens	5</div>
                <div>Grasscrawlers	5</div>
                <div>Doitrems	5</div>
                <div>Elywens	4</div>
                <div>Redos	2</div>
                <div>Rakrests	2</div>
                <div>Zeindras	2</div>
                <div>Cisiens	2</div>
                <div>Asayseths	2</div>
                <div>Mooncruchers	2</div>
                <div>Sugos	2</div>
                <div>Nariths	2</div>
                <div>Bilgs	2</div>
                <div>Ismaels	1</div>
                <div>Rayols	1</div>
                <div>Uróthiens	1</div>
                <div>Asendacs	1</div>
                <div>Tanias	1</div>
                <div>Calódiens	1</div>
              </div>
            </div>
            <div>Bolas de algodón</div>
            <div>Cáñamo</div>
            <div>Tiras de gasa</div>
            <div>Lino</div>
            <div>Yute</div>
            <div>Tiras de terciopelo</div>
            <div>Hilo de seda</div>
          </div>
        </div>
        <div id="Partes">Partes de monstruos
          <div id="PartesItems" class="paquetesResourcesItems" style="display: none;">
            <div>Pelaje</div>
            <div>Astilla ósea</div>
            <div>Escama  Garra</div>
            <div>Colmillo</div>
            <div>Escama de dragón</div>
            <div>Cuerno de toro</div>
            <div>Glándula venenosa</div>
            <div>Pelaje de Cerbero</div>
            <div>Escama de Hidra</div>
            <div>Pluma de Esfinge</div>
            <div>Piel de Tifón</div>
          </div>
        </div>
        <div id="Gemas">Gemas
          <div id="GemasItems" class="paquetesResourcesItems" style="display: none;">
            <div>Lapislázuli</div>
            <div>Amatista</div>
            <div>Ámbar</div>
            <div>Aguamarina</div>
            <div>Zafiro</div>
            <div>Granate</div>
            <div>Esmeralda</div>
            <div>Diamante</div>
            <div>Jaspe</div>
            <div>Sugilita</div>
          </div>
        </div>
        <div id="Frascos">Frascos
          <div id="FrascosItems" class="paquetesResourcesItems" style="display: none;">
            <div>Veneno de escorpión</div>
            <div>Tintura de la resistencia</div>
            <div>Antídoto</div>
            <div>Adrenalina</div>
            <div>Tintura de la inspiración</div>
            <div>Poción de la percepción</div>
            <div>Esencia de los reflejos</div>
            <div>Frasco de carisma</div>
            <div>Agua del olvido</div>
            <div>Esencia de alma</div>
          </div>
        </div>
        <div id="Runas">Runas
          <div id="RunasItems" class="paquetesResourcesItems" style="display: none;">
            <div> Sello acuático</div>
            <div>Runa protectora</div>
            <div>Grabado terrestre</div>
            <div>Tótem curativo</div>
            <div>Talismán de poder</div>
            <div>Piedra de la suerte</div>
            <div>Pedernal</div>
            <div>Runa de la tormenta</div>
            <div>Runa de las sombras</div>
          </div>
        </div>
        <div id="Minerales">Minerales
          <div id="MineralesItems" class="paquetesResourcesItems" style="display: none;">
            <div>Cristal</div>
            <div>Bronce</div>
            <div>Obsidiana</div>
            <div>Plata</div>
            <div>Azufre</div>
            <div>Mena de oro</div>
            <div>Cuarzo</div>
            <div>Platino</div>
            <div>Almandino</div>
            <div>Cuprita</div>
            <div>Piedra infernal</div>
          </div>
        </div>
      </div>
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
      console.log(titleSearchResources);
    });

    for (const recursos of searchResources.children) {
      recursos.addEventListener("click", () => {
        if (recursos.children[0].style.display == "block") {
          recursos.children[0].style.display = "none";
        } else {
          recursos.children[0].style.display = "block";
        }
      });
    }
  }
}
