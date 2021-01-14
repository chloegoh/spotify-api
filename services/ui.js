import { genre } from "./genre.js";

const displayGenres = (genres) => {
  // Show all categories/genres
  for (const genre of genres) {
    $("#genres").append(
      `<div class="genre" id="${genre.id}"><p>${genre.name}</p><img class="genre-img" src="${genre.icons[0].url}" alt="${genre.name}"></div>`
    );
  }
};

const handleGenreEvents = (token) => {
  // On-click handlers for each genre
  $(".genre-img").click(async function () {
    // Get playlists and display them after genre has been clicked
    const categoryId = $(this).parent().attr("id");
    const categoryName = $(this).attr("alt");
    const playlists = await Promise.resolve(
      genre.getPlaylistsByGenre(token, categoryId)
    );
    console.log(playlists);

    const tracks = await Promise.resolve(
      genre.getTracksByPlaylist(token, "37i9dQZF1DXaqCgtv7ZR3L")
    );
    console.log(tracks);

    // Store playlists (as string) in session storage
    sessionStorage.setItem("playlists", JSON.stringify(playlists));

    sessionStorage.setItem("categoryName", categoryName);

    // Redirect to another page
    window.location.href = "playlists.html";
  });
};

const displayPlaylists = () => {
  // Show genre name in heading
  if (sessionStorage.getItem("categoryName")) {
    const categoryName = sessionStorage.getItem("categoryName");
    const heading = $("#playlists-heading").text();
    $("#playlists-heading").text(`${categoryName} - ${heading}`);
  }

  const playlists = JSON.parse(sessionStorage.getItem("playlists"));
  console.log(playlists);

  // Show all playlists of the selected genre
  for (const playlist of playlists) {
    $("#playlists").append(
      `<div class="playlist" id="${playlist.id}"><h5>${playlist.name}</h5><p>${playlist.description}</p><img class="playlist-img" src="${playlist.images[0].url}" alt="${playlist.name}"></div>`
    );
  }
};

const handlePlaylistsEvents = (token) => {
  // On-click handlers for each playlist
  $(".playlist-img").click(async function () {
    // Get tracks and display them after playlist has been clicked
    const playlistId = $(this).parent().attr("id");
    const playlistName = $(this).attr("alt");
    const tracks = await Promise.resolve(
      genre.getTracksByPlaylist(token, playlistId)
    );

    // Store tracks (as string) in session storage
    sessionStorage.setItem("tracks", JSON.stringify(tracks));

    sessionStorage.setItem("playlistName", playlistName);

    // Redirect to another page
    window.location.href = "tracks.html";
  });
};

const displayTracks = () => {
  // Show playlist name in heading
  if (sessionStorage.getItem("playlistName")) {
    const categoryName = sessionStorage.getItem("playlistName");
    const heading = $("#tracks-heading").text();
    $("#tracks-heading").text(`${categoryName} - ${heading}`);
  }

  const tracks = JSON.parse(sessionStorage.getItem("tracks"));

  // Show all tracks of the selected playlist, sorted by popularity
  // Tracks with higher popularity rating will be shown first
  tracks.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));

  for (const track of tracks) {
    let artists = "";
    // Retrieve all artists' name in the track
    for (let i = 0; i < track.artists.length; ++i) {
      // Add commas if more than one artists
      if (i !== 0) {
        artists += ", ";
      }

      artists += track.artists[i].name;
    }

    $("#tracks").append(
      `<div class="track" id="${track.id}"><p>${track.name} - ${artists}</p><p>${track.popularity}</p></div>`
    );
  }
};

export const ui = {
  displayGenres,
  handleGenreEvents,
  displayPlaylists,
  handlePlaylistsEvents,
  displayTracks,
};
