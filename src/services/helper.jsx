import { notify } from '@/services/notifications/ui';
import { addToCart, addToWishlist } from '@/services/api/carts';
import paypal from '@/assets/images/payments/paypal.png';
// import visa from '@/assets/images/payments/visa.png';
import mastercard from '@/assets/images/payments/img-2.png';
// Add these imports for your other images:
import cash from '@/assets/images/payments/cash.jpg';
import applepay from '@/assets/images/payments/applepay.jpg';
import googlepay from '@/assets/images/payments/googlepay.png';
import amazonpay from '@/assets/images/payments/amazonpay.jpg';
import cryptocurrency from '@/assets/images/payments/cryptocurrency.webp';
// import check from '@/assets/images/payments/check.png';

// Import winkNLP and the English language model
import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';

export const formatDateValue = (value) => {
  
  // Try to parse as a Date
  const date = new Date(value);

  if (!isNaN(date.getTime()) && typeof value === 'string') {
    // It's a valid date string
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  // Return original value for non-date fields
  return value;
};

export const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
  
};

export const convertVideoToBase64 = (file) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  });
};

export const base64ToFile = async (base64String, fileName) => {
  const res = await fetch(base64String);
  const blob = await res.blob();
  return new File([blob], fileName, { type: blob.type });
};
const colorMap = {
  "orange": "#FFA500",
  "blue": "#0000FF",
  "yellow": "#FFFF00",
  "black": "#000000",
  "red": "#FF0000",
  "green": "#008000",
  "purple": "#800080",
  "pink": "#FFC0CB",
  "brown": "#A52A2A",
  "white": "#FFFFFF",
  "gray": "#808080",
  "cyan": "#00FFFF",
  "magenta": "#FF00FF",
  "lime": "#00FF00",
  "indigo": "#4B0082",
  "violet": "#8A2BE2",
  "gold": "#FFD700",
  "silver": "#C0C0C0",
  "beige": "#F5F5DC",
  "navy": "#000080",
};

export const generateColorCode = (name = '')=> {
  // Normalize the name to lowercase
  const normalizedName = name.trim().toLowerCase();

  // Return the color code if it exists in the map, or a default color (e.g., gray)
  return colorMap[normalizedName] || "#808080"; // Default to gray if not found
}

export const generatePaginationBullets = (totalPages, activeIndex,swiperRef,slidesPerView) => {
    return Array.from({ length: totalPages }, (_, index) => (
      <span
        key={index}
        className={`swiper-pagination-bullet ${activeIndex === index ? 'swiper-pagination-bullet-active' : ''}`}
        role="button"
        aria-label={`Go to page ${index + 1}`}
        tabIndex="0"
        onClick={() => swiperRef.current.swiper.slideTo(index * slidesPerView)}
      ></span>
    ));
};
export const handleAddToCart = async (product, user, {...props}) => {
    if (user === null) {
        // Guest user → store cart in localStorage
        const cart = JSON.parse(localStorage.getItem('banre_cart')) || [];
        cart.push({'product':product,'quantity':props.quantity, 'price':props.price});
        // localStorage.setItem('banre_cart', JSON.stringify(cart));
        notify({ text: `Successfully added ${props.quantity} ${product?.name} to cart`, type: 'success' });
    } else {
        try {
            const result = await addToCart({ itemData: {product, quantity:props.quantity, price:props.price}, userId: user?.id });

            if (result.data) {
                notify({ text: `Successfully added ${props.quantity} ${product?.name} to cart`, type: 'success' });
            } else {
                notify({ text: `${result.error || 'Could not add to cart'}`, type: 'error' });
            }
        } catch (error) {
            notify({ text: `Error: ${error.message}`, type: 'error' });
        }
    }
  };
export const handleAddToWishlist = async (product, user ) => {
  if (user === null) {
    // Store in localStorage
      const wishlist = JSON.parse(localStorage.getItem('banre_wishlist')) || [];
      const exists = wishlist.find(p => p.id === product.id);

      if (!exists) {
          wishlist.push(product);
          // localStorage.setItem('banre_wishlist', JSON.stringify(wishlist));
          notify({ text: `Successfully added ${product?.name} to your wishlist`, type: 'success' });
      }
  } else {
      try {
        const result = await addToWishlist({ itemData: {product}, userId: user?.id });

        if (result.data) {
            notify({ text: `Successfully added ${product?.name} to your wishlist`, type: 'success' });
        } else {
            notify({ text: `${result.error || 'Could not add to wishlist'}`, type: 'error' });
        }
      } catch (error) {
          notify({ text: `Error: ${error.message}`, type: 'error' });
      }
    }
};
export const getDiscount = (price, salePrice) => {
        return ((salePrice / price) * 100).toFixed(2);
    };
export function formatToMMMDDYYYY(isoDateStr) {
  const date = new Date(isoDateStr);

  const month = date.toLocaleString('en-US', { month: 'short' }); // 'May'
  const day = String(date.getDate()).padStart(2, '0');            // '18'
  const year = date.getFullYear();                                // '2025'

  return `${month}/${day}/${year}`;
}
export const paymentMethods = [
  // { id: 'bank_transfer', name: 'Direct Bank Transfer', enabled: true, image: visa },
  { id: 'cod', name: 'Cash on Delivery', enabled: true, image: cash },
  { id: 'paypal', name: 'PayPal', enabled: true, image: paypal },
  { id: 'credit_card', name: 'Credit / Debit Card', enabled: true, image: mastercard },
  { id: 'apple_pay', name: 'Apple Pay', enabled: false, image: applepay },
  { id: 'google_pay', name: 'Google Pay', enabled: false, image: googlepay },
  { id: 'amazon_pay', name: 'Amazon Pay', enabled: false, image: amazonpay },
  { id: 'cryptocurrency', name: 'Cryptocurrency', enabled: false, image: cryptocurrency },
//   { id: 'check', name: 'Check Payment', enabled: false, image: check },
];



// Initialize winkNLP
const nlp = winkNLP(model);
const its = nlp.its;

export const rateSentence = (sentence)=> {
    /**
       * Rates a sentence from 1 to 5 based on sentiment.
       * @param {string} sentence - The sentence to analyze.
       * @returns {number} A rating between 1 and 5.
    */
    const doc = nlp.readDoc(sentence);
    const sentimentScore = doc.out(its.sentiment);
    // console.log(sentimentScore,'sentimentScore',sentence)
    // Map sentiment score (-1 to +1) to 1–5 rating
    if (sentimentScore < -0.5) return 1;
    if (sentimentScore < -0.2) return 2;
    if (sentimentScore < 0.2) return 3;
    if (sentimentScore < 0.6) return 4;
    return 5;
}


export function timeSince(isoDate) {
  const seconds = Math.floor((new Date() - new Date(isoDate)) / 1000);

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }
}







