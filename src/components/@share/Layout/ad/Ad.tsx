import { videoSources } from "db/constants";
import TableIndicator from "../indicator/TableIndicator";
import { FaCircleXmark } from "react-icons/fa6";
import {
  AdCloseButton,
  AdCloseWord,
  AdDescription,
  AdLogo,
  AdOverlay,
  AdVideo,
  AdWrapper,
  IconWrapper,
  Logo,
} from "./Ad.style";
import { logoSources } from "db/constants";
import { LanguageCode } from "db/constants";

interface AdPageProps {
  onClose: () => void;
  selectedLanguage: LanguageCode;
}

const AdPage: React.FC<AdPageProps> = ({ onClose, selectedLanguage }) => {
  return (
    <AdOverlay onClick={onClose}>
      <AdWrapper>
        <Logo>
          <AdLogo src={logoSources["defaultDark"]} />
        </Logo>
        <AdDescription>
          Tap anywhere on the screen to continue.
        </AdDescription>
        <TableIndicator selectedLanguage={selectedLanguage} />
        <AdVideo src={videoSources[1]} autoPlay muted loop playsInline />
      </AdWrapper>
    </AdOverlay>
  );
};

export default AdPage;
