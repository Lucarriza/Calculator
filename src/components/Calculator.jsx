import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

/* Easter eggs */
import axios from "axios";

const Calculator = ({ expressions, setExpressions }) => {
  /*--------------Easter eggs zone----------- */
  const [isSatan, setIsSatan] = useState(false);
  const [isSun, setIsSun] = useState(false);
  const [isJokes, setIsJokes] = useState(false);
  const [jokes, setJokes] = useState("");
  const [isToto, setIsToto] = useState(false);

  /* useEffect takes a joke from an API each time the Joke mode is used */
  useEffect(() => {
    const jokeApi = "https://v2.jokeapi.dev/joke/Programming?type=single";
    axios
      .get(jokeApi)
      .then((res) => res.data)
      .then((data) => setJokes(data))
      .catch((error) => console.log(error));
  }, [isJokes]);
  /*--------------Easter eggs zone----------- */

  /* operators, indexStar and indexSlash are all defined here to be used in the
  differents functions as reference. */
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
    it returns the expressions as an new array. 
    ex: 12+34/3 => [12],[+],[34],[/],[3] */
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

  /* Main function: this will first check if the converted expressions includes "*" or "/" 
  (for resolving multiplications and divisions first) then it will resolve additions 
  and substractions. */
  const handleResolve = () => {
    const seperatedExpressions = expressionToSeparated();
    let result = 0;

    /* While loop, it will always search if the expression includes "*" and "/" signs. */
    while (
      seperatedExpressions.includes("*") ||
      seperatedExpressions.includes("/")
    ) {
      /* Here, we just checked if both of "/" and "*" signs exist,
     like '[4],[*],[4],[/],[2]'(true) / '[5],[*],[2],[*],[4],[/],[2],[/],[5],[*],[1],[/],[4]'(true) 
     / '[3],[*],[4],[*],[2]'(false) */
      seperatedExpressions.indexOf("/") !== -1 &&
      seperatedExpressions.indexOf("*") !== -1
        ? /* Now, as we know that both exist, we check which index is the lowest one, here for the "*" sign.*/
          seperatedExpressions.indexOf("*") < seperatedExpressions.indexOf("/")
          ? /* Then, we splice the expression to reduce it from 3 parts expression like '[4],[*],[3]'(3) 
          to one part '[12]'(1) resolved expression.*/
            seperatedExpressions.splice(
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
          : /* Here is the case where "/" sign is before "*" sign.*/
            seperatedExpressions.splice(
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
        : /* The case where we don't have 2 signs "*" and "/" in the expression,
        like '[3],[*],[4],[*],[5],[*],[2],[*],[1]' or '[12],[/],[4],[/],[2],[/],[4]'.
        Here, we check if we have an existing "*" sign. */
        seperatedExpressions.indexOf("*") !== -1
        ? /* Then, we consider that there is a chance to get a 3, like '[3],[*],[4]'(3) parts expression.*/
          seperatedExpressions.length === 3
          ? /* In this case, we will stock the resolved expression directly in result. */
            ((result =
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
          : /* If the expression is composed by more than 3 parts like '[3],[*],[4],[*],[5]'(5),
          we splice the result of the first "*" to '[12],[*],[5]' (3) */
            seperatedExpressions.splice(
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
        : /* Here, we check if we have an existing "/" sign. */
        seperatedExpressions.length === 3
        ? /* In this case, we will stock the resolved expression directly in result. */
          ((result =
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
        : /* If the expression is composed by more than 3 parts like '[12],[/],[4],[/],[5]'(5),
        we splice the result of the first "/" to '[3],[/],[5]' (3) */
          seperatedExpressions.splice(
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

    /* Now, if the initial expression included '*' and '/' signs, they beeing resolved and desapered.
    We can only have an expression like '[4],[+],[2],[-],[100],[+],[34]'.
    As we know that the sign is forced to be insert in the index 1 of the expression, we began to explore
    the array from the index 1. We check the sign and we reduce expression by resolving. Then, 
    we increment i index by 2 to check the following sign. */
    for (let i = 1; i < seperatedExpressions.length; i += 2) {
      switch (seperatedExpressions[i]) {
        case "+":
          /* If result === 0 served for the first time looping, then, result will be at least used.*/
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
    }
    /*--------------Easter eggs zone----------- */
    result === 666
      ? ((result = "SATANAS !"), setIsSatan(true))
      : setIsSatan(false);
    expressions.join("") === "jokes"
      ? (setIsJokes(true), (result = `${jokes.joke}`))
      : setIsJokes(false);
    result === 713705 ? setIsSun(true) : setIsSun(false);
    expressions.join("") === "0+0"
      ? (setIsToto(true), (result = `La tête à toto ;)`))
      : setIsToto(false);
    /*--------------Easter eggs zone----------- */

    /* Finally, we set expression on screen as result calculated.*/
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
