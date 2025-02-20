import { NextResponse } from 'next/server';
import { connectDB } from '@/helper/db'; 
import User from '../../../../models/User';

export async function POST(req) {
  await connectDB(); 

  const { userId, email,firstname } = await req.json(); 

  try {
    let existingUser = await User.findOne({ userId });

    if (existingUser) {
      existingUser.email = email;
      await existingUser.save();
      return NextResponse.json({ success: true });
    } else {
      const newUser = new User({ userId, email,firstname });
      await newUser.save();
      return NextResponse.json({ success: true }, { status: 201 });
    }
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ success: false, message: 'Error processing the request' }, { status: 400 });
  }
}

export function OPTIONS(req) {
  return NextResponse.json(null, { status: 204 });  
}
