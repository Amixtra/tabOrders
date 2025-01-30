import {
  StyledCloseIcon,
  WaiterCloseOverlay,
  WaiterCloseWord,
} from "./WaiterClose.style";

interface WaiterCloseProps {
  onClose: () => void;
}

const WaiterClose: React.FC<WaiterCloseProps> = ({ onClose }) => {
  return (
    <WaiterCloseOverlay onClick={onClose}>
      <StyledCloseIcon />
      <WaiterCloseWord>Close</WaiterCloseWord>
    </WaiterCloseOverlay>
  );
};

export default WaiterClose;
