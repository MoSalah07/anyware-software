// Routes
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
// i18n
import "../src/i18n/index";
// Redux
import { Provider } from "react-redux";
import store from "./store";
// Mui
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
// Reqct-Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
}
