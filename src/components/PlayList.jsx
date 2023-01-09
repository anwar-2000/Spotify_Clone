import { type } from '@testing-library/user-event/dist/type'
import axios from 'axios'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { reducerCases } from '../utils/Constants'
import {useStateProvider} from '../utils/StateProvider'



export default function PlayList() {
    const [{token , playlists },dispatch] = useStateProvider()
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
            <ul>
                    { playlists.length === 0 ? <li>No playlist Found</li> :
                        playlists.map((playlist) =>{
                            return (
                                <li key={playlist.id}>{playlist.name}</li>
                            )
                        })
                    }
            </ul>
    </Container>
  )
}

const Container = styled.div`
    height: 100px;
    overflow: hidden;
        ul{
          list-style-type: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
          overflow-y: scroll;
          height: 55vh;
          max-height: 100%;

          //scrollbar theme
            &::-webkit-scrollbar {
                width: 0.7rem;
                &-thumb {
                    background-color: rgba(255,255,255,0.6);
                }
            }
          li{
            display: flex;
            gap : 1rem;
            cursor: pointer;
            transition: 0.3s ease-in-out;

            &:hover {
              color: white;
            }
          }
        }
`