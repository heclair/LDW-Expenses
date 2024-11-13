// frontend/src/pages/styles.tsx

import styled from 'styled-components';

export const Container = styled.div`
  max-width: 920px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const Form = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
`;

export const Button = styled.button<{ red?: boolean }>`
  padding: 8px 12px;
  font-size: 16px;
  color: #fff;
  background-color: ${(props) => (props.red ? '#ff4d4f' : '#28a745')};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${(props) => (props.red ? '#e04a4d' : '#218838')};
  }
`;

export const ExpenseList = styled.div`
  margin-top: 20px;
`;

export const ExpenseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin-top: 8px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const TotalExpenses = styled.h2`
  font-size: 20px;
  margin-top: 20px;
`;
