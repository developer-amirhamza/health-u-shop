"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Axios from '@/utils/Axios'
import { SummeryApi } from '@/app/common/SummeryApi'

interface Blog {
    id: string
    title: string
    slug: string
    excerpt: string
    featuredImage: string
    category: string
    publishedAt: string
    readTime?: number
}

const CareGuidesSection = () => {
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        Axios({ ...SummeryApi.getAllBlogs, params: { page: 1, limit: 3 } })
            .then((res) => {
                if (res.data?.success) setBlogs(res.data.data.slice(0, 3))
            })
            .catch(() => {})
    }, [])

    if (blogs.length === 0) return null

    return (
        <section className="bg-white py-14">
            <div className="container mx-auto px-6">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">Care Guides</p>
                        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight max-w-sm">
                            Practical advice from Australian clinicians
                        </h2>
                        <p className="text-gray-500 text-sm mt-2">
                            Honest, evidence-based articles to support you and your loved ones.
                        </p>
                    </div>
                    <Link href="/blog" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:underline whitespace-nowrap">
                        All articles →
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <Link key={blog.id} href={`/blog/${blog.slug}`}
                            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-52 overflow-hidden">
                                {blog.featuredImage ? (
                                    <img src={blog.featuredImage} alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                ) : (
                                    <div className="w-full h-full bg-blue-50 flex items-center justify-center text-red-600 text-4xl font-bold">
                                        {blog.title[0]}
                                    </div>
                                )}
                            </div>
                            <div className="p-5 flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    {blog.category && (
                                        <span className="text-xs font-semibold bg-blue-50 text-red-600 px-2.5 py-1 rounded-full">
                                            {blog.category}
                                        </span>
                                    )}
                                    <span className="text-xs text-gray-400">· {blog.readTime ?? 5} min read</span>
                                </div>
                                <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                                    {blog.title}
                                </h3>
                                {blog.excerpt && (
                                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{blog.excerpt}</p>
                                )}
                                <span className="text-sm font-semibold text-red-600 mt-1 inline-flex items-center gap-1">
                                    Read article →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="sm:hidden mt-6 text-center">
                    <Link href="/blog" className="text-sm font-semibold text-red-600 hover:underline">All articles →</Link>
                </div>
            </div>
        </section>
    )
}

export default CareGuidesSection