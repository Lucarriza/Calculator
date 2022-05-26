import Calculator from "./Calculator";
import React, { useState } from "react";

const Desktop = () => {
  const [expressions, setExpressions] = useState("0");
  return (
    <div>
      <Calculator expressions={expressions} setExpressions={setExpressions} />
    </div>
  );
};

export default Desktop;
