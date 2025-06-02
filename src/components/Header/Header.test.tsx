import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Header } from "./Header.tsx";
import { BrowserRouter, useNavigate } from "react-router";
import userEvent from "@testing-library/user-event";
import { navigation } from "../../mocks/mockNavigate.ts";

describe("Header component render", () => {

  const setup = () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  it("should render corectly title, text and button", async () => {

    setup();

    const title = screen.getByText("Movie Search App");
    const text = screen.getByText("Search for your favourite movies and save them to your favourites!");
    const buttonNav = await screen.findByRole('button', { name: "Go To Favourite" })

    expect(title).toBeDefined();
    expect(text).toBeDefined();
    expect(buttonNav).toBeDefined();

  });

  it("Navigation btn take us to /favourites", async () => {
    vi.mocked(useNavigate).mockReturnValue(navigation);
    setup();
    
    const user = userEvent.setup();
    const buttonNav = await screen.findByRole('button', { name: "Go To Favourite" })

    await user.click(buttonNav);
    expect(navigation).toHaveBeenCalledWith('/favourites');
  })
});