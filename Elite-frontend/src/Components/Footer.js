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
            <a href="" className="navbar__brand">
            <img alt="Elite Sports" src="./favicon.ico" />
          Elite Sports
        </a>
            
            <p className="footer__description">
              Elite Sports is your premier destination for sports field rentals. Whether you're a professional athlete or a weekend warrior, we've got the perfect venue for your game.
            </p>
            <div className="footer__socmed-list">
              <a href="" className="footer__socmed-link">
                <img alt="Facebook" src={facebookIcon} className="footer__socmed-img" />
              </a>
              <a href="" className="footer__socmed-link">
                <img alt="Twitter" src={twitterIcon} className="footer__socmed-img" />
              </a>
              <a href="" className="footer__socmed-link">
                <img alt="Instagram" src={instagramIcon} className="footer__socmed-img" />
              </a>
              <a href="" className="footer__socmed-link">
                <img alt="LinkedIn" src={linkedinIcon} className="footer__socmed-img" />
              </a>
              <a href="" className="footer__socmed-link">
                <img alt="Youtube" src={youtubeIcon} className="footer__socmed-img" />
              </a>
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
            <button className="footer__newsletter-button"  type="submit">
              Subscribe
            </button>
          </form>
        </div>
        <hr />
        <div className="footer__body">
          <div class="footer__body-left" >
            <div class="footer__menu-group">
              <h3 class="footer__menu-title">Sport Fields</h3>
              <div class="footer__menu-list">
                <a href="" class="footer__menu-link">Futsal field</a>
                <a href="" class="footer__menu-link">Badminton court</a>
                <a href="" class="footer__menu-link">Tennis court</a>
                <a href="" class="footer__menu-link"
                  >Football field <span class="footer__menu-badge">New</span></a
                >
                <a href="" class="footer__menu-link">Billiard field</a>
                <a href="" class="footer__menu-link"
                  >Basketball court
                  <span class="footer__menu-badge">New</span></a
                >
                <a href="" class="footer__menu-link">Hockey field</a>
                <a href="" class="footer__menu-link">Golf course</a>
              </div>
            </div>
            <div class="footer__menu-group">
              <h3 class="footer__menu-title">User</h3>
              <div class="footer__menu-list">
                <a href="" class="footer__menu-link">Sports arenas</a>
                <a href="" class="footer__menu-link">Rental history</a>
                <a href="" class="footer__menu-link">Sign in</a>
                <a href="" class="footer__menu-link">Sign up</a>
                <a href="" class="footer__menu-link">Email verification</a>
                <a href="" class="footer__menu-link">Forgot password</a>
              </div>
            </div>
            <div class="footer__menu-group">
              <h3 class="footer__menu-title">Partner</h3>
              <div class="footer__menu-list">
                <a href="" class="footer__menu-link">Sign in partner</a>
                <a href="" class="footer__menu-link">Sign up partner</a>
                <a href="" class="footer__menu-link">Email verification</a>
                <a href="" class="footer__menu-link">Forgot password</a>
              </div>
            </div>
            <div class="footer__menu-group">
              <h3 class="footer__menu-title">Company</h3>
              <div class="footer__menu-list">
                <a href="" class="footer__menu-link">About SportEase</a>
                <a href="" class="footer__menu-link">Blog</a>
                <a href="" class="footer__menu-link">FAQ</a>
                <a href="" class="footer__menu-link">Contact</a>
                <a href="" class="footer__menu-link">Sitemap</a>
              </div>
            </div>
            <div class="footer__menu-group">
              <h3 class="footer__menu-title">Policy</h3>
              <div class="footer__menu-list">
                <a href="" class="footer__menu-link">Privacy policy</a>
                <a href="" class="footer__menu-link">Terms of service</a>
                <a href="" class="footer__menu-link">Disclaimer</a>
              </div>
            </div>
          </div>
          <div class="footer__body-right" >
            <h3 class="footer__menu-title">Explore by city</h3>
            <div class="footer__card-list">
              <div class="footer__card-item">
                <img
                  alt=""
                  src={surabayaImage}
                  class="footer__card-img"
                />
                <div class="footer__card-body">
                  <h4 class="footer__card-title">
                    <a href="/fields">New York City, USA</a>
                    <i><img alt="See" src={arrowRightIcon} /></i>
                  </h4>
                  <p class="footer__card-description">
                    Central Park: Enjoy a variety of sports activities including baseball, soccer, and volleyball in the heart of Manhattan.
            </p>
                </div>
              </div>
              <div class="footer__card-item" >
                <img
                  alt="Tokyo, Japan"
                  src={tokyoImage}
                  class="footer__card-img"
                />
                <div class="footer__card-body">
                  <h4 class="footer__card-title">
                    <a href="/fields">Tokyo, Japan</a>
                    <i><img alt="See" src={arrowRightIcon} /></i>
                  </h4>
                  <p class="footer__card-description">
                    Yoyogi Park: Engage in recreational sports like jogging, tennis, and cycling amidst serene greenery in Shibuya.
                  </p>
                </div>
              </div>
              <div class="footer__card-item" >
                <img
                  alt="Paris, France"
                  src={parisImage}
                  class="footer__card-img"
                />
                <div class="footer__card-body">
                  <h4 class="footer__card-title">
                    <a href="/fields">Paris, France</a>
                    <i><img alt="See" src={arrowRightIcon} /></i>
                  </h4>
                  <p class="footer__card-description">
                    Bois de Vincennes: Unwind in the largest public park in Paris, offering numerous fields for soccer, rugby, and cricket on the eastern edge of the city.
            </p>
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
    </div>
    
  );
};

export default Footer;
