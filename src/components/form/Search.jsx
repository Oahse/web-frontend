import PropTypes from 'prop-types';
import Icon from '../Button/Icon';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import ai from '@/assets/images/avatar/google-gemini-icon.svg';
const Search = ({ results = [],onSearch = () => {}}) => {
  const navigate = useNavigate();
    const [value, setValue] = useState('')
    
    const handleOnSearch =(value)=>{
        navigate(`/products/search`, { state: { search: value } });
    }
  
    
    return (
    <div className="tf-form-search">
        <div className="search-box">
            <input type="text" placeholder="Search product" value={value} onChange={(e)=>setValue(e.target.value)}/>
            
            <span className="tf-btn-span ">
                <a className="tf-btn"  href="#camera" data-bs-toggle="modal">
                  <Icon icon={'icon-ai-camera'} title='adad' /> <span className='ms-1 text-white'>AI</span>
                </a>
                
                <button className="tf-btn ms-1" onClick={()=>handleOnSearch(value)}>
                  <Icon icon={'icon-search'} />
                </button>
            </span>
        </div>
        

      {(results.length > 0 && value.length > 0) && (
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
