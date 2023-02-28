import { NextApiRequest, NextApiResponse } from 'next';
import bills from '../../../../data/bills';

async function GET(id: string, _: NextApiRequest, response: NextApiResponse) {
  const bill = bills.find((bill) => bill.id === id);

  if (!bill) {
    // status: 404 (not found)
    return response.status(404).json({ message: 'Not found' });
  }

  // status: 200 (ok)
  return response.status(200).json(bill);
}

async function PUT(
  id: string,
  request: NextApiRequest,
  response: NextApiResponse
) {
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

  const existing = bills.find((bill) => bill.id === id);

  if (!existing) {
    // status: 404 (not found)
    return response.status(404).json({ message: 'Not found' });
  }

  const bill = { ...existing, name, amount, dueDate };

  // status: 200 (ok)
  return response.status(200).json(bill);
}

async function DELETE(
  id: string,
  _: NextApiRequest,
  response: NextApiResponse
) {
  const index = bills.findIndex((bill) => bill.id === id);

  if (index === -1) {
    // status: 404 (not found)
    return response.status(404).json({ message: 'Not found' });
  }

  const removed = bills.splice(index, 1);

  // status: 200 (ok)
  return response.status(200).json({ success: !!removed.length });
}

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { method, query } = request;
  const id = query.id as string;

  if (!id) {
    // status: 400 (bad request)
    return response.status(400).json({ message: 'Missing required fields' });
  }

  switch (method) {
    case 'GET':
      return GET(id, request, response);
    case 'PUT':
      return PUT(id, request, response);
    case 'DELETE':
      return DELETE(id, request, response);
    default:
      response.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      // status: 405 (method not allowed)
      return response.status(405).json({ message: 'Method not allowed' });
  }
}
