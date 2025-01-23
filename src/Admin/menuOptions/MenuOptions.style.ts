import styled, { css } from 'styled-components';
import reactTextareaAutosize from 'react-textarea-autosize';

const darkColor = '#222';
const darkerColor = '#2f2f2f';
const lightBg = '#f8f8f8';
const activeColor = '#333';
const borderColor = '#ddd';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${lightBg};
`;

export const Header = styled.header`
  background-color: ${darkColor};
  padding: 16px;
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  color: #fff;
  font-size: 20px;
`;

export const Content = styled.main`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
`;

export const TabRow = styled.div`
  display: flex;
  align-items: center;
  background-color: ${darkColor};
  border-radius: 4px;
  margin-bottom: 16px;
  padding: 0 8px;
`;

interface ScrollableTabsProps {
  isScrollable: boolean;
}
export const ScrollableTabs = styled.div<ScrollableTabsProps>`
  display: flex;
  flex: 1;
  overflow: hidden;

  ${({ isScrollable }) =>
    isScrollable &&
    css`
      overflow-x: auto;
      white-space: nowrap;

      &::-webkit-scrollbar {
        height: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #666;
        border-radius: 3px;
      }
    `}
`;

interface TabButtonProps {
  isActive: boolean;
}
export const TabButton = styled.button<TabButtonProps>`
  flex: 0 0 auto;
  padding: 12px 24px;
  font-size: 16px;
  color: #ccc;
  background-color: ${darkColor};
  border: none;
  cursor: pointer;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${activeColor};
      color: #fff;
      font-weight: bold;
    `}

  &:hover {
    background-color: ${darkerColor};
    color: #fff;
  }

  &:focus {
    outline: none;
  }
`;

export const AddCategoryButton = styled.button`
  flex: 0 0 auto;
  margin-left: 8px;
  padding: 12px 16px;
  font-size: 14px;
  color: #ccc;
  background-color: ${darkColor};
  border: 1px solid #444;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: ${darkerColor};
    color: #fff;
  }

  &:focus {
    outline: none;
  }
`;

export const SubHeader = styled.div`
  font-size: 18px;
  margin: 16px 0;
  color: #333;

  span {
    margin: 0 6px;
    color: #aaa;
  }
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid ${borderColor};
  border-radius: 4px;
  padding: 16px;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const OptionBtn = styled.button`
  background-color: #fff;
  border: 1px solid ${borderColor};
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const ItemName = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export const RightSection = styled.div`
  display: flex;
  gap: 8px;
`;

interface ToggleButtonProps {
  red?: boolean;    
  active?: boolean; 
}

export const ToggleButton = styled.button<ToggleButtonProps>`
  border: 1px solid ${borderColor};
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  transition: background-color 0.2s, color 0.2s;

  ${({ red }) =>
    red &&
    css`
      background-color: #ff4d4f;
      color: #fff;
    `}

  ${({ active, red }) =>
    active &&
    !red &&
    css`
      background-color: #1890ff;
      color: #fff;
    `}

  &:hover {
    background-color: #f1f1f1;
    ${({ red }) =>
      red &&
      css`
        background-color: #ff7875;
      `}
    ${({ active, red }) =>
      active &&
      !red &&
      css`
        background-color: #40a9ff;
      `}
  }

  &:focus {
    outline: none;
  }
`;

export const AddMenuButton = styled.button`
  margin: 12px auto 0;
  padding: 10px 16px;
  font-size: 16px;
  color: #333;
  background-color: #fafafa;
  border: 1px solid ${borderColor};
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const Placeholder = styled.div`
  margin-top: 32px;
  padding: 24px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid ${borderColor};
  text-align: center;
  color: #999;
  font-size: 15px;
`;

export const SubHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const DeleteCategoryButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 5px;
  font-size: 14px;
  
  &:hover {
    background-color: darkred;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; 
  left: 0; 
  right: 0; 
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const ModalBox = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;

  max-width: 500px;
  width: 90%;

  max-height: 80vh;
  overflow-y: auto;

  h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

export const ModalButtonCancel = styled.button`
  padding: 16px 24px;
  cursor: pointer;
  background-color: grey;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 900;
  color: #fff;
  margin-right: 1rem;
  border: none;
`;

export const ModalButtonConfirm = styled.button`
  padding: 16px 24px;
  cursor: pointer;
  background-color: #ff4d4f;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 900;
  color: #fff;
  border: none;
`;

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 1rem;
`;

export const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative; 
`;

export const FormLabel = styled.label`
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 14px;
  color: #333;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #40a9ff;
  }
`;

export const FormTextArea = styled(reactTextareaAutosize)`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #40a9ff;
  }
`;

export const AutoButton = styled.button`
  position: absolute;
  right: 10px;
  top: 24px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #eee;
  font-size: 13px;

  &:hover {
    background-color: #ddd;
  }
`;

export const ButtonRow = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const AllergyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
`;

export const AllergyItem = styled.div`
  display: flex;
  align-items: center;
`;

export const AllergyCheckbox = styled.input`
  display: none;

  &:checked + label {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }
`;

export const AllergyLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  gap: 6px;
  cursor: pointer;
  padding: 12px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.2s, background-color 0.2s;

  &:hover {
    border-color: #40a9ff;
  }
`;

export const AllergyImage = styled.img`
  width: 42px;
  height: 42px;
  object-fit: contain;
`;