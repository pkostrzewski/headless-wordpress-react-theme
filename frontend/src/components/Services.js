import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import '../styles/Services.scss';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetch(`${API_URL}services`)
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Stop loading if there's an error
      });
  }, []);

  if (loading) {
    return (
      <section>
        <div className="wrapper">
          <p>Loading...</p> {/* Display loading message */}
        </div>
      </section>
    );
  }

  if (!services.length) {
    return (
      <section>
        <div className="wrapper">
          <p>Page not found.</p> {/* Display error if no services are found */}
        </div>
      </section>
    );
  }

  return (
    <section className="services">
      <div className="wrapper">
        <h2>Our Services</h2>
        <div className="all-services">
          {services.map((service) => (
            <div key={service.id} className="service-item">
              {/* Displaying the icon above the title */}
              {service.service_icon && (
                <img 
                  src={service.service_icon} 
                  alt={`${service.title.rendered} icon`} 
                  style={{ maxWidth: '50px', height: 'auto' }}
                />
              )}
              <div className="details">
                <h3>{service.title.rendered}</h3>
                <div dangerouslySetInnerHTML={{ __html: service.content.rendered }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;