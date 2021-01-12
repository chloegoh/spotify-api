import fetch from "node-fetch";

async function getNewReleases(token) {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/browse/new-releases",
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
      "https://api.spotify.com/v1/browse/categories",
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      }
    );

    const data = await response.json();
    // return data;
    return data.categories.items;
  } catch (error) {
    console.error(error);
  }
}

async function getGenre(token, category_id) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/browse/categories/${category_id}`,
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

async function getPlaylistsByGenre(token) {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/browse/categories/{category_id}/playlists",
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

export const genre = {
  getNewReleases,
  getGenres,
  getGenre,
  getPlaylistsByGenre,
};
