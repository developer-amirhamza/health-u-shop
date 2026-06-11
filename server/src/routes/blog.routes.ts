import { Router } from 'express';
import { createBlog, deleteBlog, getAllBlogs, getBlogById, getBlogBySlug, updateBlog } from '../controllers/blog.controllers';


const router = Router();

// Public
router.get('/all', getAllBlogs);
router.post('/by-slug', getBlogBySlug);
router.post('/by-id', getBlogById);

// Admin only
router.post('/create',  createBlog);
router.put('/update',  updateBlog);
router.delete('/delete',  deleteBlog);

export default router;