'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

function BlogPost() {
  const { id } = useParams(); // Get the blog post ID from the URL parameters
  const [post, setPost] = useState(null); // Store the fetched blog post
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (id) {
      // Fetch the blog post data based on the ID
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/fetchblog/${id}`);

          if (!response.ok) {
            // If the response is not OK, throw an error
            throw new Error('Failed to fetch the blog post');
          }

          const data = await response.json(); // Parse the response as JSON

          if (data.success) {
            setPost(data.blog); // If successful, set the blog post
          } else {
            // If the API returns failure message, throw an error
            throw new Error(data.message || 'Failed to fetch the blog post');
          }
        } catch (err) {
          // Catch any errors and set the error message
          setError(err.message || 'Error fetching blog post');
        } finally {
          setLoading(false); // Set loading to false after fetching is done
        }
      };

      fetchPost();
    }
  }, [id]); // Trigger the effect when the `id` changes

  // If the blog post is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error fetching the post
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
