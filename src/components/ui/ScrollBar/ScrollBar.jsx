import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Upload} from 'antd';  // Import necessary Ant Design components
import './ScrollBar.css';
import Button from '../Button/Button';

const ScrollBar = ({ items, itemsshape='square', size='medium', itemsslicestart = 0, itemssliceend=4, axis = 'horizontal', children, shorter }) => {
  const row = items.slice(itemsslicestart, itemssliceend); // Slice the items according to the given number

  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    if (axis === 'horizontal') {
      setStartX(e.clientX);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    } else {
      setStartY(e.clientY);
      setScrollTop(scrollContainerRef.current.scrollTop);
    }
    scrollContainerRef.current.style.cursor = 'grabbing'; // Change cursor on drag start
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
  
    const deltaX = axis === 'horizontal' ? e.clientX - startX : 0;
    const deltaY = axis === 'vertical' ? e.clientY - startY : 0;
  
    if (axis === 'horizontal') {
      scrollContainerRef.current.scrollLeft = scrollLeft - deltaX;
    } else {
      scrollContainerRef.current.scrollTop = scrollTop - deltaY;
    }
  };
  

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab'; // Reset cursor when dragging stops
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      scrollContainerRef.current.style.cursor = 'grab'; // Reset cursor on mouse leave
    }
  };

  const renderItem = (item, index) => {
    // Assuming items can be of type: image, video, file
    if (item.type === 'image') {
      return (
        <Avatar
          key={`row-${index}`}
          className={`scrollbar-scroll-item scrollbar-scroll-item-${size} scrollbar-scroll-item-${itemsshape === 'circle' ?  'circle' : "square"} p-1 ${item.className || ''}`}
          src={item.src}
          alt={item.alt || `Image ${index + 1}`}
        />
      );
    }
    if (item.type === 'video') {
        return (
          <div className="scrollbar-scroll-item p-1">
            <video
              key={`row-${index}`}
              className={`scrollbar-scroll-item-${itemsshape === 'circle' ?  'circle' : "square"} scrollbar-scroll-item-${size} ${item.className || ''}`}
              src={item.src}
              controls
              width="200"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );
      }

    if (item.type === 'file') {
      return (
        <Upload
          key={`row-${index}`}
          className={`scrollbar-scroll-item scrollbar-scroll-item-${size} scrollbar-scroll-item-${itemsshape === 'circle' ?  'circle' : "square"}  p-1 ${item.className || ''}`}
          fileList={[item.src]} // You may need to adjust how file is passed based on your logic
          showUploadList={{ showDownloadIcon: true }}
        >
          <Button startIcon={<i className="fa-thin fa-upload"></i>}>Download File</Button>
        </Upload>
      );
    }

    // Fallback: render image if type doesn't match or is unknown
    return (
      <Avatar
        key={`row-${index}`}
        className={`scrollbar-scroll-item scrollbar-scroll-item-${size} scrollbar-scroll-item-${itemsshape === 'circle' ?  'circle' : "square"}  p-1 ${item.className || ''}`}
        src={item.src}
        alt={item.alt || `Client ${index + 1}`}
      />
    );
  };

  return (
    <div
        ref={scrollContainerRef}
        className={`scrollbar-scrollable-bar scrollbar-scrollable-bar-${axis === 'horizontal' ? 'horizontal' : 'vertical'} scrollbar-scrollable-bar-${shorter ? 'shorter' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{
            height: axis === 'vertical' ? '100%' : 'auto', // Set height for vertical scroll
            overflow: axis === 'horizontal' ? 'auto' : 'hidden', // Enable scrolling
        }}
        >
        <div className="scrollbar-scrollable-row">
            {/* Render custom children if provided */}
            { Array.isArray(children) ? (
              children.map((child, index) => {
                const { tag: Tag, props, content } = child;
                return (
                  <Tag
                      key={`row-${index}`}
                      className={`scrollbar-scroll-item scrollbar-scroll-item-${size} scrollbar-scroll-item-${itemsshape === 'circle' ?  'circle' : "square"}  p-1 ${props.className || ''}`}
                      {...props} // Spread the rest of the props like alt, src, etc.
                      {...content}
                  />
                  );
              })
            ) : (
              row.map(renderItem)
            )}
        </div>
    </div>

  );
};

// Prop Validation
ScrollBar.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object), // Array of objects for items
    itemsslicestart: PropTypes.number,
    itemssliceend: PropTypes.number,
    itemsshape: PropTypes.oneOf(['circle', 'square']),
    axis: PropTypes.oneOf(['horizontal', 'vertical']),
    children: PropTypes.node, // Any renderable React node (element, string, etc.)
    shorter: PropTypes.bool,
    size: PropTypes.oneOf(['small','medium', 'large']),
};


export default ScrollBar;
