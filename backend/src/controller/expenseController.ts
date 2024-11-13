import ExpenseModel from '../models/ExpenseModel'; // Importando o modelo
import { Request, Response } from "express";


class DespesaController {
  // Método para criar uma despesa
  static async create(req: Request, res: Response) {
    const { description, amount, date } = req.body;

    try {
      // Validação simples dos campos
      if (!description || !amount || !date) {
        return res.status(400).json({
          success: false,
          message: 'Descrição, valor e data são obrigatórios.',
        });
      }

      // Criação do novo documento
      const expense = new ExpenseModel({
        description,
        amount,
        date,
      });

      // Salvando a despesa no banco de dados
      await expense.save();

      // Retornando sucesso
      return res.status(201).json({
        success: true,
        message: 'Despesa criada com sucesso!',
        data: expense,
      });
    } catch (error) {
      // Tratamento de erro
      return res.status(500).json({
        success: false,
        message: 'Erro ao criar despesa.',
      
      });
    }
  }


  static async list(req: Request, res: Response) {
    try {
      // Buscando todas as despesas no banco
      const expenses = await ExpenseModel.find({}, '_id description amount date'); // Seleciona apenas os campos necessários

      // Retornando a lista de despesas
      return res.status(200).json({
        message: 'Despesas encontradas com sucesso!',
        data: expenses,
      });
    } catch (error: any) {
      // Tratamento de erro
      return res.status(500).json({
        success: false,
        message: 'Erro ao listar despesas.',
        error: error.message,
      });
    }
  }

  static async update(req: Request, res: Response) {
    const { _id } = req.params;  // Capturando o _id da despesa via parâmetro de URL
    const { description, amount, date } = req.body;  // Capturando os dados atualizados

    try {
      // Validação simples dos campos
      if (!description || !amount || !date) {
        return res.status(400).json({
          success: false,
          message: 'Descrição, valor e data são obrigatórios.',
        });
      }

      // Procurando a despesa pelo _id
      const expense = await ExpenseModel.findById(req.params._id);

      if (!expense) {
        return res.status(404).json({
          success: false,
          message: 'Despesa não encontrada.',
        });
      }

      // Atualizando os campos da despesa
      expense.description = description;
      expense.amount = amount;
      expense.date = date;

      // Salvando a despesa atualizada no banco de dados
      await expense.save();

      // Retornando sucesso
      return res.status(200).json({
        success: true,
        message: 'Despesa atualizada com sucesso!',
        data: expense,
      });
    } catch (error: any) {
      // Tratamento de erro
      return res.status(500).json({
        success: false,
        message: 'Erro ao atualizar despesa.',
        error: error.message,
      });
    }
  }

  static async delete(req: Request, res: Response) {
    

    try {
      // Procurando a despesa a ser deletada
      const expense = await ExpenseModel.findByIdAndDelete(req.params._id);

      if (!expense) {
        return res.status(404).json({
          success: false,
          message: 'Despesa não encontrada.',
        });
      }

      // Retornando sucesso
      return res.status(200).json({
        success: true,
        message: 'Despesa deletada com sucesso!',
        data: expense,
      });
    } catch (error:any) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao deletar despesa.',
        error: error.message,
      });
    }
  }


}

export default DespesaController;
