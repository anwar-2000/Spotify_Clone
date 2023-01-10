import React, { useEffect } from 'react'
import styled from 'styled-components'
import {AiFillClockCircle} from 'react-icons/ai'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios';
import { reducerCases } from '../utils/Constants';
export default function Body({HeaderBackground}) {
    const [{token,selectedPlaylistId,selectedPlaylist},dispatch] = useStateProvider();
    useEffect(()=>{

        const getInititalPlaylist = async ()=>{
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,{
              headers : {
                Authorization : "Bearer "+token, 
                'Content-Type' : 'application/json'
              }
            })
            console.log('the playlist resposne : ',response);

            const selectedPlaylist = {
                id : response.data.id ,
                name : response.data.name,
                description : response.data.description.startsWith("<a") ? "" : response.data.description,
                image : response.data.images[0].url,
                tracks : response.data.tracks.items.map(({track})=>(
                  {
                    id : track.id ,
                    name : track.name,
                    artists : track.artists.map((artist)=>(artist.name)),
                    image : track.album.images[2].url,
                    duration : track.duration_ms,
                    album : track.album.name,
                    context_uri : track.album.uri,
                    track_number : track.track_number
                  }
                ))
              
            }
            //console.log('the tracks : ',selectedPlaylist)
            dispatch({type :reducerCases.SET_PLAYLIST, selectedPlaylist});

        }
        getInititalPlaylist();//calling the function

    },[token,dispatch,selectedPlaylistId])

    const mstoMinutes = (ms)=>{
      const minutes  = Math.floor(ms/60000);
      const seconds = ((ms%60000)/10000).toFixed(0);

      return minutes + ":" + (seconds < 10 ?  "0" : "") + seconds ;
  }


  
  return (
    <Container HeaderBackground>
      {selectedPlaylist && 
        <>
          <div className='playlist'>
                <div className='image'>
                      <img src={selectedPlaylist.image} alt={selectedPlaylist.name} />
                </div>
                <div className='details'>
                      <span className='type'>PLAYLIST</span>
                      <h1 className='title'>{selectedPlaylist.name}</h1>
                        <p className='description'>{selectedPlaylist.description}</p>
                </div>
          </div>
          <div className='list'>
              <div className='header__row'>
                  <div className='co1'>
                      <span>#</span>
                  </div>

                  <div className='co1'>
                      <span>TITLE</span>
                  </div>

                  <div className='co1'>
                      <span>ALBUM</span>
                  </div>

                  <div className='co1'>
                      <span><AiFillClockCircle /></span>
                  </div>
              </div>
              <div className='tracks'>
                    {selectedPlaylist.tracks.map(({id,name,image,duration,artists,album,context_uri,track_number},index)=>{
                      return (
                        <div className='row' key={id}>
                              <div className='col'>
                                  <span>{index+1}</span>   </div>
                                  <div className='col'>
                                  <div className='col detail'>
                                        <img src={image} alt='track' />  
                                  </div>
                                  <div className='info'>
                                        <span className='name'>{name}</span>
                                        <span>{artists}</span>
                                  </div>
                              </div>
                              <div className='col'>
                                  <span>{album}</span>
                              </div>
                              <div className='col'>
                                  <span>{  mstoMinutes(duration) }</span>
                              </div>
                        </div>

                      )
                    })}
              </div>
          </div>
          </>
      }
    </Container>
  )
}

const Container = styled.div`
    .playlist{
      margin: 0rem 2rem ;
      display: flex;
      align-items: center;
      gap: 2rem;
      .image{
          img {
            height: 15rem;
            box-shadow: rgba(0,0,0,0.25) 0px 25px 50px -12px;
          }
      }
    }
    .details{
      display: flex;
      flex-direction: column;
      gap : 1rem;
      color : #e0dede;
    }
    .title{
      color : white;
      font-size: 4rem;
    }

    .list {
        .header__row {
          display: grid;
          grid-template-columns: 0.3fr 3fr 1.9fr 0.1fr;
          color : #dddcdc;
          margin: 1rem 0 0 0 ;
          position: sticky;
          padding : 1rem 3rem;
          top: 15vh;
          transition: 0.3s ease-in-out;
          /*background-color: ${({HeaderBackground}) => HeaderBackground ? "#000000dc" : "none"} ;*/
          background-color: "none";
        }

        .tracks {
          margin: 0 2rem;
          display: flex;
          flex-direction: column;
          margin-bottom: 5rem;
          .row{
            padding : 0.5rem 1rem;
            display: grid;
            grid-template-columns: 0.3fr 3.1fr 1.8fr 0.1fr;
            &:hover{
              background-color: rgba(0,0,0,0.7);
            }
              .col{
                display: flex;
                align-items: center;
                color: #dddcdc;
                img{
                  height: 40px;
                }
              }
              .detail {
                display: flex;
                gap : 1rem;
                .info{
                  display: flex;
                  flex-direction: column;
                }
              }
          } 
        }
    }
`
