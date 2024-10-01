// src/components/SinglePost.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config';
import '../styles/SinglePost.scss'; // If you need styles

const SinglePost = () => {
  const { category, postname } = useParams(); // Get category and postname from URL parameters
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all posts
    fetch(`${API_URL}posts?_embed`)
      .then((response) => response.json())
      .then((data) => {
        // Find the post based on slug and category
        const foundPost = data.find(post => 
          post.slug === postname && 
          post._embedded['wp:term'][0][0].slug === category
        );
        setPost(foundPost);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [category, postname]);

  if (loading) {
    return <section><div className="wrapper"><p>Loading...</p></div></section>; // Loading during data fetch
  }

  if (!post) {
    return <section><div className="wrapper"><p>Post not found.</p></div></section>; // Message when post is not found
  }

  return (
    <section>
      <article className="single-post">
        <div className="wrapper">
          <div className="content">
            {post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] && (
              <img 
                src={post._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} 
                alt={post.title.rendered} 
                className="featured-image" 
              />
            )}
            <div className="details">
              <h2>{post.title.rendered}</h2>
              <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} /> {/* Displaying content */}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default SinglePost;