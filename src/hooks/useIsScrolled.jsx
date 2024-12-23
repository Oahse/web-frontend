import { useState, useEffect } from 'react';

/**
 * Custom hook to determine if the user has scrolled more than a specified threshold (default is 10px).
 * 
 * @returns {boolean} isScrolled - Returns `true` if the user has scrolled more than the threshold, otherwise `false`.
 */
const useIsScrolled = () => {
    // State to track whether the page has been scrolled
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        /**
         * Event handler to check the current scroll position and update the `isScrolled` state.
         * Sets `isScrolled` to true if the user has scrolled more than 10px vertically.
         */
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10); // Update state based on scroll position
        };

        // Attach the `scroll` event listener to the window
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    // Return the scroll state so it can be used in a component
    return isScrolled;
};

export default useIsScrolled;
