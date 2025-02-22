import React,{ useState} from 'react';
import { Layout} from "antd"
import Logo from '../../assets/oahse_logo_text_dark.png';
import useDeviceType from "../../hooks/useDeviceType";
import { useAuth } from "../../services/auth";
import ImageLoader from "../../components/Loader";
import oahseicon from '../../assets/oahse-icon.png';
import oahselogo from '../../assets/oahse-logo.png';
import useIsScrolled from "../../hooks/useIsScrolled";
import Sidebar from "../../components/ui/SideBar/SideBar";
import SideNavLinks from "../../components/ui/Header/SideNavLinks";
import { useCountryByLocation } from "../../hooks/useCountry";
import { useLocation } from "react-router-dom";
import AdminHeader from "../../components/ui/Header/AdminHeader";
import AdminDashBoard from "./Dashboard";
import AdminOrders from "./Orders";
import AdminProducts from './Products';
import AdminCustomers from './Customers';
import AdminFinance from './Finance';
import AdminAnalytics from './Analytics';
import AdminDiscount from './Discount';
import AdminMarketing from './Marketing';
import AdminPlatform from './Platform';
import BottomNavbar from '../../components/ui/BottomNavBar/BottomNavBar';
import AdminContents from './Content';
import { Footer } from 'antd/es/layout/layout';

const Admin = ({API_URL,Companyname }) => {
    const { isMobile, isTablet} = useDeviceType();
    const isScrolled = useIsScrolled();
    const { isLoggedIn:isloggedIn, userDetails, loading } = useAuth();

    
    const { country, error } = useCountryByLocation();
    // console.log(country,'=========')
    const location = useLocation(); // Get the current location
    if (location.pathname === '/shop') {
        console.log('Current URL is /shop');
        // Perform actions specific to the /shop route
    }
    const handleSearch = (e) =>{
        console.log(e,isloggedIn, error)
    }
    const sidebarlinks = SideNavLinks({ location, isScrolled, country,isMobile});
    const draweritems = SideNavLinks({ location, isScrolled, country, isTablet });
    const bottombarlinks = SideNavLinks({ location, isScrolled, country, isMobile });
    const sidebarstate = { 
        visible: false, 
        placement: 'left', 
        title: 'Oahse', 
        items: sidebarlinks
 
      };
    const [activepage, setActivePage] = useState(0)
    const handleActivePage = (item, index)=>{
        setActivePage(index);
    }
    const renderContent =() => {
        switch (activepage) {
            case 0:
                return <AdminDashBoard isMobile={isMobile} isTablet={isTablet} />;
            case 1:
                return <AdminOrders isMobile={isMobile} isTablet={isTablet} />;
            case 2:
                return <AdminProducts isMobile={isMobile} isTablet={isTablet} />;
            case 3:
                return <AdminCustomers isMobile={isMobile} isTablet={isTablet} />;
            case 4:
                return <AdminContents isMobile={isMobile} isTablet={isTablet} />;
            case 5:
                return <AdminFinance isMobile={isMobile} isTablet={isTablet} />;
            case 6:
                return <AdminAnalytics isMobile={isMobile} isTablet={isTablet} />;
            case 7:
                return <AdminDiscount isMobile={isMobile} isTablet={isTablet} />;
            case 8:
                return <AdminMarketing isMobile={isMobile} isTablet={isTablet} />;
            case 9:
                return <AdminPlatform isMobile={isMobile} isTablet={isTablet} />;
            case 10:
                return <AdminPlatform isMobile={isMobile} isTablet={isTablet} />; //profile page view and edit
            default:
                return <AdminDashBoard isMobile={isMobile} isTablet={isTablet} />;
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
                <AdminHeader Companyname={Companyname} isScrolled={true} isMobile={false} user={userDetails} onSearch={handleSearch} onActivePage={(item, index)=>handleActivePage(item, index)}/>
                
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
                <Footer>--</Footer>
            </Layout> 
            :
            <Layout>
                <Layout>
                    <AdminHeader Companyname={Companyname} isScrolled={true} isMobile={isMobile} user={userDetails} onSearch={handleSearch} onActivePage={(item, index)=>handleActivePage(item, index)}/>
                    
                    {renderContent()}
                </Layout>
                <Footer>--</Footer>
                {isMobile && <BottomNavbar items={bottombarlinks} onActivePage={(item, index)=>handleActivePage(item, index)}
                user={userDetails} draweritems={draweritems} />}
            </Layout>}
        </>
        
    )

}

export default Admin;
