import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import App from "./App";
import PALETTE from "constants/palette";
import GlobalStyle from "./Global.style";
import store from "./features/store/index";
import { ToastProvider } from "components/@share/Toast/ToastContext/ToastContext";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={PALETTE}>
      <GlobalStyle />
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
