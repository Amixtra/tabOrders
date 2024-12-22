import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import App from "./App";
import PALETTE from "constants/palette";
import GlobalStyle from "./Global.style";
import store from "./features/store/index";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={PALETTE}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
