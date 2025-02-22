// utils/blogApi.js
export const fetchBlogs = async () => {
  try {
    const response = await fetch('/api/displayblogs');
    
    if (!response.ok) {
      throw new Error('Error fetching blogs');
    }

    const data = await response.json();
    
    if (data.success) {
      return data.blogs;  
    } else {
      throw new Error('No blogs found');
    }
  } catch (err) {
    throw new Error(err.message || 'Error fetching blogs');
  }
};

export const fetchBlogPostById = async (id) => {
  try {
    const response = await fetch(`/api/fetchblog/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch the blog post');
    }

    const data = await response.json();
    
    if (data.success) {
      return data.blog;  // Return the blog post if success
    } else {
      throw new Error(data.message || 'Failed to fetch the blog post');
    }
  } catch (err) {
    throw new Error(err.message || 'Error fetching the blog post');
  }
};

