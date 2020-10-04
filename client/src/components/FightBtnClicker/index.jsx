import React, { useState } from "react";
import { MDBBtn } from "mdbreact";

function Counter() {
  const [count, setCount] = useState(0);
  console.log({ count });

  function handleIncrement() {
    setCount(count + 1);
  }

  return (
    <>
      <MDBBtn color="secondary" onClick={handleIncrement}>
        Click Me
      </MDBBtn>
      <p>{count}</p>
    </>
  );
}

export default Counter;
