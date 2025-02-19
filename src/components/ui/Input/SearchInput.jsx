import PropTypes from 'prop-types';
import FormInput from "../FormInput/FormInput";

const SearchInput = ({ onSearch, style, placeholder,className }) => {
    return (
        <FormInput name='search' placeholder={placeholder} onSearch={onSearch} className={className} style={style} />
    );
};

// Define PropTypes for SearchInput component
SearchInput.propTypes = {
    onSearch: PropTypes.func,        // onSearch should be a function
    style: PropTypes.object,         // style should be an object (inline styles)
    placeholder: PropTypes.string,   // placeholder should be a string
};

// Define default values for props
SearchInput.defaultProps = {
    onSearch: null,                 // default onSearch is null (no action by default)
    style: {},                      // default style is an empty object (no custom style)
    placeholder: "Search...",       // default placeholder text
};

export default SearchInput;
