import React from 'react';
import sportEaseLogo from '../img/sportease.png';
import facebookIcon from '../img/icons/facebook.png';
import twitterIcon from '../img/icons/twitter.png';
import instagramIcon from '../img/icons/instagram.png';
import linkedinIcon from '../img/icons/linkedin-in.png';
import youtubeIcon from '../img/icons/youtube.png';
import emailIcon from '../img/icons/email.png';
import arrowRightIcon from '../img/icons/arrow-right.png';
import surabayaImage from '../img/cities/surabaya.png';
import tokyoImage from '../img/cities/gresik.png';
import parisImage from '../img/cities/malang.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__header" >
          <div className="footer__header-left">
            <span className="navbar__brand">
              <img alt="Elite Sports" src="./favicon.ico" />
              Elite Sports
            </span>
            
            <p className="footer__description">
              Elite Sports is your premier destination for sports field rentals. Whether you're a professional athlete or a weekend warrior, we've got the perfect venue for your game.
            </p>
            <div className="footer__socmed-list">
              <span className="footer__socmed-link">
                <img alt="Facebook" src={facebookIcon} className="footer__socmed-img" />
              </span>
              <span className="footer__socmed-link">
                <img alt="Twitter" src={twitterIcon} className="footer__socmed-img" />
              </span>
              <span className="footer__socmed-link">
                <img alt="Instagram" src={instagramIcon} className="footer__socmed-img" />
              </span>
              <span className="footer__socmed-link">
                <img alt="LinkedIn" src={linkedinIcon} className="footer__socmed-img" />
              </span>
              <span className="footer__socmed-link">
                <img alt="Youtube" src={youtubeIcon} className="footer__socmed-img" />
              </span>
            </div>
          </div>
          <form action="" className="footer__header-right">
            <h3 className="footer__newsletter-title">
              Subscribe to our newsletter
            </h3>
            <div className="footer__newsletter-input-group">
              <input
                id="newsletter"
                placeholder="Enter your email address"
                required
                type="email"
              />
              <label htmlFor="newsletter">
                <img alt="Email" src={emailIcon} />
              </label>
            </div>
            <button className="footer__newsletter-button" type="submit">
              Subscribe
            </button>
          </form>
        </div>
        <hr />
        <div className="footer__body">
          <div className="footer__body-left" >
            <div className="footer__menu-group">
              <h3 className="footer__menu-title">Sport Fields</h3>
              <div className="footer__menu-list">
                <span className="footer__menu-link">Futsal field</span>
                <span className="footer__menu-link">Badminton court</span>
                <span className="footer__menu-link">Tennis court</span>
                <span className="footer__menu-link">Football field <span className="footer__menu-badge">New</span></span>
                <span className="footer__menu-link">Billiard field</span>
                <span className="footer__menu-link">Basketball court <span className="footer__menu-badge">New</span></span>
                <span className="footer__menu-link">Hockey field</span>
                <span className="footer__menu-link">Golf course</span>
              </div>
            </div>
            <div className="footer__menu-group">
              <h3 className="footer__menu-title">User</h3>
              <div className="footer__menu-list">
                <span className="footer__menu-link">Sports arenas</span>
                <span className="footer__menu-link">Rental history</span>
                <span className="footer__menu-link">Sign in</span>
                <span className="footer__menu-link">Sign up</span>
                <span className="footer__menu-link">Email verification</span>
                <span className="footer__menu-link">Forgot password</span>
              </div>
            </div>
            <div className="footer__menu-group">
              <h3 className="footer__menu-title">Partner</h3>
              <div className="footer__menu-list">
                <span className="footer__menu-link">Sign in partner</span>
                <span className="footer__menu-link">Sign up partner</span>
                <span className="footer__menu-link">Email verification</span>
                <span className="footer__menu-link">Forgot password</span>
              </div>
            </div>
            <div className="footer__menu-group">
              <h3 className="footer__menu-title">Company</h3>
              <div className="footer__menu-list">
                <span className="footer__menu-link">About SportEase</span>
                <span className="footer__menu-link">Blog</span>
                <span className="footer__menu-link">FAQ</span>
                <span className="footer__menu-link">Contact</span>
                <span className="footer__menu-link">Sitemap</span>
              </div>
            </div>
            <div className="footer__menu-group">
              <h3 className="footer__menu-title">Policy</h3>
              <div className="footer__menu-list">
                <span className="footer__menu-link">Privacy policy</span>
                <span className="footer__menu-link">Terms of service</span>
                <span className="footer__menu-link">Disclaimer</span>
              </div>
            </div>
          </div>
          <div className="footer__body-right" >
            <h3 className="footer__menu-title">Explore by city</h3>
            <div className="footer__card-list">
              <div className="footer__card-item">
                <img
                  alt=""
                  src={surabayaImage}
                  className="footer__card-img"
                />
                <div className="footer__card-body">
                  <h4 className="footer__card-title">
                    <span>New York City, USA</span>
                    <i><img alt="See" src={arrowRightIcon} /></i>
                  </h4>
                  <p className="footer__card-description">
                    Central Park: Enjoy a variety of sports activities including baseball, soccer, and volleyball in the heart of Manhattan.
                  </p>
                </div>
              </div>
              <div className="footer__card-item" >
                <img
                  alt="Tokyo, Japan"
                  src={tokyoImage}
                  className="footer__card-img"
                />
                <div className="footer__card-body">
                  <h4 className="footer__card-title">
                    <span>Tokyo, Japan</span>
                    <i><img alt="See" src={arrowRightIcon} /></i>
                  </h4>
                  <p className="footer__card-description">
                    Yoyogi Park: Engage in recreational sports like jogging, tennis, and cycling amidst serene greenery in Shibuya.
                  </p>
                </div>
              </div>
              <div className="footer__card-item" >
                <img
                  alt="Paris, France"
                  src={parisImage}
                  className="footer__card-img"
                />
                <div className="footer__card-body">
                  <h4 className="footer__card-title">
                    <span>Paris, France</span>
                    <i><img alt="See" src={arrowRightIcon} /></i>
                  </h4>
                  <p className="footer__card-description">
                    Bois de Vincennes: Unwind in the largest public park in Paris, offering numerous fields for soccer, rugby, and cricket on the eastern edge of the city.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <p className="footer__copyright">
          Copyright © 2024 | Elite Sports | All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;

