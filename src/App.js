import classNames from "classnames/bind";
import { useEffect, useMemo, useState } from "react";

import styles from "./App.module.scss";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import Start from "./components/Start";

const cx = classNames.bind(styles);
function App() {
  const dataList = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "A. Phone",
          correct: false,
        },
        {
          text: "B. Watches",
          correct: true,
        },
        {
          text: "C. Food",
          correct: false,
        },
        {
          text: "D. Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "A. 2004",
          correct: true,
        },
        {
          text: "B. 2005",
          correct: false,
        },
        {
          text: "C. 2006",
          correct: false,
        },
        {
          text: "D. 2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "A. Johnny Deep",
          correct: false,
        },
        {
          text: "B. Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "C. Denzel Washington",
          correct: false,
        },
        {
          text: "D. Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "$ 100" },
        { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1.000" },
        { id: 6, amount: "$ 2.000" },
        { id: 7, amount: "$ 4.000" },
        { id: 8, amount: "$ 8.000" },
        { id: 9, amount: "$ 16.000" },
        { id: 10, amount: "$ 32.000" },
        { id: 11, amount: "$ 64.000" },
        { id: 12, amount: "$ 125.000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500.000" },
        { id: 15, amount: "$ 1.000.000" },
      ].reverse(),
    []
  );

  const [userName, setUserName] = useState(null);
  const [questionNumber, SetquestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className={cx("app")}>
      {userName ? (
        <>
          <div className={cx("main")}>
            {stop ? (
              <h1 className={cx("result")}> You earned {earned}</h1>
            ) : (
              <>
                <div className={cx("top")}>
                  <div className={cx("timer")}>
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className={cx("bottom")}>
                  <Trivia
                    dataList={dataList}
                    questionNumber={questionNumber}
                    setQuestionNumber={SetquestionNumber}
                    setStop={setStop}
                  />
                </div>
              </>
            )}
          </div>
          <div className={cx("pyramid")}>
            <ul className={cx("moneyList")}>
              {moneyPyramid.map((money, idx) => (
                <li
                  className={cx("moneyItem", {
                    active: questionNumber === money.id,
                  })}
                  key={idx}
                >
                  <span className={cx("moneyItemNumber")}>{money.id}</span>
                  <span className={cx("moneyItemAmount")}> {money.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start  setUserName={setUserName} />
      )}
    </div>
  );
}

export default App;
