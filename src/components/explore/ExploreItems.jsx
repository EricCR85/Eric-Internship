import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("Loading...");

  useEffect(() => {
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
        }, 1000)

        return () => clearInterval(timer);
    }, [expiryDate]);

    return <div className="de_countdown">{timeLeft}</div>;
  

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchExploreItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
        );
        setExploreItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching explore items:", error);
        setLoading(false);
      }
    };

    fetchExploreItems();
  }, []);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
   <div className="row">
    {loading && new Array(8).fill(0).map((_, index) => (
<div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
  <Skeleton width="100%" height="200px" />
  </div>
    ))}

    {!loading && explorItems.slice(0, visivleCount).map((item, index) =>(
      <div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
        <div className="nft_item_info">
          <h4>{item.title}</h4>
          <div>{item.price} ETH</div>
        </div>
        </div>
    ))}

    {visibleCount < exploreItem.length && (
      <div className="col-md-12 text-center">
        <button onClick={loadMore} className="btn-main lead">
          Load More
        </button>
          </div>
    )}
   </div>
  );
};
  


export default ExploreItems;
