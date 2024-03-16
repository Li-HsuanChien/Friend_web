import React, {useContext, useState, Dispatch } from 'react';
import { UserUpdate } from '../../../../../lib/UserDataFunctions';
import { AppContext } from '../../../../../AppContext';

const EditNodeMenu: React.FC<{setEditState: Dispatch<boolean>, editState: boolean}> = ({setEditState, editState}) =>{
  const {jwt, clickeduser} = useContext(AppContext);
  const [bio, setBio] = useState<string>();
  const [horoscopeState, setHoroscopeState] = useState<boolean>(false);
  const [date, setDate] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [facebook, setFacebook] = useState<string>();
  const [snapchat, setSnapchat] = useState<string>();
  const [instagram, setInstagram] = useState<string>();
  const [image, setImage] = useState<File>();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setEditState(!editState);
    try{
      UserUpdate(jwt as string, bio, gender, date, horoscopeState, instagram, facebook, snapchat, image)
      .then((result) => console.log(result));
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
        <form onSubmit={handleSubmit}>
          <h3>Edit</h3>

          <label htmlFor="bio">Bio</label>
          <input
            type="text"
            placeholder="Bio....."
            id="bio"
            onChange={(e) => setBio(e.target.value)} />

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
          <select id="Gender" name="Gender" onChange={(e)=>setGender(e.target.value)}>
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
            onChange={(e) => setFacebook(e.target.value)} />

          <label htmlFor="snapchat_link">Snapchat Link</label>
          <input
            type="url"
            placeholder="snapchat link"
            id="snapchat_link"
            onChange={(e) => setSnapchat(e.target.value)} />

          <label htmlFor="instagram_link">Instagram Link</label>
          <input
            type="url"
            placeholder="instagram link"
            id="instagram_link"
            onChange={(e) => setInstagram(e.target.value)} />

          <button type="submit" >Confirm</button>
        </form>
    </>
  )
}

export default EditNodeMenu;
