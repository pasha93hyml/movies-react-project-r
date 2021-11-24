import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Spinner from "../spinner/Spinner";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./movieCarousel.css";

const MovieCarousel = ({ data, from }) => {
  const [carouselData, setCarouselData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCarouselData(data);
    setLoading(false);
  }, [data]);

  const renderItems = (items) => {
    return items.map((item, i) => (
      <Link to={`/${from}/${item.id}`} key={i}>
        <div className="item">
          <img src={item.url} alt="" height={300} />
        </div>
      </Link>
    ));
  };
  const options = {
    items: 5,
    margin: 20,
    lazyLoad: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
  };
  const spinner = loading ? <Spinner /> : null;
  const markup = carouselData ? (
    <OwlCarousel className="owl-theme" {...options}>
          {renderItems(carouselData)}
        </OwlCarousel>
    ) : null;

  return (
    <div className="overfvow pt-2 bg-dark">
      <div className="container">
        {spinner}
        {markup}
      </div>
    </div>
  );
};

export default MovieCarousel;
