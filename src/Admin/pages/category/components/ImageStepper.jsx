import { ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";

export default function ImageStepper({name, overalStep, beginStep }) {
  const [startStep, setStartStep] = useState(1);
  const [totalStep, setTotalStep] = useState(0);
  useEffect(() => {
    setTotalStep(overalStep);
    setStartStep(beginStep);
  }, [overalStep, beginStep]);

  return (
    <>
      <p
        className={`${
          startStep == totalStep - 1 ? "text-red-600" : "text-gray-400"
        }  text-end p-1`}
      >
        {`(${startStep}/${totalStep - 1}) `}
      </p>
      <ErrorMessage name={name}>
        {(msg) => <div className="text-red-600">{msg}</div>}
      </ErrorMessage>
    </>
  );
}
