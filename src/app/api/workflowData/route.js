import { NextResponse } from 'next/server';
import data from '@/app/lib/data.json';

export async function GET(request) {
  return NextResponse.json({ data });
}
