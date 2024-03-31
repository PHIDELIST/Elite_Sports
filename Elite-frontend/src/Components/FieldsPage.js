import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import magn from "../img/icons/magnifier.png";
import clock from "../img/icons/clock-gray.png";
import heartBlackIcon from '../img/icons/heart-black.png';
import heartSolidPrimaryIcon from '../img/icons/heart-solid-primary.png';
import locationIcon from "../img/icons/location-gray.png";
import gridGrayIcon from '../img/icons/grid-8-gray.png';
import cropGrayIcon from '../img/icons/crop-gray.png';
import lampGrayIcon from '../img/icons/lamp-gray.png';
import { Link } from 'react-router-dom';
import field2Img from '../img/fields/field-2.png';
import "../css/style.css";

const FieldsPage = () => {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const headers = {
          'Authorization': `Bearer ${token}`
        };
        const response = await axios.get('https://mrndvidzee.execute-api.us-east-1.amazonaws.com/prod/items',
        { headers });
        setFields(response.data);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };

    fetchData();
  }, []);

  const openFieldModal = (field) => {
    setSelectedField(field);
    setModalOpen(true);
  };

  const closeFieldModal = () => {
    setSelectedField(null);
    setModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const updatedField = { ...selectedField, reserved: true };
      const id = selectedField.userId;
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://mrndvidzee.execute-api.us-east-1.amazonaws.com/prod/items/${id}`,
        updatedField,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
          }
        }
      );

      alert('Reservation submitted successfully!');
      closeFieldModal(); 
    } catch (error) {
      console.error('Error submitting reservation:', error);
      alert('Failed to submit reservation. Please try again later.');
    }
  };

  const filteredFields = fields.filter(field =>
    field && field.name &&
    field.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (locationFilter === "" || field.location === locationFilter) &&
    (categoryFilter === "" || field.category === categoryFilter)
  );

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleLocationChange = event => {
    setLocationFilter(event.target.value);
  };

  const handleCategoryChange = event => {
    setCategoryFilter(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <main>
        <form action="" className="container filter">
          <div className="filter__search">
            <label htmlFor="search">
              <img alt="Search" src={magn} />
            </label>
            <input
              id="search"
              name="search"
              type="search"
              placeholder="Search for fields"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit">Search</button>
          </div>
          <div className="filter__list">
            <div className="filter__item">
              <label htmlFor="location">
                <img alt="Location" src={locationIcon} />
              </label>
              <select id="location" name="location" value={locationFilter} onChange={handleLocationChange}>
                <option value="">All Locations</option>
                {fields.map(field => (
                  <option key={field.id} value={field.location}>{field.location}</option>
                ))}
              </select>
            </div>
            <div className="filter__item">
              <label htmlFor="category">
                <img alt="Category" src={gridGrayIcon} />
              </label>
              <select id="category" name="category" value={categoryFilter} onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {fields.map(field => (
                  <option key={field.id} value={field.category}>{field.category}</option>
                ))}
              </select>
            </div>
          </div>
        </form>

        <div className="container fields">
          <div className="fields__header">
            <h2>Fields</h2>
          </div>
          <div className="featured-fields__body">
            {filteredFields.map(field => (
              <div className="featured-fields__card" key={field.id}>
                <div className="featured-fields__card-left">
                  <img alt="" src={field2Img} className="featured-fields__card-img" />
                  <Link className="nav" to="/fields"></Link>
                  <button className="featured-fields__card-favorite" data-field-id={field.id}>
                    <img alt="Favorite" src={heartBlackIcon} />
                    <img alt="Favorite" src={heartSolidPrimaryIcon} />
                  </button>
                  <button className="featured-fields__card-feature-item" onClick={() => { openFieldModal(field) }}><span>Reserve</span></button>
                </div>
                <div className="featured-fields__card-right">
                  <div className="featured-fields__card-top">
                    <p className="featured-fields__card-location">
                      <img alt="Location" src={locationIcon} />{field.location}
                    </p>
                    <p className="featured-fields__card-price">{field.price}</p>
                  </div>
                  <h3 className="featured-fields__card-name">
                    <a>{field.name}</a>
                  </h3>
                  <p className="featured-fields__card-description">
                    {field.description}
                  </p>
                  <hr />
                  <div className="featured-fields__card-feature-list">
                    <div className="featured-fields__card-feature-item">
                      <img alt="Category" src={gridGrayIcon} />
                      <span>{field.category}</span>
                    </div>
                    <div className="featured-fields__card-feature-item">
                      <img alt="Size" src={cropGrayIcon} />
                      <span>{field.size}</span>
                    </div>
                    <div className="featured-fields__card-feature-item">
                      <img alt="Lamp" src={lampGrayIcon} />
                      <span>{field.lamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeFieldModal}>&times;</span>
            <h2>{selectedField.name}</h2>
            <p>Location: {selectedField.location}</p>
            <p>Price: {selectedField.price}</p>
            <p>Description: {selectedField.description}</p>
            <p>Category: {selectedField.category}</p>
            <p>Size: {selectedField.size}</p>
            <p>Lamp: {selectedField.lamp}</p>
            <button onClick={handleSubmit}>Submit Reservation</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default FieldsPage;
