'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Blogs() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    fetch('/api/displayblogs')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlogPosts(data.blogs);  
        }
      })
      .catch((err) => console.error('Error fetching blogs:', err));
  }, []); 
  console.log(blogPosts)

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-screen-lg">
      {blogPosts.map((post) => (
        <div key={post._id} className="border rounded-lg shadow-md">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold mt-4">{post.title}</h2>
            <p className="text-gray-500 mt-2">By {post.author}</p>
            <div className="flex justify-between items-center">
              <p className="text-gray-500 mt-2">Posted on : {new Date(post.createdAt).toLocaleDateString()}</p>
              <Link href={`/blogs/${post._id}`}>
                <Button className="bg-orange-400 m-4 hover:border hover:border-orange-600 hover:bg-transparent hover:text-orange-600">
                  View
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Blogs;
