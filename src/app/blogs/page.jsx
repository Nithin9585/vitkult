'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { fetchBlogs } from '../../../Utils/BlogApi';
import { motion } from 'framer-motion';

function Blogs() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      const startTime = Date.now();
      try {
        const blogs = await fetchBlogs(); 
        const endTime = Date.now(); 
        console.log(`Execution time: ${endTime - startTime}ms`);
        setBlogPosts(blogs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  console.log(blogPosts);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-screen-lg">
      {blogPosts.map((post) => (
        <motion.div
          key={post._id}
          className="border rounded-lg shadow-md flex flex-col h-full"
          initial={{ opacity: 0, x: -100 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ type: 'spring', stiffness: 100, damping: 25 }}
        >
          <div className="overflow-hidden">
            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover rounded-t-lg transition-transform duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }} 
            />
          </div>
          
          <div className="p-6 flex flex-col justify-between flex-grow">
            <h2 className="text-2xl font-bold mt-4">{post.title}</h2>
            <p className="text-gray-500 mt-2">By {post.author}</p>
            
            <div className="flex justify-between items-center mt-auto">
              <p className="text-gray-500 mt-2">Posted on : {new Date(post.createdAt).toLocaleDateString()}</p>
              <Link href={`/blogs/${post._id}`}>
                <Button className="bg-orange-400 m-4 hover:border hover:border-orange-600 hover:bg-transparent hover:text-orange-600">
                  View
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default Blogs;
