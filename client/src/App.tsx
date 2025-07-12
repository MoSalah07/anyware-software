// Routes
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
// i18n
import "../src/i18n/index";
// Redux
import { Provider } from "react-redux";
import store, { persistor } from "./store";
// Mui
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
// Reqct-Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <RouterProvider router={router} />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  );
}
