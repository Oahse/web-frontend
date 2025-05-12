import React, { useEffect, useRef } from 'react';

const VectorMap = ({ data }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.$ && window.$.fn.vectorMap && mapRef.current) {
      window.$(mapRef.current).vectorMap({
        map: 'us_lcc',
        backgroundColor: '#F6F6F6',
        regionStyle: {
          initial: {
            fill: '#30303080'
          },
          hover: {
            fill: '#22C55E',
            'fill-opacity': 1,
            cursor:'pointer'
          }
        },
        series: {
          regions: [{
            values: data,
            scale: ['#FF9E70', '#FF7433'],
            normalizeFunction: 'polynomial'
          }]
        },
        onRegionLabelShow: function (e, el, code) {
            const value = data[code] !== undefined ? data[code] : 0;
            el.html(el.html() + ` ${value}%`);
          }
          
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
    };
  }, [data]);

  return (
    <div className='p-2'>
      <div id="usa-vectormap" ref={mapRef} style={{ maxWidth:'300px', height: '300px', padding:'1rem' }} />
    </div>
  );
};

export default VectorMap;
