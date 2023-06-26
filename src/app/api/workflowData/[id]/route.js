import { NextResponse } from 'next/server';
import data from '@/app/lib/data.json';

export async function GET(request, { params }) {
  // const { id } = await request.json();
  // console.log(id);
  const { id } = params;
  const post = data.filter((item) => item.id == id);
  return NextResponse.json({ post });
}
