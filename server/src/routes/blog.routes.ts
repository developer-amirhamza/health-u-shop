import { Router } from 'express';
import { createBlog, deleteBlog, getAllBlogs, getBlogBySlug, updateBlog } from '../controllers/blog.controllers';


const router = Router();

// Public
router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);

// Admin only
router.post('/',  createBlog);
router.put('/:id',  updateBlog);
router.delete('/:id',  deleteBlog);

export default router;