import { Breadcrumb, Col, Layout, Row } from "antd"
import { Container } from "react-bootstrap";
import Logo from '../../assets/oahse_logo_text_dark.png';
import useDeviceType from "../../hooks/useDeviceType";
import { useAuth } from "../../services/auth";
import ImageLoader from "../../components/Loader";
import oahseicon from '../../assets/oahse-icon.png';
import oahselogo from '../../assets/oahse-logo.png';
import useIsScrolled from "../../hooks/useIsScrolled";
import Header from "../../components/ui/Header/Header";
import Sidebar from "../../components/ui/SideBar/SideBar";
import SideNavLinks from "../../components/ui/Header/SideNavLinks";
import { useState } from "react";
import { useCountryByLocation } from "../../hooks/useCountry";
import { useLocation } from "react-router-dom";
import AdminHeader from "../../components/ui/Header/AdminHeader";
const { Footer, Sider, Content } = Layout;
const AdminDashBoard = ({API_URL,Companyname }) => {
    const { isMobile, isTablet} = useDeviceType();
    const isScrolled = useIsScrolled();
    const { isLoggedIn:isloggedIn, userDetails, loading } = useAuth();

    const handleSearch = (e) =>{
        console.log(e)
    }
    const { country, error } = useCountryByLocation();
    // console.log(country,'=========')
    const location = useLocation(); // Get the current location
    if (location.pathname === '/shop') {
        console.log('Current URL is /shop');
        // Perform actions specific to the /shop route
    }
    const sidebarlinks = SideNavLinks({ location, isScrolled, country });
    const [sidebarstate, setSidebarState] = useState({ 
        visible: false, 
        placement: 'left', 
        title: 'Oahse', 
        items: sidebarlinks
 
      });
    if (loading) {
        return (
          <ImageLoader
            src={oahseicon}
            alt='oahse'
            src2={oahselogo}
            alt2='oahse'
          />
        );
      }
    
    return (
        <>
        {!isMobile ? 
            <Layout style={{ minHeight: '100vh' }}>
                <AdminHeader Companyname={Companyname} isScrolled={true} isMobile={false} user={userDetails} onSearch={handleSearch}/>
                
                <Layout>
                    <Sidebar
                            isAdmin={true}
                            logo={Logo}
                            visible={true}
                            placement={sidebarstate?.placement}
                            title={sidebarstate.title}
                            items={sidebarstate.items}
                            user={userDetails}
                        />
                    <Content style={{
                                    margin: '6px',
                                }}>
                                
                                <Breadcrumb
                                
                                    items={[
                                    {
                                        title: <a href="/">DashBoard</a>,
                                    },
                                    // {
                                    //     title: <a href="/">Application Center</a>,
                                    // },
                                    // {
                                    //     title: <a href="/">Application List</a>,
                                    // },
                                    // {
                                    //     title: 'An Application',
                                    // },
                                    ]}
                                />
                                <div
                                    style={{
                                    padding: '6px 18px',
                                    margin: '8px',
                                    minHeight: '100vh',
                                    backgroundColor:'white'
                                    }}
                                >
                                    Bill is a cat.
                                </div>
                            </Content>
                </Layout>
            </Layout> 
            :
            <Row>
                <Col span={24} >
                    <AdminHeader Companyname={Companyname} isScrolled={true} isMobile={isMobile} user={userDetails} onSearch={handleSearch}/>
                </Col>
                <Col span={24}>
                    <Row>
                        <Col span={24}>
                        
                        <Layout >
                            <Content style={{
                                    margin: '6px',
                                    
                                }}>
                                
                                <Breadcrumb
                                
                                    items={[
                                    {
                                        title: <a href="/">DashBoard</a>,
                                    },
                                    // {
                                    //     title: <a href="/">Application Center</a>,
                                    // },
                                    // {
                                    //     title: <a href="/">Application List</a>,
                                    // },
                                    // {
                                    //     title: 'An Application',
                                    // },
                                    ]}
                                />
                                <div
                                    style={{
                                    padding: '6px 18px',
                                    margin: '8px',
                                    minHeight: '100vh',
                                    backgroundColor:'white'
                                    }}
                                >
                                    Bill is a cat.
                                </div>
                            </Content>
                        </Layout>
                        </Col>
                    </Row>
                </Col>
            </Row>}
        </>
        
    )

}

export default AdminDashBoard;
