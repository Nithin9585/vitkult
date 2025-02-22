'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from '@radix-ui/react-dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@clerk/clerk-react';  

function BlogUploadForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { user } = useUser();  
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTitleError('');
    setContentError('');

    if (!user) {
      return toast({ 
        title: 'You must be logged in to upload a blog', 
        description: 'Please login to upload a blog.', 
        duration: 5000 
      });
    }

    let isValid = true;
    if (!title.trim()) {
      setTitleError('Title is required');
      isValid = false;
    }

    if (!content.trim()) {
      setContentError('Content is required');
      isValid = false;
    }

    if (isValid) {
      const blogData = {
        title,
        author: user.firstName || 'Unknown',
        content,
        image,
        userId: user.id || null,
      };

      try {
        const response = await fetch('/api/createblog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData),
        });

        if (!response.ok) {
          throw new Error('Failed to upload blog');
        }

        toast({ title: 'Blog uploaded successfully!', description: 'Your blog has been submitted.', duration: 3000 });
        setFormSubmitted(true);
      } catch (error) {
        toast({ title: 'Error uploading blog', description: error.message, duration: 3000 });
      }
    } else {
      toast({ title: 'Submission failed', description: 'Please fix the errors.', duration: 3000 });
    }
  };

  if (formSubmitted) {
    return (
      <div className="max-w-full mx-auto p-6 bg-ivory rounded-lg text-center">
        <h2 className="text-2xl text-green-500">Your blog has been successfully uploaded!</h2>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="max-w-full lg:max-w-4xl mx-auto p-6 bg-ivory rounded-lg "
    >
      <h1 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-red-500">
        Upload Your Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          <Label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-400">
            Title:
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="mt-1 w-full p-5 focus:ring-2 focus:ring-yellow-500"
          />
          {titleError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm mt-1"
            >
              {titleError}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col"
        >
          <Label htmlFor="content" className="block text-sm font-medium mb-2 text-gray-400">
            Content:
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter the content of your blog"
            className="mt-1 w-full p-5 focus:ring-2 focus:ring-yellow-500"
          />
          {contentError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 text-sm mt-1"
            >
              {contentError}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col"
        >
          <Label htmlFor="image" className="block text-sm font-medium mb-2 text-gray-400">
            Image URL:
          </Label>
          <Input
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL (optional)"
            className="mt-1 w-full p-5 focus:ring-2 focus:ring-yellow-500"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            type="submit"
            className="w-full py-4 text-white bg-gradient-to-r from-yellow-200 to-red-500 hover:scale-105 transition-transform duration-300"
          >
            Submit
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default BlogUploadForm;
