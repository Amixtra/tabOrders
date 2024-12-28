import React from "react";
import videoSources from "db/ad";
import TableIndicator from "../indicator/TableIndicator";
import { AdCloseButton, AdOverlay, AdVideo, AdWrapper } from "./Ad.style";

const AdPage: React.FC = () => {
  return (
    <AdOverlay>
      <AdWrapper>
        <AdCloseButton>
            Close
        </AdCloseButton>
        <TableIndicator />
        <AdVideo src={videoSources[1]} autoPlay muted loop playsInline />
      </AdWrapper>
    </AdOverlay>
  );
};

export default AdPage;
