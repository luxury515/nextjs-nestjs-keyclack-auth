'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '../../contexts/AuthContext'
import Image from 'next/image'

interface BlogPost {
  bltn_no: string;
  titl: string;
  contt: string;
  thumbnail_img_url: string;
  tag: string;
  inpt_dtm: string;
}

export default function BlogPostPage() {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isAuthenticated } = useAuth()
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    if (isAuthenticated) {
      fetchPost()
    }
  }, [id, isAuthenticated])

  const fetchPost = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/blog/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch post')
      }
      const data = await response.json()
      setPost(data)
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return <div>Please log in to view this blog post.</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!post) {
    return <div>Blog post not found.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.titl}</h1>
      <Image 
        src={post.thumbnail_img_url || '/placeholder.svg'} 
        alt={post.titl} 
        width={800} 
        height={400} 
        className="w-full h-64 object-cover mb-4" 
      />
      <p className="text-gray-600 mb-4">{post.contt}</p>
      <p className="text-sm text-gray-500">Tags: {post.tag}</p>
      <p className="text-sm text-gray-500">Date: {new Date(post.inpt_dtm).toLocaleDateString()}</p>
    </div>
  )
}