export class Herreria {
  static getItems() {
    return !!document.getElementsByClassName("crafting_requirements")[0]
      .children[0].children[1].children[0];
  }
  static setLinks() {
    if (Herreria.getItems() == true) {
      let recursos = document.getElementsByClassName("crafting_requirements")[0]
        .children[0].children[1];
      let recursoslength = recursos.children.length;
      recursos.insertAdjacentHTML("beforebegin", `<ul id="newResources"></ul>`);
      let newResources = document.getElementById("newResources");
      for (let index = 0; index < recursoslength; index++) {
        let recurso = recursos.children[index];
        let recursoId = recurso.children[0].className.split("-")[3];
        let url = `<a name="nuevoRecurso" href="https://es.gladiatus-tools.com/resources?id=${recursoId}"></a>`;
        newResources.insertAdjacentHTML("beforeend", url);
      }
      let nuevoRecurso = document.getElementsByName("nuevoRecurso");
      for (let index = 0; index < nuevoRecurso.length; index++) {
        let recurso = recursos.children[0];
        nuevoRecurso[index].append(recurso);
      }
    }
  }
  static run() {
    let newResources = document.getElementById("newResources");
    //Herreria.setLinks();
    for (let forgeItem of document.getElementsByClassName("forge_closed")) {
      forgeItem.addEventListener("click", () => {
        newResources.destroy();
        Herreria.setLinks();
      });
    }
  }
}
