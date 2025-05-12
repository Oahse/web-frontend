import React, { useState, useEffect } from "react";

const Accordion = ({ category, key, toggleActive }) => {
    const [activeFaqIndex, setActiveFaqIndex] = useState(0);

    const handleClick = (categoryIndex, faqIndex) => {
        if (activeFaqIndex === faqIndex) {
            setActiveFaqIndex(null); // Collapse the current FAQ if it's already active
        } else {
            setActiveFaqIndex(faqIndex); // Set the clicked FAQ as active
        }
        if (toggleActive){
            toggleActive(categoryIndex, faqIndex)
        }
    };

    useEffect(() => {
        // This will trigger re-render when `activeFaqIndex` changes
    }, [activeFaqIndex]);

    return (
        <div key={key} className="wg-box">
            <h5>{category.category}</h5>
            <div className="flat-accordion style-default has-btns-arrow mb_60">
                {/* Iterate over each FAQ in the current category */}
                {category.faqs.map((faq, faqIndex) => (
                    <div
                        key={faqIndex}
                        className={`flat-toggle ${faqIndex === activeFaqIndex ? 'active' : ''}`}
                    >
                        <div
                            className={`toggle-title ${faqIndex === activeFaqIndex ? 'active' : ''}`}
                            onClick={() => handleClick(key, faqIndex)}
                        >
                            {faq.question}<span className="toggle-icon"><i className="icon-chevron-down" ></i></span>
                        </div>
                        <div
                            className={`toggle-content ${faqIndex === activeFaqIndex ? 'active' : ''}`}
                            style={{ display: faqIndex === activeFaqIndex ? 'block' : 'none', transition: 'all 0.2s ease' }}
                        >
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Accordion;
