// styles.ts
import styled from "styled-components";

export const OrderContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: flex;
  flex-direction: column;
  color: #fff;
`;

export const OrderHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px;
  background-color: #1c1c1c;
`;

export const HeaderItem = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const TabsContainer = styled.div`
  display: flex;
  background-color: #101010;
`;

export const Tab = styled.div<{ active?: boolean }>`
  padding: 12px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-bottom: ${({ active }) => (active ? "3px solid red" : "none")};
  &:hover {
    background-color: #2c2c2c;
  }
`;

export const TableContainer = styled.div`
  flex: 1; 
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const TableHeader = styled.div`
  display: flex;
  background-color: #333;
  font-weight: bold;
  font-size: 16px;
`;

export const TableHeaderItem = styled.div`
  flex: 1;
  text-align: center;
  font-size: 24px;
  padding: 14px 0;
`;

export const TableRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #444;
`;

export const TableCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 20px 0;
  font-size: 32px;
  font-weight: bold;
`;

export const TimeTableCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 20px 0;
  font-size: 24px;
  font-weight: bold;
`;

export const TableNumberCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 14px 0;
  font-size: 32px;
  font-weight: bold;
  background: red;
  border-radius: 15px;
`;

export const ConfirmedCell = styled.div`
  flex: 1;
  text-align: center;
  padding: 14px 0;
  font-size: 32px;
  font-weight: bold;
  background: red;
  border-radius: 15px;
`;