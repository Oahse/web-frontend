import { Col, Layout, Row } from "antd"
import Logo from '../../assets/oahse_logo_text_dark.png';
import useDeviceType from "../../hooks/useDeviceType";
import { useAuth } from "../../services/auth";
import ImageLoader from "../../components/Loader";
import oahseicon from '../../assets/oahse-icon.png';
import oahselogo from '../../assets/oahse-logo.png';
import useIsScrolled from "../../hooks/useIsScrolled";
import Sidebar from "../../components/ui/SideBar/SideBar";
import SideNavLinks from "../../components/ui/Header/SideNavLinks";
import { useState } from "react";
import { useCountryByLocation } from "../../hooks/useCountry";
import { useLocation } from "react-router-dom";
import AdminHeader from "../../components/ui/Header/AdminHeader";
import AdminDashBoard from "./Dashboard";
import AdminOrders from "./Orders";
import AdminProducts from './Products';
import AdminCustomers from './Customers';
import AdminFinance from './Finance';
import AdminAnalytics from './Customers';
import AdminDiscount from './Discount';
import AdminMarketing from './Marketing';
import AdminPlatform from './Platform';

const Admin = ({API_URL,Companyname }) => {
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
    const [activepage, setActivePage] = useState(0)
    const handleActivePage = (item, index)=>{
        console.log(index,'====')
        setActivePage(index);
    }
    const renderContent =() => {
        switch (activepage) {
            case 0:
                return <AdminDashBoard isMobile={isMobile} />;
            case 1:
                return <AdminOrders isMobile={isMobile} />;
            case 2:
                return <AdminProducts isMobile={isMobile} />;
            case 3:
                return <AdminCustomers isMobile={isMobile} />;
            case 4:
                return <AdminFinance isMobile={isMobile} />;
            case 5:
                return <AdminAnalytics isMobile={isMobile} />;
            case 6:
                return <AdminDiscount isMobile={isMobile} />;
            case 7:
                return <AdminMarketing isMobile={isMobile} />;
            case 8:
                return <AdminPlatform isMobile={isMobile} />;
            default:
                return <AdminDashBoard isMobile={isMobile} />;
        }
    }
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
                <AdminHeader Companyname={Companyname} isScrolled={true} isMobile={false} user={userDetails} onSearch={handleSearch} onActivePage={handleActivePage}/>
                
                <Layout>
                    <Sidebar
                            isAdmin={true}
                            logo={Logo}
                            visible={true}
                            placement={sidebarstate?.placement}
                            title={sidebarstate.title}
                            items={sidebarstate.items}
                            user={userDetails}
                            onActivePage={(item, index)=>handleActivePage(item, index)}
                        />
                    {renderContent()}
                </Layout>
            </Layout> 
            :
            <Row>
                <Col span={24} >
                    <AdminHeader Companyname={Companyname} isScrolled={true} isMobile={isMobile} user={userDetails} onSearch={handleSearch} onActivePage={handleActivePage}/>
                </Col>
                <Col span={24}>
                    <Row>
                        <Col span={24}>
                        
                        <Layout >
                            {renderContent()}
                        </Layout>
                        </Col>
                    </Row>
                </Col>
            </Row>}
        </>
        
    )

}

export default Admin;
