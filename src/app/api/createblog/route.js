// import {getAuth} from '@clerk/nextjs/server';
import Blog from "../../../../models/BlogSchema";
import { connectDB } from '@/helper/db';
import { NextResponse } from 'next/server';

// export const config = {
//     matcher: '/api/createblog',
//   };
export async function POST(req) {
    //  const { user } = await getAuth(req);  
    
    //     if (!user) {
    //         return NextResponse.json(
    //             { success: false, message: 'You must be logged in to view blogs' },
    //             { status: 401 } 
    //         );
    //     }
    await connectDB();
    
    const { title, author, content, image, userId } = await req.json();

    console.log("Incoming Blog Data:", { title, author, content, image, userId });

    if (!userId) {
        return NextResponse.json({ success: false, message: 'User ID is required' }, { status: 400 });
    }

    try {
        const newBlog = new Blog({ title, author, content, image, userId });

        await newBlog.save();

        return NextResponse.json({ success: true }, { status: 201 });
    } catch (err) {
        console.error("Error:", err);
        return NextResponse.json({ success: false, message: 'Error processing the request' }, { status: 400 });
    }
}
