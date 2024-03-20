import React, {useContext, useState, Dispatch } from 'react';
import { UserUpdate } from '../../../../../lib/UserDataFunctions';
import { useToken } from '../../../../../lib/hooks/useToken';
import { AppContext } from '../../../../../AppContext';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import ComfirmationModal from '../../../../../lib/modal';
import styled from 'styled-components';
//TBD add bio
const EditStyle = styled.div`

  background-color: grey;
  position: absolute;
  border-radius: 5%;
  width: 20vw;
  height: 95vh;
  right: 2vw;
  top: 2vh;
  padding: 0 2% 0;
  

  form {
    height: 90%;
    width: 95%;
  }

  form * {
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }

  form h3 {
    text-align: center;
  }

  form p {
    text-align: center;
  }

  label {
    display: block;
    color: black;
    margin-top: 5%
  }

  input {
    display: block;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
  }

  textarea{
    display: block;
    background-color: rgba(255, 255, 255, 0.07);
    resize: none;
    height: 150px;
    width: 100%;
  }

 
  input[type='checkbox'] {
    display: inline-block;
    width: 10%
  }
  
  input[type='date'] {
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    font-size: 14px;
    font-weight: 300;
  }

  input[type='file'] {
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0px;
    font-size: 1em;
    font-weight: 300;
  }

  input::file-selector-button {
    font-family: 'Poppins', sans-serif;
    border: thin solid grey;
    border-radius: 3px;
  }

  form select{
    display: block;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
  }

  form select option{
    background-color: rgba(255, 255, 255, 0.07);
    color: black;
  }

  ::placeholder {
    color: #e5e5e5;
  }

  button{
    position: absolute;
    bottom: 10%;
    width: 80%;
    background-color: #ffffff;
    color: #080710;
    cursor: pointer;
  }
`
const Close = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;
`;

const EditNodeMenu: React.FC<{setEditState: Dispatch<boolean>, editState: boolean}> = ({setEditState, editState}) =>{
  const { clickeduser } = useContext(AppContext);
  const [confirmState, setConfirmState] = useState<boolean>(false);
  const [jwt] = useToken();
  const [bio, setBio] = useState<string>(clickeduser?.bio as string);
  const [horoscopeState, setHoroscopeState] = useState<boolean>(clickeduser?.show_horoscope ? clickeduser.show_horoscope: false);
  const [date, setDate] = useState<string>(clickeduser?.date_of_birth as string);
  const [gender, setGender] = useState<string>();
  const [facebook, setFacebook] = useState<string>(clickeduser?.facebook_link as string);
  const [snapchat, setSnapchat] = useState<string>(clickeduser?.snapchat_link as string);
  const [instagram, setInstagram] = useState<string>(clickeduser?.instagram_link as string);
  const [image, setImage] = useState<File>();

  const handleSubmit = async() =>{
    setEditState(!editState);
    try{
      if(bio || gender || date || horoscopeState || instagram || facebook || snapchat || image){
        UserUpdate(jwt as string, bio, gender, date, horoscopeState, instagram, facebook, snapchat, image)
        .then((result) => console.log(result));
      }
      //TBD visuals
    } catch(error)  {
      console.error(error)
      return;
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const selectedFile = e.target.files[0];
          setImage(selectedFile);
        }
      };

  return (
    <>
      <EditStyle>
        <Close><IoIosCloseCircleOutline onClick={()=>setEditState(false)} /></Close>
          <form>
            <h3>Edit</h3>

            <label htmlFor="bio">Bio</label>
            <textarea
              placeholder="Bio....."
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={150}
            />

            <label htmlFor='Image'>headshoot</label>
            <input
              type='file'
              id='Image'
              name='Image_url'
              accept="image/jpeg,image/png,image/gif"
              onChange={(e) => {
                handleImageChange(e);
              }}/>

            <label htmlFor="Gender">Gender</label>
            <select id="Gender" name="Gender" onChange={(e)=>setGender(e.target.value)} value={clickeduser?.gender}>
              <option value="M">Cis Gender Male</option>
              <option value="F">Cis Gender Female</option>
              <option value="N">NonBinary</option>
              <option value="NA">Prefer Not To Say</option>
            </select>

            <label htmlFor="Date_of_birth">Birthday</label>
            <input
              type="date"
              placeholder="Birthday"
              id="Date_of_birth"
              value={date}
              onChange={(e) => setDate(e.target.value)} />

            <div id="Show_horoscope_div">
              <label htmlFor="Show_horoscope">
                Show Horoscope?
                <input
                  type="checkbox"
                  checked={horoscopeState}
                  onChange={() => setHoroscopeState(!horoscopeState)}
                  id="Show_horoscope"
                  name="Show_horoscope"/>
              </label>
            </div>

            <label htmlFor="facebook_link">Facebook Link</label>
            <input
              type="url"
              placeholder="facebook link"
              id="facebook_link"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)} />

            <label htmlFor="snapchat_link">Snapchat Link</label>
            <input
              type="url"
              placeholder="snapchat link"
              id="snapchat_link"
              value={snapchat}
              onChange={(e) => setSnapchat(e.target.value)} />

            <label htmlFor="instagram_link">Instagram Link</label>
            <input
              type="url"
              placeholder="instagram link"
              id="instagram_link"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)} />

            <button type="button" onClick={() => setConfirmState(!confirmState)} >confirm</button>
          </form>
      </EditStyle>
      {confirmState && <ComfirmationModal func={handleSubmit}setState={setConfirmState} details='Are you sure?'></ComfirmationModal>}
    </>
  )
}

export default EditNodeMenu;
