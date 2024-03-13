import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../../AppContext';
import { FaFacebookSquare } from 'react-icons/fa';
import { CiInstagram } from 'react-icons/ci';
import { FaSnapchat } from 'react-icons/fa6';
import { determineHoroscope } from '../../../../lib/determineHoroscope'

// interface SuccessUserData {
//   username: string;
//   bio: string | null;
//   headshot: Url | null;
//   gender: Gender;
//   date_of_birth: string;
//   show_horoscope: boolean;
//   instagram_link: Url | null;
//   facebook_link: Url | null;
//   snapchat_link: Url | null;
//   inviteurl: Url;
//   created_time: string;
// }

const MenuStyle = styled.div`
  background-color: grey;
  position: absolute;
  border-radius: 5%;
  width: 20vw;
  height: 95vh;
  right: 2vw;
  top: 2vh;
  padding: 0 2% 0;
  img{
    width: 100%;
    max-height: 30%;
    height: auto;
    object-fit: contain;
    }
  div{
    height: 20%;
    background-color: white;
  }
  p{
    background-color: white;
  }
  a{
    color: black;
  }
`
const NodeMenu = () =>{
  const { clickeduser, current_user_id } = useContext(AppContext);
  const [editState, setEditState] = useState<boolean>(false);

  return(
    <>
      <MenuStyle>
        <p>@{clickeduser?.username}</p>
        <img
            width="90%"
            height="90%"
            src={`http://127.0.0.1:8000/${clickeduser?.headshot}`}
            alt="Headshot"
            />
        <span>Bio:</span>
        <div><p>{clickeduser?.bio}</p></div>
        <span>Gender: </span>
        <p>{clickeduser?.gender}</p>
        <span>Birthday: </span>
        <p>{clickeduser?.date_of_birth}{
          determineHoroscope(clickeduser?.show_horoscope as boolean, clickeduser?.date_of_birth as string)
        }</p>
        <a href= {clickeduser?.instagram_link as string} style={{color:'#d62976'}}><CiInstagram /></a>
        <a href= {clickeduser?.facebook_link as string} style={{color:'blue'}}><FaFacebookSquare /></a>
        <a href= {clickeduser?.snapchat_link as string} style={{color:'yellow'}}><FaSnapchat /></a>
        <p>{clickeduser?.created_time}</p>
        {clickeduser?.username_id===current_user_id
          ? <button onClick={()=>setEditState(!editState)}>edit</button>
          : ''}
      </MenuStyle>

    </>
  )
}


export default NodeMenu;
