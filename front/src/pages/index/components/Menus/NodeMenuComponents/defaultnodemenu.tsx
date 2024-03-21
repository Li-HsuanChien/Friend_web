import React, {useContext } from 'react';
import { AppContext } from '../../../../../AppContext';
import { determineHoroscope } from '../../../../../lib/determineHoroscope';
import { FaFacebookSquare } from 'react-icons/fa';
import { CiInstagram } from 'react-icons/ci';
import { FaSnapchat } from 'react-icons/fa6';
import { Url } from 'url';
import { genderLookup } from '../../../../../lib/lookupfunction';
import { Gender } from '../../../../../lib/Types';

const DefaultNodeMenu: React.FC = () =>{

  const { clickeduser } = useContext(AppContext);

  return(
    <>
      <p>@{clickeduser?.username}</p>
          <img
              width="90%"
              height="90%"
              src={`http://127.0.0.1:8000/${clickeduser?.headshot as Url}`}
              alt="Headshot"
              />
          <span>Bio:</span>
          <div><p>{clickeduser?.bio}</p></div>
          <span>Gender: </span>
          <p>{genderLookup(clickeduser?.gender as Gender)}</p>
          <span>Birthday: </span>
          <p>{clickeduser?.date_of_birth}{
            determineHoroscope(clickeduser?.show_horoscope as boolean, clickeduser?.date_of_birth as string)
          }</p>
          <a href= {clickeduser?.instagram_link as string} style={{color:'#d62976'}}><CiInstagram /></a>
          <a href= {clickeduser?.facebook_link as string} style={{color:'blue'}}><FaFacebookSquare /></a>
          <a href= {clickeduser?.snapchat_link as string} style={{color:'yellow'}}><FaSnapchat /></a>
          <p>{clickeduser?.created_time}</p>
    </>
  )
}

export default DefaultNodeMenu;
