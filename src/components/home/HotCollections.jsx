import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import the carousel component
import slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const HotCollections = () => {
  // // Create the state to store our dynamic collections array
  const [collections, setCollections] = useState([]);

  // Fetch data from the API endpoint when the component mounts
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );
        // save array of 6 nft items into state
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching hot collections:", error);
      }
    };
    fetchCollections();
  }, []);

  // Carousel settings config
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {/* map over the dynamic collections data instead of the repeating hardcode elements */}
          <div className="col-lg-12">
            {/* wrap dynamic mapping logic inside the slider wrapper */}
            <slider {...settings}>
              {collections.map((nft) => (
                <div className="carousel-item-padding" key={nft.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to="/item-details">
                        <img
                          src={nft.nftImage}
                          className="lazy img-fluid"
                          alt={nft.title}
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-coll"
                          src={nft.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{nft.title}</h4>
                      </Link>
                      <span>ERC-{nft.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
