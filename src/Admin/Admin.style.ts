import styled from "styled-components"
import PALETTE from "constants/palette";

export const AdminLogoutButton = styled.button`
    padding: 24px 60px;
    text-align: center;
    background-color: ${PALETTE.MAIN};
    border-radius: 10px;
    font-size: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
    font-weight: 900;
    color: ${PALETTE.WHITE};
    text-transform: uppercase;
    cursor: pointer;
    &:hover {
        background-color: #FF4242;
    }
`;