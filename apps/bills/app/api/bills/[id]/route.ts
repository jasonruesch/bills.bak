import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params: { id } }: { params: { id: string } }
) {
  const response = await fetch(`${process.env.BILLS_API_URL}/bills/${id}}`);

  const bill = await response.json();

  return NextResponse.json(bill);
}

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  const response = await fetch(`${process.env.BILLS_API_URL}/bills/${id}}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request.body),
  });

  const bill = await response.json();

  return NextResponse.json(bill);
}

export async function DELETE(
  _: Request,
  { params: { id } }: { params: { id: string } }
) {
  const response = await fetch(`${process.env.BILLS_API_URL}/bills/${id}}`, {
    method: 'DELETE',
  });

  const bill = await response.json();

  return NextResponse.json(bill);
}
