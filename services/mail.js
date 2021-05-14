// Mailchimp Transactional API
// https://mailchimp.com/developer/transactional/guides/quick-start/

import { config } from "../js/config.js";

const apiKey = config.apiKey;

async function sendEmail(email) {
  try {
    const tracks = JSON.parse(sessionStorage.getItem("tracks"));
    tracks.sort((a, b) => (a.popularity < b.popularity ? 1 : -1));
    const tracklist = tracks.filter((track) => track.popularity > 95);

    const message = `{"key": ${apiKey}, "message": {"from_email": "p.ying999@gmail.com", "subject": "Popular Tracklist for You", "text": ${tracklist}, "to": [{ "email": "${email}", "type": "to" }]}}`;

    const response = await fetch(
      "https://mandrillapp.com/api/1.0/messages/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: message,
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Make sure the api is working
async function test() {
  try {
    const response = await fetch("https://mandrillapp.com/api/1.0/users/ping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key: apiKey }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const mail = { sendEmail, test };
