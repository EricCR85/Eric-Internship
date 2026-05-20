import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("Loading...");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(expiryDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft("Expired");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchExploreItems = async () => {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
      );
      setExploreItems(data);
      setLoading(false)
    };
    fetchExploreItems();
  }, []);

  return (
    <div className="row">
      {exploreItems.slice(0, visibleCount).map((item, index) => (
        <div key={index}
          className="d-item col-lg-3 cp;-md-6 col-sm-6 col-xs-12"
        >
          <div className="nft_item">
            <div className="author_list_pp">
              <img src="{item.authorImage" alt="" />
              </div>
            <Countdown expiryDate={item.expiryDate} />
            <img src={item.nftImage} className="lazy nft_item_preview" alt="" />
            <div className="nft_item_info">
              <h4>{item.title}</h4>
              <div className="nft_item_price">{item.price} ETH</div>
            </div>
          </div>
        </div>
      ))}
      ;
      {visibleCount < exploreItems.length && (
        <div className="col-md-12 text-center">
          <button
            onClick={() => setVisibleCount(visibleCount + 4)}
            className="btn-main lead"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ExploreItems;
