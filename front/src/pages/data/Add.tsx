import React, { useState } from 'react';
import './index.css'


const Add = () => {

	const [horoscopeState, setHoroscopeState] = useState(false)


	return (
		<>
			<div className="background">
				<div className="shape"></div>
				<div className="shape"></div>
			</div>


			<form>
				<h3>Who are you?</h3>

				<label htmlFor="Bio">Bio</label>
				<textarea name="Bio" placeholder="Bio" id="Bio">
					Sample Bio
				</textarea>

				<label htmlFor="Headshoot">headshoot</label>
				<input type="file" id="Headshoot" name='Headshoot' />


				<label htmlFor="Gender">Gender</label>
				<select id="Gender" name="Gender">
					<option value="M">Cis Gender Male</option>
					<option value="F">Cis Gender Female</option>
					<option value="N">NonBinary</option>
					<option value="NA">Prefer Not To Say</option>
				</select>



				<label htmlFor="Date_of_birth">Birthday</label>
				<input type="date" placeholder="Birthday" id="Date_of_birth" />

				<label htmlFor="Show_horoscope">Password</label>
				<input type="checkbox" 
					   checked={horoscopeState}  
					   onChange = {() => {setHoroscopeState(!horoscopeState)}}  
					   id="Show_horoscope"/>

				<label htmlFor="Instagram_link">Instagram</label>
				<input type="url" placeholder="https://www.instagram.com/friend_web" id="Instagram_link" />

				<label htmlFor="Facebook_link">Instagram</label>
				<input type="url" placeholder="https://www.facebook.com/friend_web" id="Facebook_link" />

				<label htmlFor="Instagram_link">Instagram</label>
				<input type="url" placeholder="https://www.instagram.com/friend_web" id="Instagram_link" />


				<button>This is me...</button>


				<a href='https://google.com'>Forgot password?</a>
			</form>
		</>

	);
}

export default Add;






