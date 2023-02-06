import classNames from "classnames/bind";
import { useRef } from "react";
import styles from "./Start.module.scss";
const cx = classNames.bind(styles);

function Start({ setUserName }) {
  const inputRef = useRef();
  const handleClick = (e) => {
    inputRef.current.value &&  setUserName(inputRef.current.value);
  };
  return (
    <div className={cx("start")}>
      <input
        ref={inputRef}
        className={cx("start-input")}
        placeholder="Enter your name"
      />
      <button onClick={handleClick} className={cx("start-btn")}>
        Start
      </button>
    </div>
  );
}

export default Start;
