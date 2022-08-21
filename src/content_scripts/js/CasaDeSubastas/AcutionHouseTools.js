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
       data-tooltip="[[[&quot;Comprar Todo&quot;,&quot;#BA9700&quot;],[&quot;Se compraran toda la comida hasta que o se acabe tu oro o ya no haya más comida.&quot;,&quot;white&quot;]]]">
	   Comprar todo
     </button>`
  );

  let oroMaximo = document.getElementById("OroMaximo");
  let botonComprar = document.getElementById("BotonComprar");

  botonComprar.addEventListener("click", () => {
    //document.getElementsByClassName("auction_bid_div")[0].children[3]
    let auction_bid_div = Array.from(
      document.getElementsByClassName("auction_bid_div")
    ).filter((item) => item.children[0].children[0].tagName == "BR");
    for (const item of auction_bid_div) {
      item.children[3].click();
    }
  });
  botonComprar.addEventListener("touchstart", () => {
    if (oroMaximo.value.length > 0) {
      //Proximamente
    } else if (oroMaximo.value.length == 0) {
      for (let isItem = 0; isItem < item.length; isItem++) {
        if (item[isItem].hasAttribute("width") == true) {
          let auction_bid_div = item[isItem].children[1].children[0].children[7].children;
          let auction_item_div = item[isItem].children[1].children[0].children[6].children[1]
            .children[0];
          let itemSplit = auction_item_div.attributes[6].textContent.substring(
            4,
            9
          );
          //console.log(auction_bid_div[2]);
          let costo = parseInt(auction_bid_div[2].value);
          if (costo < oro) {
            oro = oro - costo;
            //console.log(oro," - ",costo)
            let PujaDeAlguien;
            if (auction_bid_div[0].innerText.split("\n")[0] == "No hay pujas." ||
              auction_bid_div[0].innerText.split("\n")[0] ==
              "Ya hay pujas existentes.") {
              //items[i].children[3].click();
              if (itemSplit != "Pollo") {
                auction_bid_div[3].click();
              }
            }
          }
        }
      }
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
}
