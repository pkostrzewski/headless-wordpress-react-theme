import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { API_URL } from '../config';
import Services from './Services';
import Portfolio from './Portfolio';
import ProjectDescription from './ProjectDescription';
import '../styles/HomePage.scss';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Pobieranie danych z REST API WordPress
    fetch(`${API_URL}posts?_embed`) // Użycie parametru _embed, aby włączyć media
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.log(error));
  }, []);

  const getExcerpt = (content) => {
    const words = content.split(/\s+/); // Podział treści na słowa
    return words.slice(0, 28).join(' ') + (words.length > 28 ? '...' : ''); // Połączenie pierwszych 28 słów
  };

  return (
    <>
    <ProjectDescription />
    <Services />
    <Portfolio />
    <section className="home-page">
      <div className="wrapper">
        <h2>Blog</h2> {/* Zmieniono na polski */}
        <div className="latest-posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            {/* Sprawdzanie, czy post ma obrazek wyróżniający */}
            {post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] && (
              <img 
                src={post._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url} 
                alt={post.title.rendered} 
                className="featured-image" 
              />
            )}
            <div className="details">
              <h3>
                <Link to={`/${post._embedded['wp:term'][0][0].slug}/${post.slug}`}>
                  {post.title.rendered}
                </Link>
              </h3>
              <div dangerouslySetInnerHTML={{ __html: getExcerpt(post.content.rendered) }} />
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default HomePage;