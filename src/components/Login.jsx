import React from "react";
import styled from "styled-components";

export default function Login() {
  function handleClick() {
    const clientId = "2602f6e2ed454bbc8d80b9f7e0fd4372";

    const redirectUrl = "http://localhost:3000/";

    const apiUrl = "https://accounts.spotify.com/authorize";

    //scope for spotfiy api
    const scope = [
      "user-read-email",
      "user-read-private",
      " user-read-playback-state",
      " user-modify-playback-state",
      " user-read-currently-playing",
        "user-read-playback-position",
        " user-top-read",
         " user-read-recently-played"
    ];
    window.location.href =`${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`;
  }
  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="spotify Logo"
      />
      <button onClick={handleClick}>Connect To Your Account</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;

  img {
    height: 20vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    border: none;
    background-color: black;
    color: #49f585;
    cursor: pointer;
    font-size: 1.4rem;
  }
`;
