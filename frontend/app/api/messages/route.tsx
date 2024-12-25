import { NextResponse } from 'next/server';
import { connectMongo } from '@/lib/dbconnect';
import Message, { IMessage } from '@/models/message';

export async function GET() {
  await connectMongo();
  const messages: IMessage[] = await Message.find({});
  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  await connectMongo();
  const body = await req.json();
  const newMessage = await Message.create(body);
  return NextResponse.json(newMessage);
}
