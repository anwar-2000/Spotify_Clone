import axios from "axios";
import React from "react";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
export default function PlayerControls() {
  const [{ token, player_state }, dispatch] = useStateProvider();

  //controls
  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
            "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      }
    );
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-type": "application/json",
        },
      }
    );
    //console.log(response);
    if (response.data !== "") {
      const { item } = response.data;
      const currentTrack = {
        id: item.id,
        name: item.name,
        artist: item.artists.map((artist) => artist.name),
        image: item.album.images[2].url,
      };
      //dispatching the reducer
      dispatch({ type: reducerCases.SET_PLAYING, currentTrack });
    } else {
      dispatch({ type: reducerCases.SET_PLAYING, currentTrack: null });
    }
  };
  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous">
        <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
      </div>
      <div className="state">
        {player_state ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />}
      </div>
      <div className="next">
        <CgPlayTrackNext onClick={() => changeTrack("next")} />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .state,
  .next,
  .previous {
    font-size: 2rem;
  }
`;
