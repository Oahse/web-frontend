import PropTypes from 'prop-types';
import Button from '../Button/Button';
import Icon from '../Button/Icon';

const Search = ({ action = 'https://themesflat.co/html/ecomus/home-search.html', results = [],onSearch = () => {}}) => {
    
    const handleOnSearch =(e)=>{
        e.preventDefault();
        onSearch(e);
    }
    return (
    <div className="tf-form-search">
      <form action={action} className="search-box" onSubmit={handleOnSearch}>
        <input type="text" placeholder="Search product" />
        <button className="tf-btn" type="submit">
          <Icon icon={'icon-search'} />
        </button>
      </form>

      {results.length > 0 && (
        <div className="search-suggests-results">
          <div className="search-suggests-results-inner">
            <ul>
              {results.map((result, index) => (
                <li key={index}>
                  <a className="search-result-item" href="product-detail.html">
                    <div className="img-box">
                      <img src={result.img} alt={result.name} />
                    </div>
                    <div className="box-content">
                      <p className="title link">{result.name}</p>

                      {typeof result.price === 'object' ? (
                        <div className="d-flex gap-10">
                          {result.price.old && (
                            <span className="old-price">{result.price.old}</span>
                          )}
                          {result.price.new && (
                            <span className="new-price">{result.price.new}</span>
                          )}
                        </div>
                      ) : (
                        <div className="price">{result.price}</div>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

Search.propTypes = {
  action: PropTypes.string,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          old: PropTypes.string,
          new: PropTypes.string,
        }),
      ]),
    })
  ),
};

export default Search;
