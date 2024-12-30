import React from "react";
import videoSources from "db/ad";
import TableIndicator from "../indicator/TableIndicator";
import { FaCircleXmark } from "react-icons/fa6";
import {
  AdCloseButton,
  AdCloseWord,
  AdOverlay,
  AdVideo,
  AdWrapper,
  IconWrapper,
  Logo,
  Logo2,
} from "./Ad.style";

interface AdPageProps {
  onClose: () => void;
}

const AdPage: React.FC<AdPageProps> = ({ onClose }) => {
  return (
    <AdOverlay>
      <AdWrapper>
        <Logo>
          <Logo2>Logo</Logo2>
        </Logo>
        <AdCloseButton onClick={onClose}>
          <AdCloseWord>
            <IconWrapper>
              <FaCircleXmark />
            </IconWrapper>
            Close
          </AdCloseWord>
        </AdCloseButton>
        <TableIndicator />
        <AdVideo src={videoSources[1]} autoPlay muted loop playsInline />
      </AdWrapper>
    </AdOverlay>
  );
};

export default AdPage;
