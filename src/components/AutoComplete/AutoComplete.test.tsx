import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AutoComplete from ".";

const mockList = [
  {
    title: "bulbasaur",
  },
  {
    title: "ivysaur",
  },
  {
    title: "venusaur",
  },
];

describe("<Search/> Component", () => {
  it("should render the search input", () => {
    render(
      <AutoComplete placeholder="Loook for a Pokemon..." list={mockList} />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("should show the text typed", () => {
    render(
      <AutoComplete placeholder="Loook for a Pokemon..." list={mockList} />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");

    userEvent.type(input, "bulbasaur");
    expect(input).toHaveValue("bulbasaur");
  });

  it("should show the corresponding items typed", () => {
    render(
      <AutoComplete placeholder="Loook for a Pokemon..." list={mockList} />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");

    userEvent.type(input, "bulba");
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.queryByText("ivysaur")).not.toBeInTheDocument();
    expect(screen.queryByText("venusaur")).not.toBeInTheDocument();
  });

  it("should auto complete when selecting the corresponding item", () => {
    render(
      <AutoComplete placeholder="Loook for a Pokemon..." list={mockList} />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");

    userEvent.type(input, "bulba");
    const item = screen.getByText("bulbasaur");
    expect(item).toBeInTheDocument();

    userEvent.click(item);
    expect(input).toHaveValue("bulbasaur");
  });

  it("should clear the input when clicking on close button", () => {
    render(
      <AutoComplete placeholder="Loook for a Pokemon..." list={mockList} />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");

    userEvent.type(input, "bulbasaur");
    expect(input).toHaveValue("bulbasaur");

    userEvent.click(screen.getByLabelText(/clear search/i));
    expect(input).toHaveValue("");
  });

  it("should show a not found message when no items are found", () => {
    render(
      <AutoComplete placeholder="Loook for a Pokemon..." list={mockList} />,
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");

    userEvent.type(input, "charmander");
    expect(
      screen.getByText(
        /no found data for your search. please try another one./i,
      ),
    ).toBeInTheDocument();

    userEvent.clear(input);

    userEvent.type(input, "bulbasaur");
    expect(
      screen.queryByText(
        /no found data for your search. please try another one./i,
      ),
    ).not.toBeInTheDocument();
  });
});
