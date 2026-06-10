"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Axios from '@/utils/Axios';
import { SummeryApi } from '@/app/common/SummeryApi';
import Loader from '@/app/components/UI/Loader';
import { format } from 'date-fns';
import Image from 'next/image';

// interface Blog {
//   id: string;
//   title: string;
//   content: string;
//   featuredImage: string;
//   category: string;
//   tags: string[];
//   publishedAt: string;
// //   author: { name: string; avatar?: string };
//   views: number;
// }

const BlogDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true);
  const blog:any = blogs[0]
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await Axios({ ...SummeryApi.getBlogBySlug, params: { slug } });
        if (response.data?.success) setBlogs(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchBlog();
  }, [slug]);

  if (loading) return <div className="flex justify-center py-20"><Loader /></div>;
  if (!blog) return <div className="text-center py-20">Blog not found</div>;

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      {blog.featuredImage && (
        <img src={blog.featuredImage} alt={blog.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      )}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
      <div className="flex items-center gap-4 text-gray-500 mb-6">
        {/* <span>{format(new Date(blog.publishedAt), 'MMMM dd, yyyy')}</span> */}
        <span>{blog.views} views</span>
      </div>
      {blog.category && (
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Category: {blog.category}</span>
        </div>
      )}
      {/* {blog.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.map(tag => (
            <span key={tag} className="bg-gray-100 px-2 py-1 rounded text-sm">#{tag}</span>
          ))}
        </div>
      )} */}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </article>
  );
};

export default BlogDetailPage;