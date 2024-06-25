import React from "react";
import { Button, ButtonGroup } from "reactstrap";


function Counter({ onCountChange, count, setCount }) {
  const increment = () => {
    setCount(count + 1);
    onCountChange(count + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
      onCountChange(count - 1);
    }
  };
  return (
    <ButtonGroup className="button-group">
      <Button className="decrement-button" onClick={decrement}>
        -
      </Button>
      <span className="numberCounter"> {count}</span>
      <Button className="increment-button" data-cy="artir" onClick={increment}>
        +
      </Button>
    </ButtonGroup>
  );
}

export default Counter;