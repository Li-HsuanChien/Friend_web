import React , { useState, Dispatch } from 'react';
import styled from 'styled-components';
import { searchUser } from '../../../../../lib/searchUser'
import { ConnectionCreate } from '../../../../../lib/ConnectionFunctions';
import { SearchedUser } from '../../../../../lib/Types';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useToken } from '../../../../../lib/hooks/useToken';
import { ChangeEvent } from 'react';

const Close = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;
`;
const SearchBar = styled.div`
  position: absolute;
  top: 2%;
`;
const Query = styled.div`
  position: absolute;
  top: 10%;
  height: 88%;
  width: 95%;
  overflow: auto;
`
const QueryItems = styled.div`
  width: 100%;
  height: 10%;
  background-color: white;
  display: flex;
  justify-content: space-between;
`

const ConnectSearchFeature: React.FC<{setChild:Dispatch<boolean>}>  = ( {setChild} ) =>{
  const [jwt] = useToken();
  const [searchQuery, setSearchQuery] = useState<SearchedUser[]>([]);
  const [search, setSearch] = useState<string>('')

  const handleSubmit = (e:any) =>{
    e.preventDefault();
    searchUser(search, jwt as string)
    .then((result) => setSearchQuery(result));
  }

  const  submitConnectRequest = (invitee_id: string)=>{
    ConnectionCreate(jwt as string, invitee_id)
    .then(result=> console.log(result));
    //User Visual
  }

  return(
    <>
      <SearchBar>
        <form onSubmit={handleSubmit} role="search">
          {/* <label htmlFor="search">Search for stuff</label> */}
          <input
            id="search"
            type="search"
            placeholder="Search..."
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearch(e.target.value);
            }}
            autoFocus
            required />
          <button type="submit">Go</button>
        </form>
      </SearchBar>
      <Close><IoIosCloseCircleOutline onClick={()=>setChild(false)} /></Close>
      <Query>
        {searchQuery ? searchQuery.map((item) => (
          <QueryItems key={item.username_id}>
            <img
              src={`http://127.0.0.1:8000/${item.headshot}`}
              alt={item.username}
              style={{ height: '100%' }}
            />
            <div>{item.username}</div>
            <button onClick={() => submitConnectRequest(item.username_id)}>connect</button>
          </QueryItems>
        )) : <p>No items</p>}
      </Query>
    </>
  )
}


export default ConnectSearchFeature;
