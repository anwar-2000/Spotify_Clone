import axios from 'axios'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { reducerCases } from '../utils/Constants'
import { useStateProvider } from '../utils/StateProvider'

export default function CurrentTrack() {
  const [{token,currentTrack},dispatch] = useStateProvider()
  useEffect(()=>{
          const getPlayListData = async () =>{
              const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing',{
                  headers : {
                      Authorization : 'Bearer '+token ,
                      'Content-type' : 'application/json'
                  }
              })
              console.log(response);
              if(response.data !==""){
                    const {item}=response.data;
                    const currentTrack = {
                          id : item.id,
                          name : item.name,
                          artist : item.artists.map((artist)=> artist.name),
                          image : item.album.images[2].url
                    }
                    //dispatching the reducer
              dispatch({type : reducerCases.SET_PLAYING,currentTrack})
              }

              
          }
          getPlayListData();
  },[token,dispatch])
  return (
    <Container>
        {currentTrack && <div className='track'>
                <div className='track__image'>
                    <img src={currentTrack.image} alt='' />
                </div>
                <div className='track__info'>
                      <h4>{currentTrack.name}</h4>
                      <h6>{currentTrack.artist.join(", ")}</h6>
                </div>
        </div>}
    </Container>
  )
}
const Container = styled.div`
      .track {
        display: flex;
        align-items: center;
        gap:1rem;
        &__info {
          display: flex;
          flex-direction:column;
          
          h4{
            color: white; 
          }
          h6{
            color: #b3b3b3;
          }
        }
      }
`