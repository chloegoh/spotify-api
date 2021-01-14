async function getNewReleases(token) {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/browse/new-releases?locale=sv_US",
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getGenres(token) {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/browse/categories?locale=sv_US",
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await response.json();
    return data.categories.items;
  } catch (error) {
    console.error(error);
  }
}

async function getGenre(token, categoryId) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories/${categoryId}?locale=en_US&limit=50`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getPlaylistsByGenre(token, categoryId) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=50`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await response.json();
    return data.playlists.items;
  } catch (error) {
    console.error(error);
  }
}

async function getTracksByPlaylist(token, playlistId) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await response.json();
    // Return tracks without unnecessary information
    return data.items.map((item) => item.track);
  } catch (error) {
    console.error(error);
  }
}

export const genre = {
  getNewReleases,
  getGenres,
  getGenre,
  getPlaylistsByGenre,
  getTracksByPlaylist,
};
