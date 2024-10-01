import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import Modal from './Modal';
import '../styles/Portfolio.scss';

const Portfolio = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null); // Index of the selected post
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetching data from WordPress REST API for portfolio
    fetch(`${API_URL}portfolio?_embed`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLoading(false); // End loading
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // End loading on error
      });
  }, []);

  const handleOpenModal = (index) => {
    setSelectedPostIndex(index); // Set the index of the selected post
  };

  const handleCloseModal = () => {
    setSelectedPostIndex(null); // Reset the selected post
  };

  const handlePrevPost = () => {
    setSelectedPostIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : posts.length - 1
    ); // Move to the previous post
  };

  const handleNextPost = () => {
    setSelectedPostIndex((prevIndex) => 
      prevIndex < posts.length - 1 ? prevIndex + 1 : 0
    ); // Move to the next post
  };

  if (loading) {
    return (
      <section>
        <div className="wrapper">
          <p>Loading...</p>
        </div>
      </section>
    ); // Display loading message
  }

  if (!posts || posts.length === 0) {
    return (
      <section>
        <div className="wrapper">
          <p>Page not found.</p>
        </div>
      </section>
    ); // Display error if the page is not found
  }

  return (
    <>
      <section className="portfolio">
        <div className="wrapper">
          <h2>Portfolio</h2>
          <div className="portfolio-posts">
            {posts.map((post, index) => (
              <div key={post.id} className="portfolio-post" onClick={() => handleOpenModal(index)}>
                <img
                  src={post.featured_image_url} // Use the URL for the image
                  alt={post.title.rendered}
                  className="featured-image"
                />
                <h3>{post.title.rendered}</h3> {/* Removed link to the post */}
                <div className="overlay"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for displaying larger image, title, and content */}
      {selectedPostIndex !== null && (
        <Modal onClose={handleCloseModal} isOpen={selectedPostIndex !== null}>
          <div className="modal-content">
            <div className="modal-image-full">
              <img
                src={posts[selectedPostIndex].featured_image_url}
                alt={posts[selectedPostIndex].title.rendered}
                className="modal-image"
              />
              {/* Navigation arrows */}
              <div className="modal-navigation">
                <button onClick={handlePrevPost} className="modal-arrow left-arrow">&lt;</button>
                <button onClick={handleNextPost} className="modal-arrow right-arrow">&gt;</button>
              </div>
            </div>
            <h3>{posts[selectedPostIndex].title.rendered}</h3>
            <div dangerouslySetInnerHTML={{ __html: posts[selectedPostIndex].content.rendered }} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default Portfolio;