import { NextApiRequest, NextApiResponse } from 'next';

import { Bill } from '../../../lib/bill.model';
import { bills } from '../../../lib/data/bills';

const uuid = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

async function GET(_: NextApiRequest, response: NextApiResponse<Bill[]>) {
  // status: 200 (ok)
  return response.status(200).json(bills);
}

async function POST(request: NextApiRequest, response: NextApiResponse<Bill>) {
  const bill = request.body as Partial<Bill>;

  if (!bill.name || !bill.amount || !bill.dueDate) {
    // status: 400 (bad request)
    return response.status(400);
  }

  bill.id = uuid();
  bill.createdAt = new Date();

  bills.push(bill as Bill);

  // status: 201 (created)
  return response.status(201);
}

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<Bill[] | Bill>
) {
  switch (request.method) {
    case 'GET':
      return GET(request, response);
    case 'POST':
      return POST(request, response);
    default:
      response.setHeader('Allow', ['GET', 'POST']);
      // status: 405 (method not allowed)
      return response.status(405);
  }
}
