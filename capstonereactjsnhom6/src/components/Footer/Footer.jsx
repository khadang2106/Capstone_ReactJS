import React from 'react';

export default function Footer() {
  return (
    <div className="footer">
      <div className="container py-2">
        <div className="footer-body row p-1">
          <div className="footer-item content col-sm-7 col-md-6 col-lg-4 pr-lg-5">
            <a href="#" className="footer-item__top">
              CYBERCINE
            </a>
            <p>
              We pride ourselves on our efficiency and hard work, but most of
              all our ability to source you the best quality and best value
              movies.
            </p>
          </div>
          <div className="footer-item brand col-6 col-sm-5 col-md-6 col-lg-2 mt-3 mt-sm-0">
            <h4>POLICY</h4>
            <ul className="mt-4">
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Security</a>
              </li>
            </ul>
          </div>
          <div className="footer-item support col-6 col-sm-5 col-md-6 col-lg-3 mt-3 mt-lg-0">
            <h4>INFORMATION</h4>
            <ul className="mt-4">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">News</a>
              </li>
              <li>
                <a href="#">Setting</a>
              </li>
              <li>
                <a href="#">Helps</a>
              </li>
            </ul>
          </div>
          <div className="footer-item contact col-sm-7 col-md-6 col-lg-3 mt-0 mt-sm-3 mt-lg-0">
            <h4>CONTACT</h4>
            <ul className="mt-4">
              <li>
                <a href="mailto:CyberStore@gmail.com">
                  <i className="fa fa-envelope" />
                  <span>CyberCine@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+0961051014">
                  <i className="fa fa-phone" />
                  <span>096.105.1014</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/messages/t/6007860205969625"
                  target="_blank"
                >
                  <i className="fab fa-facebook-messenger" />
                  <span>Messenger</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container d-sm-flex justify-content-between">
          <div className="footer-copyright__text">
            <span>© 2023 Copyright : </span>
            <a href="https://cybersoft.edu.vn/bootcamp-lap-trinh-fullstack-javascript-tu-zero-co-viec-lam/">
              CyberCine
            </a>
          </div>
          <div className="footer-socials d-lg-flex mt-1 mt-sm-0">
            <span>Get connected with us on social networks:</span>
            <div className="socials-icon mt-1 mt-sm-0">
              <a href="#">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="#">
                <i className="fab fa-twitter" />
              </a>
              <a href="#">
                <i className="fab fa-google-plus-g" />
              </a>
              <a href="#">
                <i className="fab fa-instagram" />
              </a>
              <a href="#">
                <i className="fab fa-github" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
