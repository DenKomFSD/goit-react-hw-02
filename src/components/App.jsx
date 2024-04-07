import { useEffect, useState } from "react";
import "./App.css";
import Description from "./Description/Description";
import Feedback from "./Feedback/Feedback";
import Options from "./Options/Options";
import Notification from "./Notification/Notification";

function App() {
  const [feedbackType, setFeedbackType] = useState(() => {
    const savedFeedbacks = localStorage.getItem("feedbackType");
    return savedFeedbacks !== null
      ? JSON.parse(savedFeedbacks)
      : {
          good: 0,
          neutral: 0,
          bad: 0,
        };
  });

  const updateFeedback = (type) => {
    setFeedbackType((prevFeedback) => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };
  const totalFeedback =
    feedbackType.good + feedbackType.neutral + feedbackType.bad;
  const positivePersentage = Math.round(
    (feedbackType.good / totalFeedback) * 100
  );

  //Reset
  const resetFeedback = () => {
    setFeedbackType({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  useEffect(() => {
    localStorage.setItem("feedbackType", JSON.stringify(feedbackType));
  }, [feedbackType]);

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedbackType={feedbackType}
          totalFeedback={totalFeedback}
          positivePersentage={positivePersentage}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </>
  );
}

export default App;
