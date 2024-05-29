// eslint-disable-next-line no-unused-vars
import React from 'react';
import './Contatti.css';

function Contatti() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-lg-6">
          {/* Section Heading */}
         
        </div>
      </div>
      <div className="row">
        {/* Single Advisor */}
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.2s" style={{ visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp' }}>
            {/* Team Thumb */}
            <div className="advisor_thumb">
              <img src="Kekko.png" alt="Lorenzo Calabrese" />
              {/* Social Info */}
              <div className="social-info">
                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-linkedin"></i></a>
              </div>
            </div>
            {/* Team Details */}
            <div className="single_advisor_details_info">
              <h6>Lorenzo Calabrese</h6>
              <p className="designation">Frontend</p>
            </div>
          </div>
        </div>
        {/* Single Advisor */}
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.3s" style={{ visibility: 'visible', animationDelay: '0.3s', animationName: 'fadeInUp' }}>
            {/* Team Thumb */}
            <div className="advisor_thumb">
              <img src="Kekko.png" alt="Francesco Conforti" />
              {/* Social Info */}
              <div className="social-info">
                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-linkedin"></i></a>
              </div>
            </div>
            {/* Team Details */}
            <div className="single_advisor_details_info">
              <h6>Francesco Conforti</h6>
              <p className="designation">Backend</p>
            </div>
          </div>
        </div>
        {/* Single Advisor */}
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.4s" style={{ visibility: 'visible', animationDelay: '0.4s', animationName: 'fadeInUp' }}>
            {/* Team Thumb */}
            <div className="advisor_thumb">
              <img src="Kekko.png" alt="Giuseppe Pio Debiase" />
              {/* Social Info */}
              <div className="social-info">
                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-linkedin"></i></a>
              </div>
            </div>
            {/* Team Details */}
            <div className="single_advisor_details_info">
              <h6>Giuseppe Pio Debiase</h6>
              <p className="designation">Frontend</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contatti;
