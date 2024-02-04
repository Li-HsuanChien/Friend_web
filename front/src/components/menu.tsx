import React from 'react';

import { IoIosMenu } from "react-icons/io";

const Menu = (): any =>{


    
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <h1 className="navbar-brand" >Friend Web</h1>

                    
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-text ms-auto">
                        <IoIosMenu />
                        </div>
                    </div>
                </div>
            </nav>

        </>    
    )
    
}

export default Menu