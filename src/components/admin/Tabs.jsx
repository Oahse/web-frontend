import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="widget-tabs">
      <ul className="widget-menu-tab">
        {tabs.map((tab, i) => (
          <li
            key={i}
            className={activeIndex === i ? 'active' : ''}
            onClick={() => setActiveIndex(i)}
          >
            {tab.title}
          </li>
        ))}
      </ul>
      <div className="widget-content-tab">
        {tabs.map((tab, i) => (
          <div key={i} style={{ display: activeIndex === i ? 'block' : 'none' }}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
