export function SmelteryTimeSaverExtension() {
  let inv = document.getElementById("inv");
  window.addEventListener("load", () => {
    if (document.getElementsByClassName("smelter-actions")[0] != undefined) {
      let inventario = document.getElementsByClassName("smelter-actions")[0];
      let items = document.getElementsByClassName("ui-draggable");
      let btnFundicion = FindBtn("Iniciar función");
      let btnGuardarRecursos = FindBtn("Enviar todo a Horreum");
      let mensaje = document.getElementsByClassName("gts-error-message")[0];
      inventario.insertAdjacentHTML(
        "beforeend",
        `
               <strong>Acciones Rapidas</strong>
               <br/>
               Selecciona un inventario para fundir
               <select
			   id="SelectInventario"
			   size="1">
				  <option value="Ⅰ">Ⅰ</option>
				  <option value="Ⅱ">Ⅱ</option>
				  <option value="Ⅲ">Ⅲ</option>
				  <option value="Ⅳ">Ⅳ</option>
				  <option value="Ⅴ">Ⅴ</option>
				  <option value="Ⅵ">Ⅵ</option>
				  <option value="Ⅶ">Ⅶ</option>
				  <option value="Ⅷ">Ⅷ</option>
				</select>
                <hr>
                <button
					class="awesome-button"
					type="button"
					id="FundirTodo">
					Fundir Todo
			   </button>
               <button
					class="awesome-button"
					type="button"
					id="GuardarFundir">
					Guardar y Fundir
			   </button>

		  `
      );

      let selectInventario = document.getElementById("SelectInventario");
      if (localStorage.selectInventario == undefined) {
        localStorage.selectInventario = selectInventario.selectedIndex;
      } else {
        selectInventario.selectedIndex = localStorage.selectInventario;
      }
      selectInventario.addEventListener("change", () => {
        localStorage.selectInventario = selectInventario.selectedIndex;
      });

      let inventoryTabs = document.getElementsByClassName("awesome-tabs");
      let inventorySelected;
      for (let index = 4; index < inventoryTabs.length; index++) {
        if (inventoryTabs[index].text == localStorage.InventarioFundicion) {
          inventorySelected = inventoryTabs[index];
        }
      }

      if (localStorage.GuardarRecursos == undefined) {
        localStorage.GuardarRecursos = false;
      }
      const observer = new MutationObserver((mutationList) => {
        mutationList.forEach((mutation) => {
          if (mutation.removedNodes.length) {
            if (JSON.parse(localStorage.GuardarRecursos) == true) {
              inventorySelected.click();
              btnFundicion.click();
              for (let index = 9; index < items.length; index++) {
                items[index].click();
              }
              localStorage.GuardarRecursos = false;
            }
          }
        });
      });
      // Opcions para el observer
      const observerOptions = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: false,
        attributeOldValue: false,
        characterDataOldValue: false,
      };
      observer.observe(inv, observerOptions);

      if (JSON.parse(localStorage.GuardarRecursos) == true) {
        inventorySelected.click();
        btnFundicion.click();
        for (let index = 9; index < items.length; index++) {
          items[index].click();
        }
        localStorage.GuardarRecursos = false;
      }
      let GuardarFundir = document.getElementById("GuardarFundir");
      GuardarFundir.addEventListener("click", () => {
        localStorage.GuardarRecursos = true;
        btnGuardarRecursos.click();
      });

      let fundirTodo = document.getElementById("FundirTodo");
      fundirTodo.addEventListener("click", () => {
        inventorySelected.click();
        btnFundicion.click();
        for (let index = 9; index < items.length; index++) {
          items[index].click();
        }
      });

      mensaje.addEventListener(
        "DOMNodeInserted",
        () => {
          window.location.reload();
        },
        false
      );
    } else {
      console.log("time saver extension not installed");
    }
  });

  function FindBtn(textContent) {
    let elements = document.getElementsByClassName("awesome-button");
    let elementsArray = [].slice.call(elements);
    for (let index = 0; index < elementsArray.length; index++) {
      let element = elementsArray[index];
      if (element.textContent === textContent) {
        return element;
      }
    }
  }

  function Observer(observar) {
    let observerReturn = [[], []];
    const observer = new MutationObserver((mutationList) => {
      mutationList.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          observerReturn[0].push(mutation.addedNodes[0]);
        }
        if (mutation.removedNodes.length) {
          observerReturn[1].push(mutation.removedNodes[0]);
        }
        //console.log(mutation.type);
      });
    });
    // Opcions para el observer
    const observerOptions = {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: false,
      attributeOldValue: false,
      characterDataOldValue: false,
    };
    observer.observe(observar, observerOptions);
    return observerReturn;
  }
}
