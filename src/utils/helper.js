
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

export {CurrencyConverter}
