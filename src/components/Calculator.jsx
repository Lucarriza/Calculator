import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

/* Easter eggs */
import axios from "axios";

const Calculator = ({ expressions, setExpressions }) => {
  /* Easter eggs */
  const [isSatan, setIsSatan] = useState(false);
  const [isSun, setIsSun] = useState(false);
  const [isJokes, setIsJokes] = useState(false);
  const [jokes, setJokes] = useState("");

  useEffect(() => {
    const jokeApi = "https://v2.jokeapi.dev/joke/Programming?type=single";
    axios
      .get(jokeApi)
      .then((res) => res.data)
      .then((data) => setJokes(data))
      .catch((error) => console.log(error));
  }, [isJokes]);

  const operators = ["+", "-", "/", "*"];

  const indexStar = (star) => {
    return star === "*";
  };

  const indexSlash = (slash) => {
    return slash === "/";
  };

  /* Function which handle the sign buttons, the sign will be added 
  uniquely if the last element in the screen is not a sign. */
  const handleSign = (value) => {
    isJokes && (setIsJokes(false), setExpressions(value));
    if (!operators.includes(expressions[expressions.length - 1])) {
      setExpressions((expressions += value));
    }
  };

  /* Function which handle the number buttons, the number will replace 
  the 0 of the begining for the first one, then, it will add each number 
  after others. */
  const handleNumber = (value) => {
    if (expressions.split("").length === 1 && expressions === "0") {
      setExpressions((expressions = value));
    } else {
      setExpressions((expressions += value));
    }
    isJokes && (setIsJokes(false), setExpressions(value));
  };

  /* Function which allows to seperate integers and signs values, 
    it returns the expressions as an new array. */
  const expressionToSeparated = () => {
    expressions = expressions.split("");
    const seperatedExpressions = [[]];
    let count = 0;
    for (let i = 0; i < expressions.length; i += 1) {
      if (!operators.includes(expressions[i])) {
        seperatedExpressions[count] += expressions[i];
      } else {
        count += 1;
        seperatedExpressions[count] = expressions[i];
        seperatedExpressions[count + 1] = [];
        count += 1;
      }
    }
    return seperatedExpressions;
  };

  /* Main function: this will first check if the converted expressions includes * or / 
  (for resolving multiplications and divisions first) then it will resolve additions 
  and substractions. */
  const handleResolve = () => {
    const seperatedExpressions = expressionToSeparated();
    let result = 0;

    /* While loop, it will always search if the expression includes * and / signs. */
    while (
      seperatedExpressions.includes("*") ||
      seperatedExpressions.includes("/")
    ) {
      /* Condition which checks the index of the * and / signs, it will treat first the lowest one
      (from left to right). "indexOf(something)=>-1" means that 'something' doesn't exist. */
      seperatedExpressions.indexOf("/") !== -1 &&
      seperatedExpressions.indexOf("*") !== -1
        ? seperatedExpressions.indexOf("*") < seperatedExpressions.indexOf("/")
          ? seperatedExpressions.splice(
              seperatedExpressions.findIndex(indexStar) - 1,
              3,
              `${
                seperatedExpressions[
                  seperatedExpressions.findIndex(indexStar) - 1
                ] *
                seperatedExpressions[
                  seperatedExpressions.findIndex(indexStar) + 1
                ]
              }`
            )
          : seperatedExpressions.splice(
              seperatedExpressions.findIndex(indexStar) - 1,
              3,
              `${
                seperatedExpressions[
                  seperatedExpressions.findIndex(indexStar) - 1
                ] /
                seperatedExpressions[
                  seperatedExpressions.findIndex(indexStar) + 1
                ]
              }`
            )
        : seperatedExpressions.indexOf("*") !== -1
        ? seperatedExpressions.length === 3
          ? ((result =
              seperatedExpressions[
                seperatedExpressions.findIndex(indexStar) - 1
              ] *
              seperatedExpressions[
                seperatedExpressions.findIndex(indexStar) + 1
              ]),
            seperatedExpressions.splice(
              0,
              3,
              `${
                seperatedExpressions[
                  seperatedExpressions.findIndex(indexStar) - 1
                ] *
                seperatedExpressions[
                  seperatedExpressions.findIndex(indexStar) + 1
                ]
              }`
            ))
          : seperatedExpressions.splice(
              seperatedExpressions.findIndex(indexStar) - 1,
              3,
              `${
                seperatedExpressions[
                  seperatedExpressions.findIndex(indexStar) - 1
                ] *
                seperatedExpressions[
                  seperatedExpressions.findIndex(indexStar) + 1
                ]
              }`
            )
        : seperatedExpressions.length === 3
        ? ((result =
            seperatedExpressions[
              seperatedExpressions.findIndex(indexSlash) - 1
            ] /
            seperatedExpressions[
              seperatedExpressions.findIndex(indexSlash) + 1
            ]),
          seperatedExpressions.splice(
            0,
            3,
            `${
              seperatedExpressions[
                seperatedExpressions.findIndex(indexSlash) - 1
              ] /
              seperatedExpressions[
                seperatedExpressions.findIndex(indexSlash) + 1
              ]
            }`
          ))
        : seperatedExpressions.splice(
            seperatedExpressions.findIndex(indexSlash) - 1,
            3,
            `${
              seperatedExpressions[
                seperatedExpressions.findIndex(indexSlash) - 1
              ] /
              seperatedExpressions[
                seperatedExpressions.findIndex(indexSlash) + 1
              ]
            }`
          );
    }

    /* */
    for (let i = 1; i < seperatedExpressions.length; i += 1) {
      switch (seperatedExpressions[i]) {
        case "+":
          result === 0
            ? (result +=
                Number(seperatedExpressions[i - 1]) +
                Number(seperatedExpressions[i + 1]))
            : (result += Number(seperatedExpressions[i + 1]));
          seperatedExpressions[i + 1] = result;
          break;
        case "-":
          result === 0
            ? (result +=
                Number(seperatedExpressions[i - 1]) -
                Number(seperatedExpressions[i + 1]))
            : (result -= Number(seperatedExpressions[i + 1]));
          seperatedExpressions[i + 1] = result;
          break;
        default:
          break;
      }
      i += 1;
    }
    /* Easter eggs zone */
    result === 666
      ? ((result = "SATANAS !"), setIsSatan(true))
      : setIsSatan(false);
    expressions.join("") === "jokes"
      ? (setIsJokes(true), (result = `${jokes.joke}`))
      : setIsJokes(false);
    result === 713705 ? setIsSun(true) : setIsSun(false);
    setExpressions(result);
  };
  return (
    <div className={isSatan ? "hell" : isSun ? "sun" : "desktop"}>
      <div className={isSun ? "sunDisplay" : "calculator"}>
        {isJokes ? (
          <textarea className="jokes-screen" value={expressions} />
        ) : (
          <input
            type="text"
            className={isSun ? "sunDisplay__screen" : "calculator__screen"}
            value={expressions}
            onChange={(e) => setExpressions(e.target.value)}
          />
        )}

        <div className="calculator-keys">
          <button
            type="button"
            className="operator"
            defaultValue="+"
            onClick={() => handleSign("+")}
          >
            +
          </button>
          <button
            type="button"
            className="operator"
            value="-"
            onClick={() => handleSign("-")}
          >
            -
          </button>
          <button
            type="button"
            className="operator"
            value="*"
            onClick={() => handleSign("*")}
          >
            &times;
          </button>
          <button
            type="button"
            className="operator"
            value="/"
            onClick={() => handleSign("/")}
          >
            &divide;
          </button>

          <button type="button" value="7" onClick={() => handleNumber("7")}>
            7
          </button>
          <button type="button" value="8" onClick={() => handleNumber("8")}>
            8
          </button>
          <button type="button" value="9" onClick={() => handleNumber("9")}>
            9
          </button>

          <button type="button" value="4" onClick={() => handleNumber("4")}>
            4
          </button>
          <button type="button" value="5" onClick={() => handleNumber("5")}>
            5
          </button>
          <button type="button" value="6" onClick={() => handleNumber("6")}>
            6
          </button>

          <button type="button" value="1" onClick={() => handleNumber("1")}>
            1
          </button>
          <button type="button" value="2" onClick={() => handleNumber("2")}>
            2
          </button>
          <button type="button" value="3" onClick={() => handleNumber("3")}>
            3
          </button>

          <button type="button" value="0" onClick={() => handleNumber("0")}>
            0
          </button>
          <button
            type="button"
            className="decimal"
            value="."
            onClick={() => handleSign(".")}
          >
            .
          </button>
          <button
            type="button"
            className="all-clear"
            value="all-clear"
            onClick={() =>
              isJokes
                ? (setIsJokes(false), setExpressions("0"))
                : setExpressions("0")
            }
          >
            AC
          </button>

          <button
            type="button"
            className="equal-sign"
            value="="
            onClick={() => handleResolve(expressions, setExpressions)}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
};

Calculator.propTypes = {
  expressions: PropTypes.number.isRequired,
  setExpressions: PropTypes.func.isRequired,
};

export default Calculator;
