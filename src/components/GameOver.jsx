import React, { useEffect, useRef } from "react";
import RegularButton from "./RegularButton";

const GameOver = ({ handleClick }) => {
  const divRef=useRef(null);
  
    useEffect(()=>{
      divRef.current.focus()
    },[])
    
  return (
    <div ref={divRef} tabIndex={-1} className="wrapper wrapper--accent">
      <p className="p--large">You've matched all the memory cards!</p>
      <RegularButton handleClick={handleClick}>Play again</RegularButton>
    </div>
  );
};

export default GameOver;
