import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();
    const balance = transactions.reduce(
      (acc, cur) => {
        if (cur.type === 'income') {
          acc.income += cur.value;
          acc.total += cur.value;
        }
        if (cur.type === 'outcome') {
          acc.outcome += cur.value;
          acc.total -= cur.value;
        }
        return acc;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return balance;
  }
}

export default TransactionsRepository;
