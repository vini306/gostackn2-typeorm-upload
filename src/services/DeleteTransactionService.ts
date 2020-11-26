import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const transactionExists = await transactionRepository.findOne(id);

    if (!transactionExists) {
      throw new AppError('Transaction not found', 404);
    }

    await transactionRepository.remove(transactionExists);
  }
}

export default DeleteTransactionService;
