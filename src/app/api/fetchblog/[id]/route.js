import { connectDB } from "@/helper/db";
import { NextResponse } from "next/server";
import Blog from "../../../../../models/BlogSchema";


export async function GET(req, { params }) {
    await connectDB();

    const { id } = params;  

    try {
        const blog = await Blog.findById(id);

        if (blog) {
            return NextResponse.json({ success: true, blog });
        } else {
            return NextResponse.json(
                { success: false, message: "Blog not found" },
                { status: 404 }
            );
        }
    } catch (err) {
        console.error("Error fetching blog", err);
        return NextResponse.json(
            { success: false, message: "Error fetching blog" },
            { status: 500 }  
        );
    }
}
