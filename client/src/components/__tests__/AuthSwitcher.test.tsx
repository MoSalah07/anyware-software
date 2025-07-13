import { render, screen, fireEvent } from "@testing-library/react";
import AuthSwitcher from "../shared/AuthSwitcher";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../store/authSlice";
import i18n from "../../i18n";
import { I18nextProvider } from "react-i18next";
import { describe, test, expect } from "vitest";

function renderWithProviders(
  ui: React.ReactElement,
  preloadedState = { auth: { isLoggedIn: false } }
) {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  });

  return {
    ...render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
      </Provider>
    ),
    store,
  };
}

describe("AuthSwitcher", () => {
  test("يظهر login عند تسجيل الخروج", () => {
    renderWithProviders(<AuthSwitcher />, { auth: { isLoggedIn: false } });
    expect(screen.getByRole("button")).toHaveTextContent(/login/i);
  });

  test("يظهر logout عند تسجيل الدخول", () => {
    renderWithProviders(<AuthSwitcher />, { auth: { isLoggedIn: true } });
    expect(screen.getByRole("button")).toHaveTextContent(/logout/i);
  });

  test("يُحدث الحالة عند الضغط", () => {
    const { store } = renderWithProviders(<AuthSwitcher />, {
      auth: { isLoggedIn: false },
    });
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(store.getState().auth.isLoggedIn).toBe(true);
  });
});
