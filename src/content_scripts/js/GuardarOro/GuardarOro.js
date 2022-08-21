import { insertOnPage } from "../utils/insertOnPage.js";
import { Menu } from "../Menu/Menu.js";
import { TimeSaver } from "../TimeSaver/TimeSaver.js";
import { oro, sh, getURL, dobleClickEvent } from "../main.js";

export class GuardarOro {
  static UI() {
    if (!!document.getElementById("gca-footer-links") == true) {
      Menu.addConfig(`
            <h3>Guardar Oro</h3>
            <ul><label><input id="GuardarOroCheck" type="checkbox"> Guardar tu oro automaticamente<label></ul>
            <ul><select id="TipoDeGuardado" class="GTSelectMenu">
                <option>Mercado</option>
                <option disabled>Casa de subastas</option>
                <option>Entrenamiento</option>
             </select>
             </ul>

        `);
    } else {
      Menu.addConfig(`
            <h3>Guardar Oro</h3>
            <ul><label><input id="GuardarOroCheck" type="checkbox"> Guardar tu oro automaticamente<label></ul>
            <ul><select id="TipoDeGuardado" class="GTSelectMenu">
                <option title="Es necesario instalar la extencion Gladiatus Crazy Add On" disabled>Mercado</option>
                <option disabled>Casa de subastas</option>
                <option>Entrenamiento</option>
             </select>
             </ul>

        `);
    }
    let GuardarOroCheck = document.getElementById("GuardarOroCheck");
    let TipoDeGuardado = document.getElementById("TipoDeGuardado");

    if (localStorage.GuardarOroCheck == undefined) {
      localStorage.GuardarOroCheck = GuardarOroCheck.checked;
    } else {
      GuardarOroCheck.checked = JSON.parse(localStorage.GuardarOroCheck);
    }
    GuardarOroCheck.addEventListener("change", () => {
      localStorage.GuardarOroCheck = GuardarOroCheck.checked;
      location.reload();
    });

    if (localStorage.TipoDeGuardado == undefined) {
      localStorage.TipoDeGuardado = TipoDeGuardado.selectedIndex;
    } else {
      TipoDeGuardado.selectedIndex = localStorage.TipoDeGuardado;
    }
    TipoDeGuardado.addEventListener("change", () => {
      localStorage.TipoDeGuardado = TipoDeGuardado.selectedIndex;
      location.reload();
    });

    if (TipoDeGuardado.selectedIndex == 0 ||
      TipoDeGuardado.selectedIndex == 1) {
      insertOnPage.afterend(
        TipoDeGuardado,
        `<ul>Oro Máximo a tener suelto: <input id="OroMaximoSuelto" style="width: 100px;background: white;" value="0"></ul`
      );
      let OroMaximoSuelto = document.getElementById("OroMaximoSuelto");
      if (localStorage.OroMaximoSuelto == undefined) {
        localStorage.OroMaximoSuelto = OroMaximoSuelto.value;
      } else {
        OroMaximoSuelto.value = localStorage.OroMaximoSuelto;
      }
      OroMaximoSuelto.addEventListener("input", () => {
        localStorage.OroMaximoSuelto = OroMaximoSuelto.value;
      });
    }

    if (TipoDeGuardado.selectedIndex == 2) {
      insertOnPage.afterend(
        TipoDeGuardado,
        `
            <select id="SeleccionarEntrenamiento" class="GTSelectMenu"><option>Fuerza</option><option>Destreza</option><option>Agilidad</option><option>Constitución</option><option>Carisma</option><option>Inteligencia</option></select>
            `
      );

      let SeleccionarEntrenamiento = document.getElementById(
        "SeleccionarEntrenamiento"
      );
      if (localStorage.SeleccionarEntrenamiento == undefined) {
        localStorage.SeleccionarEntrenamiento =
          SeleccionarEntrenamiento.selectedIndex;
      } else {
        SeleccionarEntrenamiento.selectedIndex =
          localStorage.SeleccionarEntrenamiento;
      }
      SeleccionarEntrenamiento.addEventListener("change", () => {
        localStorage.SeleccionarEntrenamiento =
          SeleccionarEntrenamiento.selectedIndex;
      });
    }
  }
  static VerSiTengoOro(oroTrigger) {
    let oroTriggerParse = parseInt(oroTrigger);
    if (oro > oroTriggerParse) {
      return true;
    } else {
      return false;
    }
  }

  static Guardar() {
    let EntrenamientoLink = `https://s45-es.gladiatus.gameforge.com/game/index.php?mod=training&${sh.get()}`;
    let GuardarOroCheck = document.getElementById("GuardarOroCheck");

    function Entrenamiento() {
      let tipoDeGuardado = {
        __ifNeedChoiseAnStat: () => {
          let SeleccionarEntrenamiento = document.getElementById(
            "SeleccionarEntrenamiento"
          );
          return SeleccionarEntrenamiento.selectedIndex;
        },
      };
      let data = {
        init: () => {
          if (getURL[0] == "?mod=training") {
            let TrainingBox = document.getElementById("training_box");
            let Stats = {
              get: () => {
                let stats = [];
                for (let index = 1; index < 7; index++) {
                  stats.push(TrainingBox.children[index]);
                }
                return stats;
              },
              push: () => {
                let statPrices = [];
                for (let statPrice of Stats.get()) {
                  statPrices.push(
                    parseInt(
                      statPrice.children[1].children[0].children[0].innerText.replace(
                        /\./g,
                        ""
                      )
                    )
                  );
                }
                localStorage.PlayerStatsPrices = JSON.stringify(statPrices);
              },
            };
            Stats.push();
          }
        },
      };
      if (localStorage.PlayerStatsPrices == undefined) {
        window.location.href = EntrenamientoLink;
      }
      data.init();
      let training_box = document.getElementById("training_box");
      let trainButtons = {
        get: () => {
          let buttons = [];
          for (let index = 1; index < 7; index++) {
            buttons.push(training_box.children[index].children[1].children[1]);
          }
          return buttons;
        },
      };

      /////////////
      //ir a guardar
      let playerStatsPrices = JSON.parse(localStorage.PlayerStatsPrices);
      if (playerStatsPrices[tipoDeGuardado.__ifNeedChoiseAnStat()] < oro) {
        window.location.href = EntrenamientoLink;
        trainButtons.get()[tipoDeGuardado.__ifNeedChoiseAnStat()].click();
      }
    }

    let MercadoDeAlianza = {
      VerificarOro: function () {
        let oroMaximoSuelto = parseInt(
          document.getElementById("OroMaximoSuelto").value
        );
        let oro = parseInt(
          document.getElementById("sstat_gold_val").innerText.replace(/\./g, "")
        );
        if (oro > oroMaximoSuelto) {
          return true;
        } else {
          return false;
        }
      },
      IrAMercado: function () {
        window.addEventListener("load", function (event) {
          TimeSaver.StopBot();
          window.location.href = `https://s45-es.gladiatus.gameforge.com/game/index.php?mod=guildMarket&${sh.get()}`;
        });
      },
      Comprar: function () {
        let botonComprar = document.getElementById("CompraTodo");
        botonComprar.click();
      },
      IrARecoger: function () {
        //
        window.location.href = `https://s45-es.gladiatus.gameforge.com/game/index.php?mod=packages&${sh.get()}&${getURL[getURL.length - 1]}`;
      },
      Recoger: function () {
        document.getElementById("buscarRotativos").click();
        let item = document.getElementById("MercadoFavoritos").children[1].children[2]
          .children[0];
        //item.dispatchEvent(dobleClickEvent)
        var target = document.getElementById("inv");
        var target2 = document.getElementById("MercadoFavoritos").children[1].children[2];

        const observerInventario = new MutationObserver((mutationList) => {
          mutationList.forEach((mutation) => {
            if (mutation.removedNodes.length) {
              item.dispatchEvent(dobleClickEvent);
            }
          });
        });
        const observerMercadoFavoritos = new MutationObserver(
          (mutationList) => {
            mutationList.forEach((mutation) => {
              if (mutation.removedNodes.length) {
                console.log("Eliminado", mutation.removedNodes[0]);
                window.location.href = `https://s45-es.gladiatus.gameforge.com/game/index.php?mod=guildMarket&${sh.get()}&r${getURL[getURL.length - 1]}`;
              }
            });
          }
        );

        const observerOptions = {
          attributes: true,
          childList: true,
          subtree: true,
          characterData: false,
          attributeOldValue: false,
          characterDataOldValue: false,
        };

        observerInventario.observe(target, observerOptions);
        observerMercadoFavoritos.observe(target2, observerOptions);
      },
      Vender: function () {
        var target = document.getElementById("inv");
        let botonVender = document.getElementsByName("anbieten")[0];

        const observerInventario = new MutationObserver((mutationList) => {
          mutationList.forEach((mutation) => {
            if (mutation.removedNodes.length) {
              setTimeout(function () {
                let item = document.getElementById("inv").children[0];
                item.dispatchEvent(dobleClickEvent);

                //llenado de formulario
                document.getElementById("preis").value =
                  getURL[getURL.length - 1].slice(13);
                document.getElementById("dauer").value = 3;

                setTimeout(function () {
                  TimeSaver.ContinueBot();
                  botonVender.click();
                }, 2000);
              }, 2000);
            }
          });
        });
        const observerOptions = {
          attributes: true,
          childList: true,
          subtree: true,
          characterData: false,
          attributeOldValue: false,
          characterDataOldValue: false,
        };
        observerInventario.observe(target, observerOptions);
      },
      ReescribirForm: function () {
        let formulario = document.getElementById("sellForm");
        formulario.action = formulario.action += "&vendido";
      },
      Run: function () {
        if (MercadoDeAlianza.VerificarOro() &&
          getURL[0] != "?mod=guildMarket") {
          MercadoDeAlianza.IrAMercado();
        }
        if (getURL[0] == "?mod=guildMarket" &&
          getURL[getURL.length - 1].slice(0, 11).includes("precioventa") == true) {
          MercadoDeAlianza.IrARecoger();
        } else if (MercadoDeAlianza.VerificarOro() &&
          getURL[0] == "?mod=guildMarket" &&
          getURL[getURL.length - 1].slice(0, 11).includes("precioventa") ==
          false) {
          MercadoDeAlianza.Comprar();
        }
        if (getURL[0] == "?mod=packages" &&
          getURL[getURL.length - 1].slice(0, 11).includes("precioventa") == true) {
          MercadoDeAlianza.Recoger();
        }
        if (getURL[0] == "?mod=guildMarket" &&
          getURL[getURL.length - 1].slice(0, 12).includes("rprecioventa") ==
          true) {
          MercadoDeAlianza.ReescribirForm();
          MercadoDeAlianza.Vender();
        }
        if (getURL[0] == "?mod=guildMarket" &&
          getURL[getURL.length - 1].includes("vendido") == true) {
          window.addEventListener("load", function (event) {
            TimeSaver.ContinueBot();
          });
        }
      },
    };

    if (GuardarOroCheck.checked) {
      let TipoDeGuardado_value = document.getElementById("TipoDeGuardado").value;

      const GUARDAR_ORO = {
        Mercado: function () {
          MercadoDeAlianza.Run();
        },
        "Casa de subastas": function () {
          console.log("Casa de Subastas");
        },
        Entrenamiento: function () {
          Entrenamiento();
        },
      };

      GUARDAR_ORO[TipoDeGuardado_value]();
    }
  }

  static Run() {
    GuardarOro.UI();
    GuardarOro.Guardar();
  }
}
