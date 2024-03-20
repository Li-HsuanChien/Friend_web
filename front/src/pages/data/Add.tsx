/* eslint-disable node/no-unpublished-import */
import React, {useState, useContext} from 'react';
import {styled} from 'styled-components';
import { AppContext } from '../../AppContext';
import { useNavigate } from 'react-router-dom';
import { UserCreate } from '../../lib/UserDataFunctions';
import { useToken } from '../../lib/hooks/useToken';
import { useRefreshToken } from '../../lib/hooks/useRefreshToken';

const AddPageStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #080710;

  .background {
    width: 500px;
    height: 600px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }

  .background .shape {
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
  }

  .shape:first-child {
    background: linear-gradient(#dfe1e4,
            #b7b7b8);
    left: -80px;
    top: -80px;
  }

  .shape:last-child {
    background: linear-gradient(to right,
            #dfe1e4,
            #b7b7b8);
    right: -30px;
    bottom: -80px;
  }

  form {
    height: 540px;
    width: 400px;
    background-color: rgba(255, 255, 255, 0.13);
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
    padding: 50px 35px;
  }

  form * {
    font-family: 'Poppins', sans-serif;
    color: #ffffff;
    letter-spacing: 0.5px;
    outline: none;
    border: none;
  }

  form h3 {
    font-size: 32px;
    font-weight: 500;
    line-height: 42px;
    text-align: center;
  }

  form a {
    text-align: center;
  }

  form select{
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
  }

  select option {
    background-color: #2d2d2d; 
  }

  label {
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }

  input[type='checkbox'] {
    display: inline-block;
    margin-right: 30px;
    width: 18px; 
    height: 18px; 
  }

  input[type='date'] {
    height: 50px;
    width: 95%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
  }

  input[type='file'] {
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0px;
    margin-top: 8px;
    font-size: 22px;
    font-weight: 300;
    vertical-align : middle;
    
  }

  input::file-selector-button {
    font-family: 'Poppins', sans-serif;
    padding: 0.5em;
    border: thin solid grey;
    border-radius: 3px;
  }

  input {
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.07);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
  }

  ::placeholder {
    color: #e5e5e5;
  }

  button {
    margin-top: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }
}`;


// TBD add ping in every page! to check user!

const Add = () => {
  const navigate = useNavigate();
  const [horoscopeState, setHoroscopeState] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [image, setImage] = useState<File>();
  const [jwt, setToken] = useToken();
  const [,setRefreshToken] = useRefreshToken();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    try{
        if(gender && date && horoscopeState && jwt){
          const token = await UserCreate(gender, date, horoscopeState, jwt, image);
          setRefreshToken(token.refresh);
          setToken(token.access);
          navigate('/');
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
      <AddPageStyle>
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <form onSubmit={handleSubmit}>
          <h3>Who are you?</h3>

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

          <button type="submit">Confirm</button>
        </form>
      </AddPageStyle>
    </>
  );
};

export default Add;
