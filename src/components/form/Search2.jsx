import PropTypes from 'prop-types';
import Icon from '../Button/Icon';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// import ai from '@/assets/images/avatar/google-gemini-icon.svg';
const Search2 = ({ results = [],onSearch = () => {}}) => {
  const navigate = useNavigate();
    const [value, setValue] = useState('')
    
    const handleOnSearch =(value)=>{
        navigate(`/products/search`, { state: { search: value } });
    }
  
    
    return (
        <div className="tf-search-sticky">
            <div className="tf-mini-search-frm mb-4">
                <fieldset className="text ">
                    <input type="text" placeholder="Search product" value={value} onChange={(e)=>setValue(e.target.value)} className="" name="text" tabindex="0"
                        aria-required="true" required=""/>
                </fieldset>
                
                <button className=""  onClick={()=>handleOnSearch(value)}>
                        <i className="icon-search"></i>
                    </button>
            </div>
            <span className='d-flex flex-row justify-content-center align-items-center' data-bs-dismiss="offcanvas">
                <button className="tf-btn btn-fill" type="button" data-bs-toggle="modal" data-bs-target="#camera" >
                    <Icon icon="icon-ai-camera" title="AI Camera" /><span className='ms-1 text-white'>AI</span>
                </button>
                <span className='ms-2'>
                    Search list or upload an image
                </span>
            </span>
        </div>
  );
};

Search2.propTypes = {
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

export default Search2;
