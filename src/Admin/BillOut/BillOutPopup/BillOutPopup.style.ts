import styled from "styled-components";

export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  /* Cover the whole screen */
  width: 100%;
  height: 100%;
  /* Center content */
  display: flex;
  align-items: center;
  justify-content: center;
  /* Dim background */
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;

  .modal-content {
    position: relative;
    background: #fff;
    padding: 2.5rem;       /* Larger padding for a bigger box */
    border-radius: 8px;
    text-align: center;
    width: 90vw;           /* Make the modal wider */
    max-width: 1200px;     /* Increase max width */

    h2 {
      font-size: 2rem;     /* Make the title larger */
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent;
      border: none;
      font-size: 1.5rem;    /* Size of the "X" icon */
      cursor: pointer;
    }
  }

  .button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    margin-top: 2rem;
    justify-content: center;
  }

  .payment-button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background-color: #f0f0f0;
    border: none;
    border-radius: 8px;
    padding: 1rem 2rem;    /* Increase padding */
    font-size: 1.25rem;    /* Increase font size */
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #e0e0e0;
    }

    .icon {
      font-size: 1.5rem;   /* Make the icon bigger */
    }
    .icon-peso {
      font-size: 2rem;
    }
  }
`;
