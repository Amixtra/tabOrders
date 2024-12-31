import startSources from "db/start";
import TableIndicator from "../indicator/TableIndicator";
import {
  StartOverlay,
  StartWrapper,
  Logo,
  StartPhoto,
  StartDescription,
  StartLogo,
} from "./Start.style";
import logoSources from "db/logo";

const StartPage = () => {
  return (
    <StartOverlay>
      <StartWrapper>
        <Logo>
          <StartLogo src={logoSources['defaultLight']}/>
        </Logo>
        <StartDescription>
          Tap anywhere on the screen to continue.
        </StartDescription>
        <StartPhoto src={startSources['default']}/>
      </StartWrapper>
    </StartOverlay>
  );
};

export default StartPage;
