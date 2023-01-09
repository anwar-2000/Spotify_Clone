import axios from 'axios'
import React, { useEffect } from 'react'
import { reducerCases } from '../utils/Constants'
import { useStateProvider } from '../utils/StateProvider'

export default function CurrentTrack() {
  const [{token},dispatch] = useStateProvider()
  useEffect(()=>{
          const getPlayListData = async () =>{
              const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing',{
                  headers : {
                      Authorization : 'Bearer '+token ,
                      'Content-type' : 'application/json'
                  }
              })
              console.log(response);
              

              //dispatching the reducer
              //dispatch({type : reducerCases.SET_PLAYLISTS,playlists})
          }
          getPlayListData();
  },[token,dispatch])
  return (
    <div>currentTrack</div>
  )
}
