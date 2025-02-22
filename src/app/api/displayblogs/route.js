import { connectDB } from "@/helper/db";
import Blog from "../../../../models/BlogSchema";
import { NextResponse } from "next/server";


export async function GET(req) {
    

    await connectDB();
    
    try {
        const blogs = await Blog.find(); 
        console.log('Blogs fetched:', blogs);

        if (blogs.length > 0) {
            return NextResponse.json({ success: true, blogs });
        } else {
            return NextResponse.json(
                { success: false, message: "No blogs found" },
                { status: 404 }
            );
        }
    } catch (err) {
        console.error("Error fetching blogs", err);
        return NextResponse.json(
            { success: false, message: "Error fetching blogs" },
            { status: 500 }
        );
    }
}
