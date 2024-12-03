import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

export default function PlusMinusBtn(props) {
  const [btn, setBtn] = useState(1);

  useEffect(() => {
    props.setCount(btn);
    if (props.changeCount) {
      props.changeCount(props.id, btn);
    }
  }, [btn]);

  useEffect(() => {
    if (props.count) {
      setBtn(props.count);
    }
  }, [props.count]);

  return (
    <div className="input-group d-flex align-items-center gap-2">
      <span
        className="input-group-btn"
        onClick={() => {
          if (btn > 0) {
            setBtn((prev) => prev - 1);
          } else {
            setBtn(0);
          }
        }}
      >
        <button
          className="btn btn-danger btn-number"
          type="button"
          data-type="minus"
          data-field="quant[2]"
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
      </span>
      <div>
        <input
          type="number"
          name="quant[2]"
          className="form-control input-number"
          value={btn}
          min={1}
          max={100}
          onChange={(e) => {
            if (e.target.value > 0) {
              setBtn(e.target.value);
            } else {
              setBtn(0);
            }
          }}
        />
      </div>
      <span
        className="input-group-btn"
        onClick={() => setBtn((prev) => prev + 1)}
      >
        <button
          className="btn btn-success btn-number"
          type="button"
          data-type="plus"
          data-field="quant[2]"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </span>
    </div>
  );
}
