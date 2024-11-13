// frontend/src/pages/Despesa.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Title,
  Form,
  Input,
  Button,
  ExpenseList,
  ExpenseItem,
  TotalExpenses,
} from './styles';
import moment from 'moment';

interface Expense {
  _id: string;
  description: string;
  amount: number;
  date: string;
}

const Despesa: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [total, setTotal] = useState(0);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);  // Novo estado para a despesa sendo editada

  useEffect(() => {
    handleListExpense();
  }, []);

  const handleAddExpense = async () => {
    if (description && amount && date) {
      try {
        const response = await axios.post('http://10.68.55.162:3000/despesa', {
          description,
          amount: parseFloat(amount),
          date,
        });

        if (response.data.success) {
          const newExpense = response.data.data;
          setExpenses([...expenses, newExpense]);
          setTotal(total + newExpense.amount);
          setDescription('');
          setAmount('');
          setDate('');
        }
      } catch (error) {
        console.error('Erro ao adicionar despesa:', error);
      }
    }
  };

  const handleDeleteExpense = async (_id: string) => {
    try {
      const response = await axios.delete(`http://10.68.55.162:3000/despesa/delete/${_id}`);

      if (response.data.success) {
        const filteredExpenses = expenses.filter((expense) => expense._id !== _id);
        const expenseValue = expenses.find((expense) => expense._id === _id)?.amount || 0;
        setExpenses(filteredExpenses);
        setTotal(total - expenseValue);
      }
    } catch (error) {
      console.error('Erro ao excluir despesa:', error);
    }
  };

  const handleUpdateExpense = async () => {
    if (editingExpense && description && amount && date) {
      try {
        const updatedExpense = {
          ...editingExpense,
          description,
          amount: parseFloat(amount),
          date,
        };

        const response = await axios.put(`http://10.68.55.162:3000/despesa/update/${editingExpense._id}`, updatedExpense);

        if (response.data.success) {
          const updatedExpenses = expenses.map((expense) =>
            expense._id === editingExpense._id ? response.data.data : expense
          );
          setExpenses(updatedExpenses);
          calculateTotal(updatedExpenses);
          setEditingExpense(null);  // Limpar estado de edição após atualização
          setDescription('');
          setAmount('');
          setDate('');
        }
      } catch (error) {
        console.error('Erro ao atualizar despesa:', error);
      }
    }
  };

  const handleListExpense = async () => {
    try {
      const response = await axios.get('http://10.68.55.162:3000/despesa/list');
      const expenseList = response.data.data;
      setExpenses(expenseList);
      calculateTotal(expenseList);
    } catch (error) {
      console.error('Erro ao listar despesas:', error);
    }
  };

  const calculateTotal = (expenses: Expense[]) => {
    const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotal(totalAmount);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setDescription(expense.description);
    setAmount(expense.amount.toString());
    setDate(expense.date);
  };

  return (
    <Container>
      <Title>Controle de Despesas</Title>
      <Form>
        <Input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Data"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {editingExpense ? (
          <Button onClick={handleUpdateExpense}>Atualizar Despesa</Button>  // Botão para atualizar
        ) : (
          <Button onClick={handleAddExpense}>Cadastrar Despesa</Button>  // Botão para adicionar
        )}
      </Form>
      <TotalExpenses>Total das Despesas: R${total.toFixed(2)}</TotalExpenses>
      <ExpenseList>
        {expenses.map((expense) => (
          <ExpenseItem key={expense._id}>
            {expense.description} - R${expense.amount.toFixed(2)} - {moment(expense.date).format("DD-MM-YYYY")}
            <Button onClick={() => handleDeleteExpense(expense._id)} red>
              Excluir
            </Button>
            <Button onClick={() => handleEditExpense(expense)} >
              Atualizar
            </Button>
          </ExpenseItem>
        ))}
      </ExpenseList>
    </Container>
  );
};

export default Despesa;
