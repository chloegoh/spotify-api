import { auth } from "../services/auth.js";
import { genre } from "../services/genre.js";
import { ui } from "../services/ui.js";

async function runApp() {
  try {
    const token = await Promise.resolve(auth.getToken());
    // Retrieve a list of genres
    const genres = await Promise.resolve(genre.getGenres(token));

    // Display UI
    $(document).ready(function () {
      ui.displayGenres(genres);
      ui.handleGenreEvents(token);

      // Display playlists if already in session storage
      if (sessionStorage.getItem("playlists")) {
        ui.displayPlaylists();
        ui.handlePlaylistsEvents(token);
      }

      // Display playlists if already in session storage
      if (sessionStorage.getItem("tracks")) {
        ui.displayTracks();
        ui.handleMailingEvents();
      }
    });
  } catch (error) {
    console.error(error);
  }
}

runApp();
