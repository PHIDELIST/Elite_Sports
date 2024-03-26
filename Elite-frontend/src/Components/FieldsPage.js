import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import magn from "../img/icons/magnifier.png"
import clock from "../img/icons/clock-gray.png"
import Footer from './Footer';
import heartBlackIcon from '../img/icons/heart-black.png';
import heartSolidPrimaryIcon from '../img/icons/heart-solid-primary.png';
import location from "../img/icons/location-gray.png";
import gridGrayIcon from '../img/icons/grid-8-gray.png';
import cropGrayIcon from '../img/icons/crop-gray.png';
import lampGrayIcon from '../img/icons/lamp-gray.png';
import field1Img from '../img/fields/field-1.png';
import field2Img from '../img/fields/field-2.png';
import "../css/style.css"

const FieldsPage = () => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mrndvidzee.execute-api.us-east-1.amazonaws.com/prod/items');
        setFields(response.data);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };

    fetchData();
  }, []);
  console.log(fields);
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
            />
            <button type="submit">Search</button>
          </div>
          <div className="filter__list">
            <div className="filter__item">
              <label htmlFor="location">
                <img alt="Location" src={location} />
              </label>
              <select id="location" name="location">
                <option value="" disabled>Location</option>
                <option value="location-1">Location 1</option>
                <option value="location-2">Location 2</option>
                <option value="location-3">Location 3</option>
              </select>
            </div>
            <div className="filter__item">
              <label htmlFor="category">
                <img alt="Category" src={gridGrayIcon} />
              </label>
              <select id="category" name="category">
                <option value="" disabled>Category</option>
                <option value="category-1">Category 1</option>
                <option value="category-2">Category 2</option>
                <option value="category-3">Category 3</option>
              </select>
            </div>
            <div className="filter__item">
              <label htmlFor="time">
                <img alt="Time" src={clock} />
              </label>
              <input id="time" name="time" type="date" />
            </div>
          </div>
        </form>

        <div className="container fields">
          <div className="fields__header">
            <h2>Fields</h2>
          </div>
          <div className="fields__body">
            {fields.map(field => (
              <div className="featured-fields__card" key={field.id}>
                <div className="featured-fields__card-left">
                  <img alt="" src={field2Img} className="featured-fields__card-img" />
                  <button className="featured-fields__card-favorite" data-field-id={field.id}>
                    <img alt="Favorite" src={heartBlackIcon} />
                    <img alt="Favorite" src={heartSolidPrimaryIcon} />
                  </button>
                </div>
                <div className="featured-fields__card-right">
                  <div className="featured-fields__card-top">
                    <p className="featured-fields__card-location">
                      <img alt="Location" src={location} />{field.location}
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
      <Footer />
    </div>
  );
};

export default FieldsPage;
