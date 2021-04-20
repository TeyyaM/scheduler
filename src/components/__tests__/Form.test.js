import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Form from "components/Appointment/Form";

describe("Form", () => {

  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];
  const interview = { student: 'Stacy Jennings', interviewer: 1 }

  it("renders without student name if not provided", () => {

    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {

    const { getByTestId } = render(
      <Form interviewers={interviewers} interview={interview} />
    );

    expect(getByTestId("student-name-input")).toHaveValue(interview.student);
  });



  it("validates that the student name is not blank", () => {

    const onSave = jest.fn();

    const { getByText } = render(
      <Form interviewers={interviewers} />
    );

    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name and interviewer is defined", () => {

    const onSave = jest.fn();

    const { queryByText, getByText } = render(
      <Form interviewers={interviewers}
        interview={interview}
        onSave={onSave} />
    );

    fireEvent.click(getByText("Save"), onSave(interview.student, interview.interviewer));

    /* 3. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    /* 4. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);

    /* 5. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith('Stacy Jennings', 1);
  });

});