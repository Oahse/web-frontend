import React, { useState } from "react";
import { DatePicker as AntDatePicker } from "antd";
import dayjs from "dayjs";
import PropTypes from 'prop-types'; // Import PropTypes
import './DatePicker.css';

const DatePicker = ({ placeholder, value = dayjs(Date.now()), onChange, style = {}, ...props }) => {
    return (
        <AntDatePicker
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            style={style}
            {...props}
        />
    );
};

// Add PropTypes for validation
DatePicker.propTypes = {
    placeholder: PropTypes.string,         // Placeholder for the input field
    value: PropTypes.object,               // Value should be a dayjs object
    onChange: PropTypes.func.isRequired,   // onChange function is required
    style: PropTypes.object,               // style prop (optional)
};

// Set default values for props
DatePicker.defaultProps = {
    style: {},                             // Default style to an empty object if not passed
};

export default DatePicker;
