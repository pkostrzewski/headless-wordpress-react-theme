import React, { useEffect, useState } from 'react';
import { API_URL } from '../config'; // Using the defined API_URL variable

const Contact = () => {
  const [pageContent, setPageContent] = useState(null); // Stores the contact page data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetching data from WordPress REST API for the "contact" page
    fetch(`${API_URL}pages?slug=contact`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setPageContent(data[0]); // Save the first page's data
        }
        setLoading(false); // End loading
      })
      .catch((error) => {
        console.error('Error fetching contact page content:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <section><div className="wrapper"><p>Loading...</p></div></section>; // Display loading message
  }

  if (!pageContent) {
    return <section><div className="wrapper"><p>Page not found.</p></div></section>; // Display error if the page is not found
  }

  return (
    <section className="contact-page">
      <div className="wrapper">
        <h2>{pageContent.title.rendered}</h2> {/* Display the page title */}
        <div dangerouslySetInnerHTML={{ __html: pageContent.content.rendered }} /> {/* Display the page content */}
      </div>
    </section>
  );
};

export default Contact;