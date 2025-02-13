import styled from 'styled-components';

export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  .modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    text-align: center;
    /* Makes the modal scale with viewport width */
    width: 80vw;
    max-width: 1080px;

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
  }

  .button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1.5rem;
    justify-content: center;
  }

  .payment-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #f0f0f0;
    border: none;
    border-radius: 6px;
    padding: 0.75rem 1.5rem; /* Increase padding for bigger buttons */
    font-size: 1.125rem;     /* Increase font size slightly */
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #e0e0e0;
    }

    .icon {
      font-size: 1.25rem; /* Icon size can be bigger if desired */
    }
  }
`;
