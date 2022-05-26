import React, { useState } from "react";
import Calculator from "./Calculator";

const Desktop = () => {
  const [expressions, setExpressions] = useState("0");
  return (
    <div>
      <Calculator expressions={expressions} setExpressions={setExpressions} />
    </div>
  );
};

export default Desktop;
