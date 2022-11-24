import { insertOnPage } from "../utils/insertOnPage.js";
import { sh } from "../main.js";

export class ExtenderBotones {
  static Paquetes() {
    let menue_packages = document.getElementById("menue_packages");
    let url = window.location.search.split("&");
    insertOnPage.beforeend(
      menue_packages,
      `
            <div id="extenderPaquetes">
                <div id="menuBotonPaquetes" class="menuBotonPaquetes">
                    <titulo style="display: flex;align-content: center;justify-content: center;align-items: center;">
                        Links a paquetes 
                        <a href="#" id="buscarPaquetes"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path> </svg></a>
                        <div id="formulariobusquedapaquete">
                            <input type="text" id="buscarPaquetesInput" placeholder="Buscar paquetes" style="width: 111px;">
                            <button href="#">Buscar</button>

                        </div>
                    </titulo>
                    <submenu style="display: block;">
                        <div class="icon-out"><a class="icon food-icon" href="index.php?mod=packages&f=7&fq=-1&qry=&page=1&${sh.get()}" data-tooltip="[[[&quot;Paquetes&quot;,&quot;#BA9700&quot;],[&quot;Ir a la sección de Comida&quot;,&quot;white&quot;]]]"></a></div>

                        <div class="icon-out"><a class="icon gold-icon" href="index.php?mod=packages&f=14&fq=-1&qry=&page=1&${sh.get()}" data-tooltip="[[[&quot;Paquetes&quot;,&quot;#BA9700&quot;],[&quot;Ir a la sección de Oro&quot;,&quot;white&quot;]]]"></a></div>
                        
                        <div class="icon-out"><a class="icon tool-icon" href="index.php?mod=packages&f=19&fq=-1&qry=&page=1&${sh.get()}" data-tooltip="[[[&quot;Paquetes&quot;,&quot;#BA9700&quot;],[&quot;Ir a la sección de Herramientas&quot;,&quot;white&quot;]]]"></a></div>
                        
                        <div class="icon-out"><a class="icon pergamino-icon" href="index.php?mod=packages&f=20&fq=-1&qry=&page=1&${sh.get()}" data-tooltip="[[[&quot;Paquetes&quot;,&quot;#BA9700&quot;],[&quot;Ir a la sección de Pergamminos&quot;,&quot;white&quot;]]]"></a></div>
                        
                        <div id="Calidadesboton" class="icon-out dropdown"><a class="extender-dropdown" href="index.php?mod=packages&f=0&fq=-1&qry=&page=1&${sh.get()} "data-tooltip="[[[&quot;Calidad de Paquetes&quot;,&quot;#BA9700&quot;],[&quot;Ir a paquetes sin restriccion de calidad.&quot;,&quot;white&quot;]]]"><svg class="svg-extender-color" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgb(154 143 143);"><path d="M22 8a.76.76 0 0 0 0-.21v-.08a.77.77 0 0 0-.07-.16.35.35 0 0 0-.05-.08l-.1-.13-.08-.06-.12-.09-9-5a1 1 0 0 0-1 0l-9 5-.09.07-.11.08a.41.41 0 0 0-.07.11.39.39 0 0 0-.08.1.59.59 0 0 0-.06.14.3.3 0 0 0 0 .1A.76.76 0 0 0 2 8v8a1 1 0 0 0 .52.87l9 5a.75.75 0 0 0 .13.06h.1a1.06 1.06 0 0 0 .5 0h.1l.14-.06 9-5A1 1 0 0 0 22 16V8zm-10 3.87L5.06 8l2.76-1.52 6.83 3.9zm0-7.72L18.94 8 16.7 9.25 9.87 5.34zM4 9.7l7 3.92v5.68l-7-3.89zm9 9.6v-5.68l3-1.68V15l2-1v-3.18l2-1.11v5.7z"></path></svg></a>
                            <div id="CalidadesDropdown" class="extender-calidad">
                                <span style="padding-top: 1px;text-decoration-line: underline;">Calidades de objetos</span>
                                <div class="extender-calidad-dropdown"><a href="index.php?mod=packages&f=0&fq=0&qry=&page=1&${sh.get()}" data-tooltip="[[[&quot;Calidad de Paquetes&quot;,&quot;#BA9700&quot;],[&quot;Ir a paquetes desde calidad verde.&quot;,&quot;lime&quot;]]]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgb(0 246 0);"><path d="M22 8a.76.76 0 0 0 0-.21v-.08a.77.77 0 0 0-.07-.16.35.35 0 0 0-.05-.08l-.1-.13-.08-.06-.12-.09-9-5a1 1 0 0 0-1 0l-9 5-.09.07-.11.08a.41.41 0 0 0-.07.11.39.39 0 0 0-.08.1.59.59 0 0 0-.06.14.3.3 0 0 0 0 .1A.76.76 0 0 0 2 8v8a1 1 0 0 0 .52.87l9 5a.75.75 0 0 0 .13.06h.1a1.06 1.06 0 0 0 .5 0h.1l.14-.06 9-5A1 1 0 0 0 22 16V8zm-10 3.87L5.06 8l2.76-1.52 6.83 3.9zm0-7.72L18.94 8 16.7 9.25 9.87 5.34zM4 9.7l7 3.92v5.68l-7-3.89zm9 9.6v-5.68l3-1.68V15l2-1v-3.18l2-1.11v5.7z"></path></svg></a></div>
                                
                                <div class="extender-calidad-dropdown"><a href="index.php?mod=packages&f=0&fq=1&qry=&page=1&${sh.get()}" data-tooltip="[[[&quot;Calidad de Paquetes&quot;,&quot;#BA9700&quot;],[&quot;Ir a paquetes desde calidad azul.&quot;,&quot;#5159F7&quot;]]]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgb(81 89 247);"><path d="M22 8a.76.76 0 0 0 0-.21v-.08a.77.77 0 0 0-.07-.16.35.35 0 0 0-.05-.08l-.1-.13-.08-.06-.12-.09-9-5a1 1 0 0 0-1 0l-9 5-.09.07-.11.08a.41.41 0 0 0-.07.11.39.39 0 0 0-.08.1.59.59 0 0 0-.06.14.3.3 0 0 0 0 .1A.76.76 0 0 0 2 8v8a1 1 0 0 0 .52.87l9 5a.75.75 0 0 0 .13.06h.1a1.06 1.06 0 0 0 .5 0h.1l.14-.06 9-5A1 1 0 0 0 22 16V8zm-10 3.87L5.06 8l2.76-1.52 6.83 3.9zm0-7.72L18.94 8 16.7 9.25 9.87 5.34zM4 9.7l7 3.92v5.68l-7-3.89zm9 9.6v-5.68l3-1.68V15l2-1v-3.18l2-1.11v5.7z"></path></svg></a></div>
                               
                                <div class="extender-calidad-dropdown"><a href="index.php?mod=packages&f=0&fq=2&qry=&page=1&${sh.get()}" data-tooltip="[[[&quot;Calidad de Paquetes&quot;,&quot;#BA9700&quot;],[&quot;Ir a paquetes desde calidad lila.&quot;,&quot;#E303E0&quot;]]]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgb(227 3 224);"><path d="M22 8a.76.76 0 0 0 0-.21v-.08a.77.77 0 0 0-.07-.16.35.35 0 0 0-.05-.08l-.1-.13-.08-.06-.12-.09-9-5a1 1 0 0 0-1 0l-9 5-.09.07-.11.08a.41.41 0 0 0-.07.11.39.39 0 0 0-.08.1.59.59 0 0 0-.06.14.3.3 0 0 0 0 .1A.76.76 0 0 0 2 8v8a1 1 0 0 0 .52.87l9 5a.75.75 0 0 0 .13.06h.1a1.06 1.06 0 0 0 .5 0h.1l.14-.06 9-5A1 1 0 0 0 22 16V8zm-10 3.87L5.06 8l2.76-1.52 6.83 3.9zm0-7.72L18.94 8 16.7 9.25 9.87 5.34zM4 9.7l7 3.92v5.68l-7-3.89zm9 9.6v-5.68l3-1.68V15l2-1v-3.18l2-1.11v5.7z"></path></svg></a></div>
                                
                                <div class="extender-calidad-dropdown"><a href="index.php?mod=packages&f=0&fq=3&qry=&page=1&${sh.get()}" data-tooltip="[[[&quot;Calidad de Paquetes&quot;,&quot;#BA9700&quot;],[&quot;Ir a paquetes desde calidad naranja.&quot;,&quot;#FF6A00&quot;]]]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgb(255 106 0);"><path d="M22 8a.76.76 0 0 0 0-.21v-.08a.77.77 0 0 0-.07-.16.35.35 0 0 0-.05-.08l-.1-.13-.08-.06-.12-.09-9-5a1 1 0 0 0-1 0l-9 5-.09.07-.11.08a.41.41 0 0 0-.07.11.39.39 0 0 0-.08.1.59.59 0 0 0-.06.14.3.3 0 0 0 0 .1A.76.76 0 0 0 2 8v8a1 1 0 0 0 .52.87l9 5a.75.75 0 0 0 .13.06h.1a1.06 1.06 0 0 0 .5 0h.1l.14-.06 9-5A1 1 0 0 0 22 16V8zm-10 3.87L5.06 8l2.76-1.52 6.83 3.9zm0-7.72L18.94 8 16.7 9.25 9.87 5.34zM4 9.7l7 3.92v5.68l-7-3.89zm9 9.6v-5.68l3-1.68V15l2-1v-3.18l2-1.11v5.7z"></path></svg></a></div>
                                
                                <div class="extender-calidad-dropdown"><a href="index.php?mod=packages&f=0&fq=4&qry=&page=1&${sh.get()}" data-tooltip="[[[&quot;Calidad de Paquetes&quot;,&quot;#BA9700&quot;],[&quot;Ir a paquetes desde calidad roja.&quot;,&quot;#FF0000&quot;]]]"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgb(255 0 0);"><path d="M22 8a.76.76 0 0 0 0-.21v-.08a.77.77 0 0 0-.07-.16.35.35 0 0 0-.05-.08l-.1-.13-.08-.06-.12-.09-9-5a1 1 0 0 0-1 0l-9 5-.09.07-.11.08a.41.41 0 0 0-.07.11.39.39 0 0 0-.08.1.59.59 0 0 0-.06.14.3.3 0 0 0 0 .1A.76.76 0 0 0 2 8v8a1 1 0 0 0 .52.87l9 5a.75.75 0 0 0 .13.06h.1a1.06 1.06 0 0 0 .5 0h.1l.14-.06 9-5A1 1 0 0 0 22 16V8zm-10 3.87L5.06 8l2.76-1.52 6.83 3.9zm0-7.72L18.94 8 16.7 9.25 9.87 5.34zM4 9.7l7 3.92v5.68l-7-3.89zm9 9.6v-5.68l3-1.68V15l2-1v-3.18l2-1.11v5.7z"></path></svg></a></div>
                            </div>
                        </div>
                    </submenu>
                </div>
            </div>
            `
    );
    let menuBotonPaquetes = document.getElementById("menuBotonPaquetes");
    let extenderPaquetes = document.getElementById("extenderPaquetes");
    menue_packages.addEventListener("mouseenter", () => {
      menuBotonPaquetes.style.display = "block";
    });
    menue_packages.addEventListener("mouseleave", () => {
      menuBotonPaquetes.style.display = "none";
      document.getElementById("menue_packages").attributes["href"].value = `index.php?mod=packages&${sh.get()}`
    });
    let Calidadesboton = document.getElementById("Calidadesboton");
    let CalidadesDropdown = document.getElementById("CalidadesDropdown");
    Calidadesboton.addEventListener("mouseenter", () => {
      CalidadesDropdown.style.display = "block";
    });
    Calidadesboton.addEventListener("mouseleave", () => {
      CalidadesDropdown.style.display = "none";
    });

    let buscarPaquetes = document.getElementById("buscarPaquetes");
    buscarPaquetes.addEventListener("click", () => {
      let formulariobusquedapaquete = document.getElementById(
        "formulariobusquedapaquete"
      );
      formulariobusquedapaquete.style.display = "flex";
      document.getElementById("menue_packages").attributes["href"].value = "#"
    });
    menue_packages.removeAttribute("title");
  }
  static Reports() {
    let menue_reports = document.getElementById("menue_reports");
    insertOnPage.beforeend(
      menue_reports,
      `
        <div id="extenderReportes">
            <div id="botones" style="display: block; position: relative; top: 3px;">
                <a href="index.php?mod=reports&t=-1&${sh.get()}"><div class="headericon_big" id="icon_expeditionpoints" data-tooltip="[[[&quot;Expedición&quot;,&quot;#BA9700&quot;],[&quot;Ir a reportes de expediciones&quot;,&quot;white&quot;]]]"></div></a>

                <a href="index.php?mod=reports&submod=showDungeons&${sh.get()}"><div class="headericon_big" id="icon_dungeonpoints" data-tooltip="[[[&quot;Mazmorras&quot;,&quot;#BA9700&quot;],[&quot;Ir a reportes de masmorras&quot;,&quot;white&quot;]]]"></div></a>

                <a href="index.php?mod=reports&submod=showArena&${sh.get()}"><div class="headericon_big" id="icon_arena" data-tooltip="[[[&quot;Arena&quot;,&quot;#BA9700&quot;],[&quot;Ir a reportes de Arena&quot;,&quot;white&quot;]]]"></div></a>
                
                <a href="index.php?mod=reports&submod=showCircusTurma&${sh.get()}"><div class="headericon_big" id="icon_grouparena" data-tooltip="[[[&quot;Circo Turma&quot;,&quot;#BA9700&quot;],[&quot;Ir a reportes de Circo Turma&quot;,&quot;white&quot;]]]"></div></a>
            </div>
        </div>
        `
    );
    let extenderReportes = document.getElementById("extenderReportes");
    menue_reports.addEventListener("mouseenter", () => {
      extenderReportes.style.display = "flex";
    });
    menue_reports.addEventListener("mouseleave", () => {
      extenderReportes.style.display = "none";
    });
    menue_reports.removeAttribute("title");
  }
}
