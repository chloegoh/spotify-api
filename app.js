import { auth } from "./services/auth.js";
import { genre } from "./services/genre.js";
import { ui } from "./services/ui.mjs";

async function getTemp() {
  try {
    const token = await Promise.resolve(auth.getToken());
    // const newReleases = await Promise.resolve(genre.getNewReleases(token));
    // console.log(newReleases);
    // Retrieve a list of genres
    const genres = await Promise.resolve(genre.getGenres(token));
    console.log(genres);
    ui.displayGenres(genres);
  } catch (error) {
    console.error(error);
  }
}

getTemp();
