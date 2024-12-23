
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const truncateText = ({ text, charLimit }) => {
    /**
     * Truncate text to a certain number of characters and append '...' if needed.
     * @param {string} text - The text to truncate.
     * @param {number} charLimit - The maximum number of characters allowed.
     * @returns {string} - The truncated text with '...' if it exceeds the character limit.
     */
    if (text.length <= charLimit) {
      return text; // Return the original text if within the character limit
    }
    
    return text.slice(0, charLimit) + '...'; // Truncate to charLimit and add '...'
  };
  
const CurrencyConverter = ({ amount, fromCurrency, toCurrency }) => {
    const [conversionRate, setConversionRate] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(amount);

    useEffect(() => {
        const fetchConversionRate = async () => {
            try {
                const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
                const rate = response.data.rates[toCurrency];
                setConversionRate(rate);
            } catch (error) {
                console.error('Error fetching conversion rates:', error);
            }
        };

        fetchConversionRate();
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        setConvertedAmount((amount * conversionRate).toFixed(2));
    }, [amount, conversionRate]);

    return (
        <span>{toCurrency} {convertedAmount} </span>
    );
};

export {CurrencyConverter, truncateText}
