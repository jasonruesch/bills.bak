import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch(`${process.env.BILLS_API_URL}/bills`);

  const bills = await response.json();

  return NextResponse.json(bills);
}

export async function POST(request: Request) {
  const response = await fetch(`${process.env.BILLS_API_URL}/bills`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request.body),
  });

  const bill = await response.json();

  return NextResponse.json(bill);
}
