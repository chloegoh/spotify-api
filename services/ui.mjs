const displayGenres = (genres) => {
  console.log(genres);
  for (const genre of genres) {
    const div = document.getElementById("genres");
    var img = document.createElement("img");
    img.src = genre.icons[0].url;
    img.alt = genre.name;
    div.appendChild(img);

    const p = document.createElement("P");
    p.innerHTML = genre.name;
    div.appendChild(p);
  }
};

export const ui = {
  displayGenres,
};
