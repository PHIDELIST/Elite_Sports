import React, { useState, useEffect } from 'react';
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
import "../css/style.css"


const FieldsPage = () => {
 
  const [fields, setFields] = useState([]);

  // Fetch fields data from API endpoint when the component mounts
  useEffect(() => {
    fetch('')
      .then(response => response.json())
      .then(data => {
        // Set the fetched data to the fields state
        setFields(data);
      })
      .catch(error => {
        console.error('Error fetching fields:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
    <Navbar/>
    <main>
    <form action="" className="container filter" >
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
        <div className="fields__header" >
          <h2>Fields</h2>
        </div>
        <div className="fields__body">
          {/* Render fetched fields dynamically */}
          {fields.map(field => (
            <div className="fields__card" data-animated key={field.id}>
              <div className="fields__card-top">
                <img alt="" src={field.imageUrl} className="fields__card-img" />
                <button className="fields__card-favorite" data-field-id={field.id}>
                  <img alt="Favorite" src="./img/icons/heart-black.png" />
                  <img alt="Favorite" src="./img/icons/heart-solid-primary.png" />
                </button>
              </div>
              <div className="fields__card-body">
                <p className="fields__card-price">${field.price}</p>
                <h3 className="fields__card-name">
                  <a href="#">{field.name}</a>
                </h3>
                <p className="fields__card-location">
                  <img alt="Location" src="./img/icons/location-gray.png" />{field.location}
                </p>
                <hr />
                <div className="fields__card-feature-list">
                  {/* Render additional field features dynamically */}
                  <div className="fields__card-feature-item">
                    <img alt="Category" src="./img/icons/grid-8-gray.png" />
                    <span>{field.category}</span>
                  </div>
                  <div className="fields__card-feature-item">
                    <img alt="Size" src="./img/icons/crop-gray.png" />
                    <span>{field.size}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
    <Footer/>
    </div>
  );
};

export default FieldsPage;
