import React, { useEffect, useState } from 'react';
import { Avatar, Drawer, Layout,Menu} from 'antd';
import './SideBar.css';
import Text from '../Typography/Text';
import Button from '../Button/Button'
import { Icon } from '@iconify/react/dist/iconify.js';
import { useLocation } from 'react-router-dom';
import { getPathFromActivePage, updateURL } from '../../../utils/helper';

const { Sider } = Layout;

const Sidebar = ({ isMobile,logo, visible, onClose, placement, title,items,user,activePage,onActivePage }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const handleActivePage = (item, index)=>{
    onActivePage && onActivePage(item, index);
    
    const url = `http://localhost:3000/web-frontend${getPathFromActivePage(index)}`
    updateURL(url, {
      
    });
    // console.log(url)
  }
    // Disable scrolling when drawer is visible
  useEffect(() => {
    
    if (visible) {
        document.body.style.overflow = 'hidden'; // Disable scrolling
        document.body.style.position = 'fixed';
        document.body.style.width = '100%'; // Prevent layout shift
      } else {
        document.body.style.position = '';
        document.body.style.width = ''; // Reset to normal
        document.body.style.overflow = ''; // Enable scrolling
      }
      
  }, [visible]);
    if (isMobile){
      return (
          <Drawer
          className='sidebar'
          title={<span className='d-flex flex-row'>
            <Avatar src={logo} size={40} className='mr-3' shape='square' style={{ 
                  objectFit: 'contain', // Ensure the image fits inside the Avatar container without being cropped
                  width: '26%',  // Make sure the image takes up the full width
                  height: '26%'  // Ensure the image takes up the full height as well
                }} />
            {/* <span className='m-auto'>{title}</span> */}
            </span>}
          
          placement={placement}
          closable={false}
          onClose={onClose}
          open={visible}
          footer={<div className='sidebar-footer'>
              <span className='d-flex flex-row mb-1'>
                <Button
                  type='link'
                  text="Settings"
                  color="primary"
                  className='fw-500 m-auto w-100'
                  href={'/login'}
                  onClick={() => console.log('Button clicked')}
                  startIcon={<Icon icon="arcticons:settings" width="25" height="25" />}
                />
              </span>
              {!user?.isloggedin?
              <span className='d-flex flex-row'>
                <Button
                  type='link'
                  text="Login"
                  color="secondary"
                  className='fw-500 m-auto w-100'
                  href={'/login'}
                  onClick={() => console.log('Button clicked')}
                  startIcon={<Icon icon="material-symbols-light:login-outline-rounded" width="25" height="25" />}
                />
              </span>
              :
              <span className='d-flex flex-row'>
                  <Avatar size={40}/> 
                  <span className='ms-4'>
                      {user?.email}
                      <Text fontWeight='fw-500' fontSize='fs-md'>{user?.firstname}{user?.lastname}</Text>
              
                      </span>    
                  </span>}
          </div>}
          >
          {/* <div>
              {items && items.map((item, index) => (
                <p key={index} onClick={()=>handleActivePage(item, index)}>{item}</p>
              ))}
          </div> */}
          {/* Menu */}
            <Menu theme="light" mode='vertical' className="sidebar-menu" defaultSelectedKeys={[`${activePage}`]} >
              {items && items.map((item, index) => (
                <Menu.Item key={index} onClick={()=>handleActivePage(item, index)}>{item}</Menu.Item>
              ))}
            </Menu>
          
          </Drawer>
      )}
    else {
      return (
        <Sider
            width={250}
            collapsed={collapsed}
            onCollapse={setCollapsed}
            className="sidebar"
            theme="light"
          >
            <div className="d-flex flex-column" style={{minHeight:'90%'}}>
              {/* Menu */}
              <Menu theme="light" mode='vertical' className="sidebar-menu" defaultSelectedKeys={[`${activePage}`]}>
                {items && items.map((item, index) => (
                  <Menu.Item key={index} onClick={()=>handleActivePage(item, index)}>{item}</Menu.Item>
                ))}
              </Menu>

              {/* Footer */}
              <div className="sidebar-footer mt-auto">
                {/* Settings Button */}
                <div className="d-flex justify-content-center mb-1">
                  <Button
                    type="link"
                    text="Settings"
                    color="primary"
                    className="fw-500 w-100"
                    href="/login"
                    onClick={() => console.log('Button clicked')}
                    startIcon={<Icon icon="arcticons:settings" width="25" height="25" />}
                  />
                </div>

                {/* Login/Logout Section */}
                {!user?.isLoggedIn ? (
                  <div className="d-flex justify-content-center">
                    <Button
                      type="link"
                      text="Login"
                      color="secondary"
                      className="fw-500 w-100"
                      href="/login"
                      onClick={() => console.log('Button clicked')}
                      startIcon={<Icon icon="material-symbols-light:login-outline-rounded" width="25" height="25" />}
                    />
                  </div>
                ) : (
                  <div className="d-flex align-items-center justify-content-center">
                    <Avatar size={40} />
                    <div className="ms-4 text-center">
                      <span>{user?.email}</span>
                      <Text fontWeight="fw-500" fontSize="fs-md">{user?.firstname} {user?.lastname}</Text>
                    </div>
                  </div>
                )}
              </div>
            </div>
        </Sider>
      )
    }
};

export default Sidebar;
