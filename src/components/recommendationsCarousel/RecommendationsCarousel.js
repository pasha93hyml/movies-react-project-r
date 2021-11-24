import { Link } from "react-router-dom";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const RecommendationsCarousel = ({ data, baseURL, from }) => {
  const renderItems = (items) => {
    return items.map((item, i) => (
      <Link to={`/${from}/${item.id}`} key={item.id} style={{textDecoration: 'none', color: '#fff'}}>
        <div className="item">
          <img
            src={
              item.poster_path
                ? baseURL + item.poster_path
                : "https://cdn.browshot.com/static/images/not-found.png"
            }
            alt=""
            height={300}
            style={{objectFit: 'cover'}}
          />
          <p>{item.title}</p>
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

  const markup = renderItems(data);

  return (
    <div className="overfvow pt-2 bg-dark">
      <div className="container">
        <OwlCarousel className="owl-theme" {...options}>
          {markup}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default RecommendationsCarousel;
