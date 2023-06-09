import React, { useRef, useState } from "react";

let countrender = 0;
function UseRefExample() {
  const [inputData, setInputData] = useState("");
  let refData = useRef("");
  countrender++;
  console.log("refData", countrender);
  return (
    <div>
      <input onChange={(e) => (refData.current = e.target.value)} />
      {refData?.current}

      <button
        onClick={() => {
          console.log(refData?.current);
        }}
      >
        get value
      </button>
    </div>
  );
}

export default UseRefExample;
