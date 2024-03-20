import React, {Dispatch} from "react";
import styled from "styled-components";

const ModalStyle = styled.div`
  position: fixed; 
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100vw; 
  height: 100vh;
  overflow: auto; 
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4);

div{
  background-color: #fefefe;
  margin: 15% auto; 
  padding: 20px;
  border: 1px solid #888;
  width: 80%; 
  }
}


`

const ComfirmationModal: React.FC<{func: () => void,
                                   setState:Dispatch<boolean>,
                                   details?: string}> =
                                   ({func, setState, details}) => {

                                    return(
                                      <ModalStyle>
                                        <div>
                                          <p>{details}</p>
                                          <button onClick={() => func()}>Yes</button>
                                          <button onClick={() => setState(false)}>No</button>
                                        </div>
                                      </ModalStyle>
                                    )
                                   }


export default ComfirmationModal;
