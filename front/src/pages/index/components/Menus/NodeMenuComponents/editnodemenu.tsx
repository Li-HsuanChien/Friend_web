import React, {useContext, useState } from 'react';
import { AppContext } from '../../../../../AppContext';


const EditNodeMenu: React.FC = () =>{

  const [horoscopeState, setHoroscopeState] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [image, setImage] = useState<File>();
  const {jwt} = useContext(AppContext);

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try{
        if(gender && date && horoscopeState && jwt && image){
          console.log(gender, date, horoscopeState, jwt, image);
        }
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

          <button type="submit">Comfirm</button>
        </form>
    </>
  )
}

export default EditNodeMenu;
