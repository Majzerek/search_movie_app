/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import React from "react";
import { BrowserRouter, useNavigate } from "react-router";
import { navigation } from "../../mocks/mockNavigate";
import userEvent from "@testing-library/user-event";


vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: (props: any) => <span data-testid="fa-icon" {...props} />,
}));


vi.mock("../HeartBtn/HeartBtn", () => ({
  HeartBtn: (props: any) => <button data-testid="heart-btn" {...props} />,
}));

describe("Card", () => {
 
  const defaultProps = {
    img: "https://image.tmdb.org/t/p/w500/test.jpg",
    titleHeader: "Test Movie",
    year: "2022",
    id: 123,
    overview: "Test overview",
    popularity: 88.7,
    isLoad: false,
  };
 const setup = () => {
    render(<BrowserRouter><Card {...defaultProps} /></BrowserRouter>)
  }
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders spinner when isLoad is true", () => {
    render(<Card {...defaultProps} isLoad={true} />);
    expect(screen.getByTestId("fa-icon")).toBeDefined();
  });

  it("renders movie card with title, year, score, overview, HeartBtn, and poster",async () => {
    render(<Card {...defaultProps} />);
    expect(screen.findByText(defaultProps.titleHeader)).toBeDefined();
    expect(screen.findByText(`${defaultProps.year} Score: ${Math.round(defaultProps.popularity)}`)).toBeDefined();
    expect(screen.getByTestId("heart-btn")).toBeDefined();
    expect(await screen.findByAltText(`Poster from movie: ${defaultProps.titleHeader}`)).toHaveAttribute("src", defaultProps.img);
    expect(screen.findByTitle(defaultProps.overview)).toBeDefined();
  });

  it('shows "No poster available" if img ends with "null"', () => {
    render(<Card {...defaultProps} img="https://image.tmdb.org/t/p/w500/null" />);
    expect(screen.findByText("No poster available")).toBeDefined();
  });

  it("navigates to movie summary on poster click", async() => {
    vi.mocked(useNavigate).mockReturnValue(navigation);
    setup();
    const user = userEvent.setup();
    const poster =await screen.findByTestId("poster_container")
    await user.click(poster);
    expect(navigation).toBeCalledWith(`/movie/${defaultProps.id}`);
  });
});