import { Main } from "./modules/main";
import { insertOnPage } from "./modules/utils/insertOnPage";

/**
 * run script
 */
 Main.Run();

 let footer_links = document.getElementsByClassName("footer_links")[0];
 insertOnPage.beforeend(
   footer_links,
   `
  | <a target="blank" href="https://github.com/lpachecob/Gladiatus-HealthyGame" style="color: #a78e3d;text-decoration: none;">GHG</a>
 `
 );