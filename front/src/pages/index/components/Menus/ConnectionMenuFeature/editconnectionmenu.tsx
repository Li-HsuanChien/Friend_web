import React, {useContext, useState, Dispatch } from 'react';
import { ConnectionUpdate } from '../../../../../lib/ConnectionFunctions';
import { useToken } from '../../../../../lib/hooks/useToken';
import { AppContext } from '../../../../../AppContext';
import { Closeness } from '../../../../../lib/Types';

const EditConnectionMenu: React.FC<{setEditState: Dispatch<boolean>, editState: boolean}> = ({setEditState, editState}) =>{
  const { clickedconnection } = useContext(AppContext);
  const [jwt] = useToken();
  const [closeness, setCloseness] = useState<Closeness>();
  const [nickname, setNickname] = useState<string>();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setEditState(!editState);
    try{
      if(closeness || nickname){
        ConnectionUpdate(clickedconnection?.id as string, jwt as string, closeness, nickname)
        .then((result) => console.log(result));
      }
      //TBD visuals
    } catch(error)  {
      console.error(error)
      return;
    }
  }

  return (
    <>
        <form onSubmit={handleSubmit}>
          <h3>Edit</h3>

          <label htmlFor="nickname">NickName of your friend</label>
          <input
            type="text"
            placeholder="Pookie fear"
            id="nickname"
            onChange={(e) => setNickname(e.target.value)} />

          <input type="radio" id="friend" name="closeness" value="friend" onClick={() => setCloseness('friend')}/>
          <label htmlFor="friend">friend</label>

          <input type="radio" id="close_friend" name="closeness" value="closefriend" onClick={() => setCloseness('closefriend')}/>
          <label htmlFor="close_friend">close friend</label>

          <input type="radio" id="best_friend" name="closeness" value="bestfriend" onClick={() => setCloseness('bestfriend')}/>
          <label htmlFor="best_friend">Best Friend!</label>


          <button type="submit" >Confirm</button>
        </form>
    </>
  )
}

export default EditConnectionMenu;
