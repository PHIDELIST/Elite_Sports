import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { addFavorite, deleteFavorite, getFavorites } from '../utils';
import Navbar from './Navbar';
import "../css/style.css";
import hero1Img from '../img/heros/hero-1.png';
import hero2Img from '../img/heros/hero-2.png';
import hero3Img from '../img/heros/hero-3.png';
import hero4Img from '../img/heros/hero-4.png';
import field1Img from '../img/fields/field-1.png';
import field2Img from '../img/fields/field-2.png';
import how1Img from '../img/how/how-1.png';
import how2Img from '../img/how/how-2.png';
import how3Img from '../img/how/how-3.png';
import promotion1Img from '../img/promotions/promotion-1.png';
import promotion2Img from '../img/promotions/promotion-2.png';
import heartBlackIcon from '../img/icons/heart-black.png';
import heartSolidPrimaryIcon from '../img/icons/heart-solid-primary.png';
import location from "../img/icons/location-gray.png";
import gridGrayIcon from '../img/icons/grid-8-gray.png';
import cropGrayIcon from '../img/icons/crop-gray.png';
import lampGrayIcon from '../img/icons/lamp-gray.png';
import magn from "../img/icons/magnifier.png"
import clock from "../img/icons/clock-gray.png"
import Footer from './Footer';

const LandingPage = () => {
  const [featuredFieldsData, setFeaturedFieldsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mrndvidzee.execute-api.us-east-1.amazonaws.com/prod/items');
        setFeaturedFieldsData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const landingPageLogic = () => {
      const featuredFieldTogglers = document.querySelectorAll(".featured-fields__card-favorite");
      const favorites = getFavorites();

      featuredFieldTogglers.forEach((toggler) => {
        const id = toggler.dataset.fieldId;

        var index = favorites.indexOf(id);
        if (index !== -1) {
          toggler.classList.add("featured-fields__card-favorite_active");
        } else {
          toggler.classList.remove("featured-fields__card-favorite_active");
        }

        toggler.addEventListener("click", () => {
          if (toggler.classList.contains("featured-fields__card-favorite_active")) {
            toggler.classList.remove("featured-fields__card-favorite_active");
            deleteFavorite(id);
            return;
          }

          toggler.classList.add("featured-fields__card-favorite_active");
          addFavorite(id);
        });
      });

      const filterForm = document.querySelector("form.filter");
      const button = filterForm.querySelector("button");
      const selects = filterForm.querySelectorAll("select");
      const dateInputs = filterForm.querySelectorAll("input[type='date']");

      selects.forEach((select) => {
        select.addEventListener("change", () => {
          button.click();
        });
      });

      dateInputs.forEach((input) => {
        input.addEventListener("input", () => {
          button.click();
        });
      });
    };

    window.addEventListener("load", landingPageLogic);

    return () => {
      window.removeEventListener("load", landingPageLogic);
    };
  }, []);



 
  const renderFeaturedFields = () => {
    return featuredFieldsData.map(field => (
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
            <a href="/fields">{field.name}</a>
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
    ));
  };

  return (
    <div>
      <Navbar />
      <main>
        <div className="container hero">
          <div className="hero__left">
            <h1 className="hero__title">Rent our fields and conquer the game</h1>
            <p className="hero__subtitle">
              Elite Sports provides top-notch sports fields for rent, enabling you to elevate your game to new heights.
            </p>
            <a href="/fields" className="hero__button">Get started</a>
          </div>
          <div className="hero__right">
            <div className="hero__img-group">
              <img alt="Field" src={hero1Img} />
              <img alt="Field" src={hero2Img} />
            </div>
            <div className="hero__img-group">
              <img alt="Field" src={hero3Img} />
              <img alt="Field" src={hero4Img} />
            </div>
          </div>
        </div>

        <form action="" className="container filter">
          <div className="filter__search">
            <label htmlFor="search">
              <img alt="            Search" src={magn} />
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
        <div className="container featured-fields">
          <div className="featured-fields__header" >
            <h2>Featured fields</h2>
            <a href="/fields">Browse all fields</a>
          </div>
          <div className="featured-fields__body">
            {renderFeaturedFields()}
          </div>
        </div>

        <div className="container how">
          <h2 className="how__header">
            How to rent a field in 3 easy steps
          </h2>
          <div className="how__body">
            <div className="how__list">
              <div className="how__item">
                <img alt="Step 1" src={how1Img} className="how__img" />
                <h3 className="how__title">1. Choose your preferred field</h3>
                <p className="how__description">
                  Browse through our selection of fields and select the one that best suits your sporting needs.
                </p>
              </div>
              <div className="how__item">
                <img alt="Step 2" src={how2Img} className="how__img" />
                <h3 className="how__title">
                  2. Reserve your playing time
                </h3>
                <p className="how__description">
                  Book your desired time slot and secure your spot on the field.
                </p>
              </div>
              <div className="how__item">
                <img alt="Step 3" src={how3Img} className="how__img" />
                <h3 className="how__title">
                  3. Pay and enjoy your game
                </h3>
                <p className="how__description">
                  Complete your payment and get ready to experience the thrill of playing on our top-quality fields.
                </p>
              </div>
            </div>
            <a href="/fields" className="how__button">Explore fields</a>
          </div>
        </div>
        <div className="promotion">
          <div className="container promotion__container">
            <div className="promotion__left">
              <h2 className="promotion__title">
                Experience the best field rental service
              </h2>
              <p className="promotion__description">
                At Elite Sports, we're committed to providing you with the ultimate field rental experience. Join us today and take your game to the next level!
              </p>
              <a href="/fields" className="promotion__button">Explore fields</a>
            </div>
            <div className="promotion__right">
              <img alt="Promotion" src={promotion1Img} className="promotion__img" />
              <img alt="Promotion" src={promotion2Img} className="promotion__img" data-animated />
            </div>
          </div>
        </div>

        <div className="container join">
          <div className="join__card join__card_partner">
            <h2 className="join__title">List your field today</h2>
            <p className="join__description">
              Showcase your sports field to our community of passionate athletes. Join us as a partner today and start earning!
            </p>
            <a href="/login" className="join__button join__button_primary">Join as a partner</a>
          </div>
          <div className="join__card">
            <h2 className="join__title">Rent our field today</h2>
            <p className="join__description">
              Ready to play? Rent one of our premium sports fields and experience the thrill of the game like never before.
            </p>
            <a href="/login" className="join__button">Join as a user</a>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default LandingPage;

