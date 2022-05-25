const Calculator = () => {
  return (
    <div className="desktop">
      <div className="calculator">
        <input type="text" className="calculator-screen" value="0" disabled />

        <div className="calculator-keys">
          <button type="button" className="operator" value="+">
            +
          </button>
          <button type="button" className="operator" value="-">
            -
          </button>
          <button type="button" className="operator" value="*">
            &times;
          </button>
          <button type="button" className="operator" value="/">
            &divide;
          </button>

          <button type="button" value="7">
            7
          </button>
          <button type="button" value="8">
            8
          </button>
          <button type="button" value="9">
            9
          </button>

          <button type="button" value="4">
            4
          </button>
          <button type="button" value="5">
            5
          </button>
          <button type="button" value="6">
            6
          </button>

          <button type="button" value="1">
            1
          </button>
          <button type="button" value="2">
            2
          </button>
          <button type="button" value="3">
            3
          </button>

          <button type="button" value="0">
            0
          </button>
          <button type="button" className="decimal" value=".">
            .
          </button>
          <button type="button" className="all-clear" value="all-clear">
            AC
          </button>

          <button type="button" className="equal-sign" value="=">
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
