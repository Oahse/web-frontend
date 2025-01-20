import React, { useState } from 'react';
import { Avatar, Dropdown, Menu, Modal } from 'antd';

const categories = [
    {
      name: 'Electrical',
      sub: [
        {
          name: 'Materials',
          sub: [
            { name: 'Conductor', image: 'https://example.com/conductor.png' },
            { name: 'Cables', image: 'https://example.com/cables.png' },
            { name: 'Transformers', image: 'https://example.com/transformers.png' }
          ]
        },
        {
          name: 'Equipments',
          sub: [
            { name: 'Generators', image: 'https://example.com/generators.png' },
            { name: 'Switchgear', image: 'https://example.com/switchgear.png' },
            { name: 'Circuit Breakers', image: 'https://example.com/circuit-breakers.png' }
          ]
        },
        {
          name: 'Tools',
          sub: [
            { name: 'Multimeters', image: 'https://example.com/multimeters.png' },
            { name: 'Wire Strippers', image: 'https://example.com/wire-strippers.png' }
          ]
        }
      ]
    },
    {
      name: 'Mechanical',
      sub: [
        {
          name: 'Tools',
          sub: [
            { name: 'Wrenches', image: 'https://example.com/wrenches.png' },
            { name: 'Drills', image: 'https://example.com/drills.png' },
            { name: 'Lathes', image: 'https://example.com/lathes.png' }
          ]
        },
        {
          name: 'Parts',
          sub: [
            { name: 'Bearings', image: 'https://example.com/bearings.png' },
            { name: 'Bolts', image: 'https://example.com/bolts.png' },
            { name: 'Gears', image: 'https://example.com/gears.png' }
          ]
        }
      ]
    },
    {
      name: 'Industrial',
      sub: [
        {
          name: 'Machinery',
          sub: [
            { name: 'Cranes', image: 'https://example.com/cranes.png' },
            { name: 'Conveyors', image: 'https://example.com/conveyors.png' },
            { name: 'Pumps', image: 'https://example.com/pumps.png' }
          ]
        },
        {
          name: 'Parts & Accessories',
          sub: [
            { name: 'Belts', image: 'https://example.com/belts.png' },
            { name: 'Chains', image: 'https://example.com/chains.png' }
          ]
        }
      ]
    },
    {
      name: 'Construction',
      sub: [
        {
          name: 'Materials',
          sub: [
            { name: 'Cement', image: 'https://example.com/cement.png' },
            { name: 'Steel', image: 'https://example.com/steel.png' },
            { name: 'Bricks', image: 'https://example.com/bricks.png' }
          ]
        },
        {
          name: 'Tools',
          sub: [
            { name: 'Hammers', image: 'https://example.com/hammers.png' },
            { name: 'Saws', image: 'https://example.com/saws.png' },
            { name: 'Drills', image: 'https://example.com/drills.png' }
          ]
        }
      ]
    },
    {
      name: 'Electronics',
      sub: [
        {
          name: 'Components',
          sub: [
            { name: 'Resistors', image: 'https://example.com/resistors.png' },
            { name: 'Capacitors', image: 'https://example.com/capacitors.png' },
            { name: 'Diodes', image: 'https://example.com/diodes.png' }
          ]
        },
        {
          name: 'Devices',
          sub: [
            { name: 'Smartphones', image: 'https://example.com/smartphones.png' },
            { name: 'Laptops', image: 'https://example.com/laptops.png' },
            { name: 'Tablets', image: 'https://example.com/tablets.png' }
          ]
        }
      ]
    },
    {
      name: 'Chemical',
      sub: [
        {
          name: 'Materials',
          sub: [
            { name: 'Solvents', image: 'https://example.com/solvents.png' },
            { name: 'Acids', image: 'https://example.com/acids.png' },
            { name: 'Bases', image: 'https://example.com/bases.png' }
          ]
        },
        {
          name: 'Products',
          sub: [
            { name: 'Paints', image: 'https://example.com/paints.png' },
            { name: 'Inks', image: 'https://example.com/inks.png' },
            { name: 'Adhesives', image: 'https://example.com/adhesives.png' }
          ]
        }
      ]
    },
    {
      name: 'Energy',
      sub: [
        {
          name: 'Solar',
          sub: [
            { name: 'Panels', image: 'https://example.com/panels.png' },
            { name: 'Inverters', image: 'https://example.com/inverters.png' },
            { name: 'Batteries', image: 'https://example.com/batteries.png' }
          ]
        },
        {
          name: 'Wind',
          sub: [
            { name: 'Turbines', image: 'https://example.com/turbines.png' },
            { name: 'Blades', image: 'https://example.com/blades.png' }
          ]
        }
      ]
    },
    {
      name: 'Aerospace',
      sub: [
        {
          name: 'Parts',
          sub: [
            { name: 'Engines', image: 'https://example.com/engines.png' },
            { name: 'Wings', image: 'https://example.com/wings.png' },
            { name: 'Landing Gear', image: 'https://example.com/landing-gear.png' }
          ]
        },
        {
          name: 'Tools',
          sub: [
            { name: 'Torque Wrenches', image: 'https://example.com/torque-wrenches.png' },
            { name: 'Riveters', image: 'https://example.com/riveters.png' }
          ]
        }
      ]
    },
    {
      name: 'Automotive',
      sub: [
        {
          name: 'Parts',
          sub: [
            { name: 'Engines', image: 'https://example.com/engines.png' },
            { name: 'Brakes', image: 'https://example.com/brakes.png' },
            { name: 'Suspension', image: 'https://example.com/suspension.png' }
          ]
        },
        {
          name: 'Tools',
          sub: [
            { name: 'Wrenches', image: 'https://example.com/wrenches.png' },
            { name: 'Tire Inflators', image: 'https://example.com/tire-inflators.png' }
          ]
        }
      ]
    }
  ];
  
  
const CategoryDropDown = ({isScrolled}) => {
    const [open, setOpen] = React.useState(false);
    const showLoading = () => {
      setOpen(true);
      
    };
    const [currentCategory, setCurrentCategory] = useState(categories[0])
    const [currentCategorySub, setCurrentCategorySub] = useState(currentCategory?.sub[0])
    // Handling category selection
    
    const menu = (
      <div mode="horizontal" title='Categories' className="ant-dropdown-menu-horizontal">
          <span key="1" className="ant-dropdown-menu-horizontal-item-wrapper">
                <Menu className="ant-dropdown-menu-horizontal-item">
                    {categories?.map((category, index)=> (
                        <Menu.Item key={`${index}`} onClick={() => setCurrentCategory(category)} onMouseOver={() => setCurrentCategory(category)}>{category.name}</Menu.Item>
                    ))}
                </Menu>
          </span>
          <span key="2" className="ant-dropdown-menu-horizontal-item-wrapper">
                <Menu className="ant-dropdown-menu-horizontal-item">
                    {currentCategory?.sub?.map((categorysub, index)=> (
                        <Menu.Item key={`sub-${index}`}  onClick={() => setCurrentCategorySub(categorysub)} onMouseOver={() => setCurrentCategorySub(categorysub)}>{categorysub.name}</Menu.Item>
                    ))}
                </Menu>
          </span>
          <span key="3" className="ant-dropdown-menu-horizontal-item-wrapper">
                <Menu className="ant-dropdown-menu-horizontal-item">
                    {currentCategorySub?.sub?.map((sub, index)=> (
                        <Menu.Item key={`sub-sub-${index}`}>{sub.name}</Menu.Item>
                    ))}
                </Menu>
          </span>
        </div>
    );
  
    return (
      <>
      <span className={`m-1 fw-bold d-flex flex-row align-items-center ${isScrolled ? 'text-black' : 'text-white '}`} style={{'cursor':'pointer'}} onClick={showLoading}>
              <i className="fa-light fa-list fs-lg me-1"></i>Categories
            </span>
        <div className='modal'>
        <Modal
          title={<span className='m-1 fw-bold d-flex flex-row align-items-center p-2' style={{'cursor':'pointer'}}>
                    <i className="fa-light fa-dash fs-lg me-1"></i>Categories
              </span>}
          
          open={open}
          className='dropdown'
          onCancel={() => setOpen(false)}
          footer={null} // This removes the footer buttons
        >
          {menu}
        </Modal>
        </div>
        </>
    )
  }
  
export default CategoryDropDown;