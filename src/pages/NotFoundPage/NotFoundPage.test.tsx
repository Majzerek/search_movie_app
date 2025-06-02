import { render, screen, } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { NotFoundPage } from "./NotFoundPage";
import { userEvent } from "@testing-library/user-event"
import { navigation } from "../../mocks/mockNavigate";

describe("Not Found Page when user use link beyond router", () => {
  const setup = () => {
    render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    )
  };

  it('should render correctly', async () => {
    setup();

    const title = screen.findByText('Page Not Found');
    const text = screen.findByText("Sorry, the page you are looking for does not exist.");
    const backBtn = await screen.findByRole("button", { name: 'Home' });

    expect(title).toBeDefined();
    expect(text).toBeDefined();
    expect(backBtn).toBeDefined();
  })
  it("should take you back to home page", async() => {
    vi.mocked(useNavigate).mockReturnValue(navigation);
    setup();
    const user = userEvent.setup();
    const backBtn = await screen.findByRole("button", { name: 'Home' });

    await user.click(backBtn);

    expect(navigation).toHaveBeenCalledWith("/");
  })
})