import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import useSound from "use-sound";

import { soundsMP3 } from "../../assets/sound";
import styles from "./Trivia.module.scss";

const cx = classNames.bind(styles);

function Trivia({ dataList, questionNumber, setQuestionNumber, setStop }) {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(soundsMP3.play);
  const [letsCorrect] = useSound(soundsMP3.correct);
  const [letsWrong] = useSound(soundsMP3.wrong);

  useEffect(() => {
    console.log("nhac len");
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(dataList[questionNumber - 1]);
  }, [dataList, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };
  const handleAnswer = (answer) => {
    setSelected(answer);
    setClassName(["answer", "active"]);

    delay(1000, () => {
      setClassName(
        answer.correct ? ["answer", "correct"] : ["answer", "wrong"]
      );
    });

    delay(2000, () => {
      if (answer.correct) {
        letsCorrect();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          console.log("nhac dung");

          setSelected(null);
        });
      } else {
        letsWrong();
        delay(1000, () => {
          console.log("nhac sai");
          setStop(true);
        });
      }
    });
  };
  return (
    <div className={cx("trivia")}>
      <div className={cx("question")}>{question?.question}</div>
      <div className={cx("answers")}>
        {question?.answers.map((answer, idx) => (
          <div
            key={idx}
            onClick={() => handleAnswer(answer)}
            className={selected === answer ? cx(className) : cx("answer")}
          >
            <span className={cx("answer-desc")}>{answer.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trivia;
