import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Workspace from './components/workspace';
import Menu from './components/menu';

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <h1>Friend web</h1>
        <Menu/>
      </nav>
      <Workspace/>
      
    </>
    
  );
}

export default App;
