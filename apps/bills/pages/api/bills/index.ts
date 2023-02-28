import { faker } from '@faker-js/faker';
import { NextApiRequest, NextApiResponse } from 'next';

import bills from '../../../data/bills';
import Bill from '../../../lib/bill.model';

async function GET(_: NextApiRequest, response: NextApiResponse<Bill[]>) {
  // status: 200 (ok)
  return response.status(200).json(bills);
}

async function POST(request: NextApiRequest, response: NextApiResponse) {
  const {
    name: { value: name },
    amount: { value: amount },
    dueDate: { value: dueDate },
  } = request.body as typeof request.body & {
    name: { value: string };
    amount: { value: string };
    dueDate: { value: string };
  };

  if (!name || !amount || !dueDate) {
    // status: 400 (bad request)
    return response.status(400).json({ message: 'Missing required fields' });
  }

  const bill: Bill = {
    id: faker.datatype.uuid(),
    name: name,
    amount: Number(amount),
    dueDate: dueDate,
  };

  bills.push(bill);

  // status: 201 (created)
  return response.status(201).json(bill);
}

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  switch (request.method) {
    case 'GET':
      return GET(request, response);
    case 'POST':
      return POST(request, response);
    default:
      response.setHeader('Allow', ['GET', 'POST']);
      // status: 405 (method not allowed)
      return response.status(405).json({ message: 'Method not allowed' });
  }
}
