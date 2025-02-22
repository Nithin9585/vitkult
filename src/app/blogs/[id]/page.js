'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the blog post data based on the id
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/fetchblog/${id}`);
          const data = await response.json();

          if (response.ok && data.success) {
            setPost(data.blog);
          } else {
            setError(data.message || 'Failed to fetch the blog post');
          }
        } catch (err) {
          setError('Error fetching blog post');
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [id]);

  // If the blog post is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // If the post is found, display it
  const formatContent = (content) => {
    return content.split("\n").map((str, index) => (
      <span key={index}>
        {str}
        <br />
      </span>
    ));
  };

  return (
    <div className="max-w-full mx-auto mt-10 mb-6 ml-8 mr-8">
      <img
        src={post.image}
        alt={post.title}
        className="w-full max-h-[600px] object-cover rounded-lg"
      />
      <div className="lg:p-10 sm:p-2">
        <h2 className="text-2xl font-bold dark:text-gray-400 text-gray-900 mt-4">{post.title}</h2>
        <p className="text-gray-500 mt-2 font-cursive text-lg italic">By {post.author}</p>
        <p className="text-gray-500 mt-2">Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>

        <div className="mt-4 border-2 shadow-md p-10 dark:text-gray-400 text-gray-900 rounded-md">
          {formatContent(post.content)}
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
