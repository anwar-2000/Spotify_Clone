import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import SideBar from './SideBar'
import Body from './Body'
import Navbar from './Navbar'
import Footer from './Footer'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/Constants'

export default function Spotify() {
    const bodyRef = useRef();
    const [navBackground,setNavBackground] = useState(false);
    const [HeaderBackground,setHeaderBackground] = useState(false);
      const bodyScrolled = ()=>{
        bodyRef.current.scrollTop >= 30 ? setNavBackground(true) : setNavBackground(false);
        bodyRef.current.scrollTop >= 268 ? setHeaderBackground(true) : setHeaderBackground(false);
      }
  const [{token},dispatch] = useStateProvider();

    useEffect(()=>{
        const getUserInfos = async ()=>{
            const {data} = await axios.get("https://api.spotify.com/v1/me",{
                headers : {
                  Authorization : "Bearer "+token ,
                  'Content-Type' : 'application/json'

                }
            });
          
            console.log({data})
            const userInfo = {
              userId : data.id,
              userName : data.display_name
          }
          console.log('userinfos',userInfo);
          dispatch({type : reducerCases.SET_USER , userInfo});
        };
        getUserInfos();
    },[token,dispatch])
  return (
    <Container>
        <div className='spotify__body'>
            <SideBar />
            <div className='body' ref={bodyRef} onScroll={bodyScrolled}>
                   <Navbar navBackground={navBackground} />
            <div className='body__contents'>
                      <Body HeaderBackground={HeaderBackground} onScroll={bodyScrolled} />
                   </div>
            </div>
        </div>
        <div className='spotify__footer'>
              <Footer />
        </div>
    </Container>
  )
}

const Container = styled.div`
      max-width: 100vw;
      max-height:  100vh;
      overflow: hidden;
      display: grid;
      grid-template-rows: 85vh 15vh ;
        .spotify__body{
          display: grid;
          grid-template-columns: 15vw 85vw;
          height: 100%;width: 100%;
          background: linear-gradient(transparent,rgba(0,0,0,1));
          background-color: rgb(37,87,100);
        }
        .body{
          height: 100%;
          width: 100%;overflow:auto;
           //scrollbar theme
           &::-webkit-scrollbar {
                width: 0.7rem;
                &-thumb {
                    background-color: rgba(255,255,255,0.6);
                }
            } 
          
        }
`
