import React , { useState, Dispatch, useContext } from 'react';
import styled from 'styled-components';
import { searchUser } from '../../../../../lib/searchUser'
import { SearchedUser } from '../../../../../lib/Types';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { AppContext } from '../../../../../AppContext';
import { ChangeEvent } from 'react';
import { connect } from 'http2';

const Close = styled.div`
  position: absolute;
  top: 2%;
  right: 2%;
`;
const SearchBar = styled.div`
  position: absolute;
  top: 2%;
`;
const QueryItems = styled.div`
  width: 95%;
  height: 10%;
  background-color: white;
`

const ConnectFeature: React.FC<{setChild:Dispatch<boolean>}>  = ( {setChild} ) =>{
  const { jwt } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState<SearchedUser[]>([]);
  const [search, setSearch] = useState<string>('')

  const handleSubmit = (e:any) =>{
    e.preventDefault();
    searchUser(search, jwt as string)
    .then((result) => setSearchQuery(result));
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
      {searchQuery.forEach((item) => {
      <QueryItems>
        <div>{item.username}</div>
        <div>{item.username}</div>
        <div>{item.username}</div>
        <button>connect</button>
      </QueryItems>
      })}
      <Close><IoIosCloseCircleOutline onClick={()=>setChild(false)} /></Close>
    </>
  )
}


export default ConnectFeature;
