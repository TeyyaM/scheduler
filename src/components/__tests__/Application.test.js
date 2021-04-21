import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);
describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const { getByText, getByAltText, getByPlaceholderText, getAllByAltText, queryByText } = render(<Application />);

    await waitForElement(() => getByText("Archie Cohen"));

    fireEvent.click(getAllByAltText("Add")[0]);

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText("Sylvia Palmer"));

    fireEvent.click(getByText("Save"));

    expect(queryByText(/saving/i)).not.toBeNull();

    await waitForElement(() => getByText("Lydia Miller-Jones"));

    expect(queryByText(/saving/i)).toBeNull();

    expect(getByText("no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    const { getByText, getByAltText, queryByText } = render(<Application />);

    await waitForElement(() => getByText("Archie Cohen"));

    fireEvent.click(getByAltText("Delete"));

    fireEvent.click(getByText("Confirm"));

    await waitForElement(() => getByText("Deleting"));

    await waitForElement(() => getByText("2 spots remaining"));

    expect(queryByText(/deleting/i)).toBeNull();

    expect(getByText("2 spots remaining")).toBeInTheDocument();
  });
});