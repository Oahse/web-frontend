import React, { useState, useRef } from 'react';
import { Tabs as AntdTabs } from 'antd';
import PropTypes from 'prop-types';  // Import PropTypes
import './Tabs.css';

const Tabs = ({ 
    initialItems = [], 
    editable, 
    size = "small", 
    onChange, 
    alignValue = 'center', 
    tabPosition = 'top', 
    onTabClick, 
    onTabScroll,
    tabBarExtraContent 
}) => {
    const [activeKey, setActiveKey] = useState(initialItems[0]?.key || '1');
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(0);

    const handleChange = (key) => {
        setActiveKey(key);
        onChange && onChange(key);
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items, { label: 'New Tab', children: 'Content of new Tab', key: newActiveKey }];
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter((item) => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    return (
        <AntdTabs
            defaultActiveKey={activeKey}
            items={items}
            size={size}
            tabPosition={tabPosition}
            onChange={handleChange}
            type={editable ? "editable-card" : 'line'}
            activeKey={activeKey}
            onEdit={onEdit}
            indicator={{
                size: (origin) => origin - 20,
                align: alignValue,
            }}
            onTabClick={onTabClick}
            onTabScroll={onTabScroll}
            animated={{ inkBar: true, tabPane: true }}
            tabBarExtraContent={tabBarExtraContent}
        />
    );
};

// Add PropTypes validation
Tabs.propTypes = {
    initialItems: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            children: PropTypes.string.isRequired,
        })
    ).isRequired,  // Ensuring initialItems is an array of objects with specific structure

    editable: PropTypes.bool,  // editable should be a boolean
    size: PropTypes.oneOf(['small', 'middle', 'large']),  // Allowed values for size
    onChange: PropTypes.func,  // onChange should be a function
    alignValue: PropTypes.oneOf(['start', 'center', 'end']),  // Allowed values for alignValue
    tabPosition: PropTypes.oneOf(['top', 'left', 'bottom', 'right']),  // Allowed values for tabPosition
    onTabClick: PropTypes.func,  // onTabClick should be a function
    onTabScroll: PropTypes.func,  // onTabScroll should be a function
    tabBarExtraContent:PropTypes.any
};

// Default props
Tabs.defaultProps = {
    initialItems: [],
    editable: false,
    size: 'small',
    alignValue: 'center',
    tabPosition: 'top',
    tabBarExtraContent: null
};

export default Tabs;
