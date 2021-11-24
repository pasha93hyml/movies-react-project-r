import { Link } from 'react-router-dom';
import "./MoviesList.css";

const MoviesList = ({data, baseURL, onRequest, ended, newPageLoading, from}) => {
  
  const renderItems = (items) => {
    return items.map((item, i) => {
      return (
        <div key={i}>
          <Link to={`${from}${item.id}`} className="card">
            <div className="card-ref">
              <img
                src={item.poster_path ? baseURL + item.poster_path : 'https://cdn.browshot.com/static/images/not-found.png'}
                className="card-img-top"
                alt={item.title}
                height='300'
                style={{objectFit: 'cover'}}
              />
              <div className="card-body">
                <p className="card-title">{item.title}</p>
                <p className="card-text">{item.release_date}</p>
              </div>
            </div>
            <div className="item__name">{item.title}</div>
          </Link>
        </div>
      );
    });
  };
    const content = renderItems(data);
    const classes = data.length && data.length < 5 ? `row row-cols-1 row-cols-md-${data.length} g-4` : 'row row-cols-1 row-cols-md-5 g-4'
    return (
      <>
        <div className="bg-light pt-3 mb-3">
        <div className="container">
          <div className={classes}>
            {content}
            <button
              className="btn btn-secondary mx-auto mb-3"
              type="button"
              onClick={onRequest}
              style={{'display': ended ? 'none' : 'block'}}
              disabled={newPageLoading}
            >
              Load more
            </button>
          </div>
        </div>
        </div>
      </>
    );
  
}

export default MoviesList;
