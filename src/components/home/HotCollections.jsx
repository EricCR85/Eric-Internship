import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import the carousel component
import OwlCarousel from "react-owl-carousel";
// import required owl carousel styles
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
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

  // owl carousel config objects
  const options = {
    loops: true,
    infinite: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 },
    },
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

          <div className="col-lg-12">
            {/* only render the carousel once our data array has loaded */}
            {collections.length > 0 && (
              <OwlCarousel className="owl-theme" {...options}>
                {collections.map((nft) => (
                  <div item key={nft.id}>
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
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
