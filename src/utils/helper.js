import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const exportToExcel = ({json_data, fileName = 'data'}) => {
  const ws = XLSX.utils.json_to_sheet(json_data); // Convert JSON data to sheet format
  const wb = XLSX.utils.book_new(); // Create a new workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1'); // Append the sheet to the workbook

  // Generate Excel file and trigger download
  XLSX.writeFile(wb, `${fileName}.xlsx`);
};
const genHtmlPdf = ({ contentid = '', pdfname = 'page', pdf = true }) => {
  const element = document.querySelector(contentid); // Select the HTML element

  if (element) {
    
    // Use html2canvas to capture the wrapper (with padding)
    html2canvas(element).then((canvas) => {
      if (pdf) {
        // If pdf flag is true, generate a PDF
        const pdf = new jsPDF();
        const imgData = canvas.toDataURL('image/png'); // Get image data from the canvas

        // Add the image to the PDF (set position and dimensions)
        pdf.addImage(imgData, 'PNG', 10, 10, canvas.width * 0.08, canvas.height * 0.08); // Adjust size to fit in the page
        pdf.save(`${pdfname}.pdf`); // Save the PDF with the specified filename
      } else {
        // Otherwise, download the content as an image (PNG)
        const imageUrl = canvas.toDataURL(); // Convert the canvas to base64-encoded image (PNG)
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = `${pdfname}.png`; // Save the image with the specified filename
        link.click();
      }
    });
  } else {
    console.log(`Element with selector ${contentid} not found.${element}`);
  }
};


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
const updateURL = (url, state, replace = false) =>
    replace
      ? window.history.replaceState(state, '', url)
      : window.history.pushState(state, '', url);
  
const getPathFromActivePage = (activePage) => {
    switch (activePage) {
      case 0:
        return '/admin/dashboard';
      case 1:
        return '/admin/orders';
      case 2:
        return '/admin/products';
      case 3:
        return '/admin/customers';
      case 4:
        return '/admin/contents';
      case 5:
        return '/admin/finance';
      case 6:
        return '/admin/analytics';
      case 7:
        return '/admin/discount';
      case 8:
        return '/admin/marketing';
      case 9:
        return '/admin/platform';
      default:
        return '/admin/dashboard'; // Default path if none of the cases match
    }
  };
export {CurrencyConverter, truncateText, getPathFromActivePage, updateURL, genHtmlPdf,exportToExcel }
