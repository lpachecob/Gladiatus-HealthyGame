// Content script is injecting a script with ES6 module support into the current page
const script = document.createElement("script");
script.setAttribute("type", "module");
script.setAttribute(
  "src",
  chrome.extension.getURL("/src/content_scripts/js/main.js")
);

const css = document.createElement("link");
css.setAttribute("rel", "stylesheet");
css.setAttribute(
  "href",
  chrome.extension.getURL("/src/content_scripts/css/styles.css")
);

const head =
  document.head ||
  document.getElementsByTagName("head")[0] ||
  document.documentElement;
  
head.insertBefore(css, head.lastChild);
head.insertBefore(script, head.lastChild);

