import React, { useEffect } from 'react'
import styled from 'styled-components'
import CurrentTrack from './CurrentTrack'
import {useStateProvider} from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'
import PlayerControls from './PlayerControls'
export default function Footer() {
  const [{token},dispatch] = useStateProvider()
  useEffect(()=>{
          const getPlayListData = async () =>{
              const response = await axios.get('https://api.spotify.com/v1/me/playlists',{
                  headers : {
                      Authorization : 'Bearer '+token ,
                      'Content-type' : 'application/json'
                  }
              })
              console.log(response);
              //destruct the items part
              const {items} = response.data;

              const playlists = items.map(({name,id})=>{return {name,id}})
              console.log(playlists);

              //dispatching the reducer
              dispatch({type : reducerCases.SET_PLAYLISTS,playlists})
          }
          getPlayListData();
  },[token,dispatch])
  return (
    <Container>
        <CurrentTrack />
        <PlayerControls />
    </Container>
  )
}

const Container = styled.div`
    background-color: #181818;
    height: 100%;
    width: 100%;
    border-top: 1px solid #282828;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items : center;
    justify-content: center;
    padding: 0 1rem;

`