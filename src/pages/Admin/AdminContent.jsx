import { Breadcrumb, Col, Layout, Row} from "antd";
import LineChart from "../../components/ui/Charts/Line";
import Text from "../../components/ui/Typography/Text";
import Card from "../../components/ui/Card/Card";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../components/ui/Button/Button";
import { ReactComponent as CustomersDashboardReport }  from '../../assets/customers-dashboardreport.svg';
import { ReactComponent as CustomersDashboardAds }  from '../../assets/customers-dashboardads.svg';
import { ReactComponent as YouTube }  from '../../assets/youtube.svg';
import { ReactComponent as ProductReviews }  from '../../assets/productsreviews.svg';

const { Content } = Layout;
const AdminContent = ({API_URL,Companyname,isMobile,isTablet, breadCrumbItems=[], children, content }) => {
    
    
    return (
        <Content style={{
            // margin: '6px',
            // overflowY: 'auto',  // Makes the content scrollable
            height: 'calc(100vh - 152px)',  // Ensures it takes full height of the viewport
            scrollbarWidth: 'none',  // Firefox
            msOverflowStyle: 'none',  // Internet Explorer
        }}>
            
            <div className="d-flex justify-content-between align-items-center p-3 mb-3">
                <Breadcrumb
                    items={[
                        {
                            title: <a href="/web-frontend">Home</a>,
                        },
                        ...breadCrumbItems,
                    ]}
                />
                <span className="bg-white p-2" style={{borderRadius: '8px', cursor:'pointer'}}>
                    <Icon icon="uit:calender" width="20" height="20" /> <span className="m-auto">Last 30 days</span>
                </span>
            </div>
        
            <div
                style={{
                    padding: '1px 18px',
                    // margin: '8px',
                    marginTop:'-16px',
                    borderRadius: '8px',
                    // backgroundColor:'white',
                    maxHeight: 'calc(100vh - 192px)',  // 72px is an example for header and padding height, adjust if needed
                    overflowY: 'auto',  // Enables scroll when content overflows
                    scrollbarWidth: 'none',  // Firefox
                    msOverflowStyle: 'none',  // Internet Explorer
                }}
            >
                
                {children?children:content}
            </div>
        </Content>
        
    )

}

export default AdminContent;
