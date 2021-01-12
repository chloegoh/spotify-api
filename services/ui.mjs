import jsdom from "jsdom";
import fs from "fs";

var pageTemplate = fs.readFileSync("index.html", "utf-8");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM(pageTemplate).window;
global.document = document;

const displayGenres = (genres) => {
  //   $(document).ready(function () {
  //     for (const genre in genres) {
  //       $("#genres").append(
  //         `<img src=${genre.icons[0].url} alt=${genre.name}><p>${genre.name}<p>`
  //       );
  //     }
  //   });
  for (const genre of genres) {
    const div = document.getElementById("genres");
    var img = document.createElement("img");
    img.src = genre.icons[0].url;
    img.alt = genre.name;
    console.log(div);
    console.log(document.getElementsByTagName("body"));
    div.appendChild(img);

    const p = document.createElement("P");
    p.innerHTML = genre.name;
    div.appendChild(p);
  }
};

export const ui = {
  displayGenres,
};
