import React , { useState } from 'react';
import styled from 'styled-components';
import ConnectSearchFeature from './MainMenuFeatures/connectsearch';
import ConnectPendingFeature from './MainMenuFeatures/connectpending';
import Logout from './MainMenuFeatures/logout';

const MenuStyle = styled.div`
  background-color: grey;
  position: absolute;
  border-radius: 5%;
  width: 20vw;
  height: 95vh;
  right: 2vw;
  top: 2vh;
  padding: 0 2% 0;
  display: flex;
  gap: 1%;
  flex-direction: column;
  align-items: center;
`
const ItemStyle = styled.div`
  background-color: white;
  width: 96%;
  height: 3%;
  margin-top: 5%;
  align-items: center;
  text-align: center;
  border-radius: 5%;
`;

const MainMenu = () => {
  const [connectSearchState, setConnectSearchState] = useState(false);
  const [connectionPendingState, setConnectionPendingState] = useState(false);
  const [logoutState, setLogoutState] = useState(false);
  const [feature2State, setFeature2State] = useState(false);
  const [feature3State, setFeature3State] = useState(false);
  // Add more feature states as needed

  let componentToRender;

  switch (true) {
    case connectSearchState:
      componentToRender = <ConnectSearchFeature setChild={setConnectSearchState} />;
      break;
    case connectionPendingState:
      componentToRender = <ConnectPendingFeature setChild={setConnectionPendingState} />;
      break;
    case logoutState:
      componentToRender = <Logout setChild={setLogoutState}/>;
    break;
    // case feature2State:
    //   componentToRender = <Feature2 />;
    //   break;
    default:
      componentToRender = (
        <>
          <ItemStyle>
            <button onClick={() => setConnectSearchState(!connectSearchState)}>Connect</button>
          </ItemStyle>
          <ItemStyle>
            <button onClick={() => setConnectionPendingState(!connectionPendingState)}>Pending Connection</button>
          </ItemStyle>
          <ItemStyle>
            <button onClick={() => setLogoutState(!logoutState)}>Logout</button>
          </ItemStyle>
          <ItemStyle>
            <button onClick={() => setFeature2State(!feature2State)}>Feature 2</button>
          </ItemStyle>
          <ItemStyle>
            <button onClick={() => setFeature3State(!feature3State)}>Feature 3</button>
          </ItemStyle>
          <ItemStyle>
            Share Website!
            {/* copy clipboard url */}
          </ItemStyle>
        </>
      );
  }

  return (
    <>
      <MenuStyle>
        {componentToRender}
      </MenuStyle>
    </>
  );
};

export default MainMenu;
