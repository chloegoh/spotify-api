import { auth } from "./services/auth.js";
import { genre } from "./services/genre.js";
import { ui } from "./services/ui.mjs";

// console.log(
//   _getToken().then(function (result) {
//     console.log(result); // "Some User token"
//   })
// );
async function getTemp() {
  try {
    // console.log(await Promise.resolve(auth.getToken()));
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
