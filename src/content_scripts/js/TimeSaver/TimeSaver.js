import { Menu } from "../Menu/Menu.js";

export class TimeSaver {
  static Exist() {
    const timeSaverr = !!document.getElementsByClassName("auto-settings")[0];
    return timeSaverr;
  }

  static Touch() {
    if (TimeSaver.Exist() == true) {
      let boton = document.getElementsByClassName("gts-pause show")[0];
      boton.addEventListener("touchstart", () => {
        boton.children[0].click();
      });
    }
  }

  static setKeyForStop(timeSaverExist) {
    if (timeSaverExist == true) {
      Menu.addConfig(`
            <h3>TimeSaver</h3>
            <ul>Pasuar con click
                <ul><label><input id="TimeSaverStopOnClick" type="checkbox">Detener el bot si se hace click en la pagina<label></ul>
            </ul>
            <ul>Atajos de Teclado
                <ul>Pausar Bot: <input maxlength="1" id="timeSaverHotKeySelectedKey" style="width: 100px;background: white;"><button id="Btnconfirmar" title="click para guardar" style="background: transparent; border: transparent;"></button></ul>
                <ul style="color: #0fea0f;" id="timeSaverHotKeyConfirmation" hidden>✔ Cambios guardados correctamente</ul>
                <ul><label><input id="timeSaverHotKeyCheckbox" type="checkbox"> Utilizar combinación con ctrl<label></ul>
            </ul>`);

      let timeSaverHotKeySelectedKey = document.getElementById(
        "timeSaverHotKeySelectedKey"
      );
      let timeSaverHotKeyCheckbox = document.getElementById(
        "timeSaverHotKeyCheckbox"
      );
      let timeSaverHotKeyConfirmation = document.getElementById(
        "timeSaverHotKeyConfirmation"
      );

      let Btnconfirmar = document.getElementById("Btnconfirmar");

      Btnconfirmar.addEventListener("click", () => {
        Btnconfirmar.textContent = "";
        timeSaverHotKeyConfirmation.hidden = false;
      });

      if (localStorage.timeSaverHotKeyCheckbox == undefined) {
        localStorage.timeSaverHotKeyCheckbox = false;
      } else {
        timeSaverHotKeyCheckbox.checked = JSON.parse(
          localStorage.timeSaverHotKeyCheckbox
        );
      }
      timeSaverHotKeyCheckbox.addEventListener("change", () => {
        localStorage.timeSaverHotKeyCheckbox = timeSaverHotKeyCheckbox.checked;
        location.reload();
      });

      if (localStorage.timeSaverHotKeySelectedKey == undefined) {
        localStorage.timeSaverHotKeySelectedKey = "";
      } else {
        timeSaverHotKeySelectedKey.value =
          localStorage.timeSaverHotKeySelectedKey;
      }
      timeSaverHotKeySelectedKey.addEventListener("keydown", () => {
        timeSaverHotKeySelectedKey.select();
        Btnconfirmar.textContent = "✅";
      });
      timeSaverHotKeySelectedKey.addEventListener("change", () => {
        localStorage.timeSaverHotKeySelectedKey =
          timeSaverHotKeySelectedKey.value;
        location.reload();
      });
    }
  }

  static StopOnKey() {
    document.addEventListener(
      "keyup",
      (e) => {
        let selectKey = localStorage.timeSaverHotKeySelectedKey;
        let useControl = JSON.parse(localStorage.timeSaverHotKeyCheckbox);

        if (useControl == true && e.ctrlKey && e.key === selectKey) {
          TimeSaver.StopBot();
        }

        if (useControl == false && e.key === selectKey) {
          TimeSaver.StopBot();
        }
      },
      false
    );
  }

  static StopBot() {
    if (TimeSaver.Exist() == true) {
      let timeSaver = document.getElementsByClassName("auto-settings")[0];
      let botonPlay = timeSaver.children[3];
      if (botonPlay.classList[2] == "show") {
        //bot desactivado
        botonPlay.click();
      }
    }
  }
  static ContinueBot() {
    if (TimeSaver.Exist() == true) {
      let timeSaver = document.getElementsByClassName("auto-settings")[0];
      let botonPlay = timeSaver.children[3];
      if (!!botonPlay.classList[2] == false) {
        //bot desactivado
        botonPlay.click();
      }
    }
  }
  static StopOnClick() {
    let TimeSaverStopOnClick = document.getElementById("TimeSaverStopOnClick");
    if (localStorage.TimeSaverStopOnClick == undefined) {
      localStorage.TimeSaverStopOnClick = false;
    } else {
      TimeSaverStopOnClick.checked = JSON.parse(
        localStorage.TimeSaverStopOnClick
      );
    }
    TimeSaverStopOnClick.addEventListener("change", () => {
      localStorage.TimeSaverStopOnClick = TimeSaverStopOnClick.checked;
      location.reload();
    });
    if (JSON.parse(localStorage.TimeSaverStopOnClick) == true) {
      document.addEventListener("mouseup", function (e) {
        var container = document.getElementsByClassName("auto-settings")[0];
        if (!container.contains(e.target)) {
          TimeSaver.StopBot();
        }
      });
    }
  }
  static cambiarInterfaz() { }
}
