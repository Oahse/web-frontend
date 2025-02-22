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
const AdminDashBoard = ({API_URL,Companyname,isMobile,isTablet }) => {
    
    
    return (
        <>
        {!isMobile ? 
            <Content style={{
                // margin: '6px',
                overflowY: 'auto',  // Makes the content scrollable
                height: '100vh',  // Ensures it takes full height of the viewport
                scrollbarWidth: 'none',  // Firefox
                msOverflowStyle: 'none',  // Internet Explorer
            }}>
                
                <div className="d-flex justify-content-between align-items-center p-3">
                    <Breadcrumb
                        items={[
                            {
                                title: <a href="/">Home</a>,
                            },
                            {
                                title: 'DashBoard',
                            },
                        ]}
                    />
                    <span className="bg-white p-2" style={{borderRadius: '8px', cursor:'pointer'}}>
                        <Icon icon="uit:calender" width="20" height="20" /> <span className="m-auto">Last 30 days</span>
                    </span>
                </div>
            
                <div
                    style={{
                        padding: '18px 18px',
                        // margin: '8px',
                        marginTop:'-16px',
                        borderRadius: '8px',
                        // backgroundColor:'white',
                        maxHeight: 'calc(100vh - 152px)',  // 72px is an example for header and padding height, adjust if needed
                        overflowY: 'auto',  // Enables scroll when content overflows
                        scrollbarWidth: 'none',  // Firefox
                        msOverflowStyle: 'none',  // Internet Explorer
                    }}
                >
                    
                    <Row gutter={[16, 16]} >
                        
                        <Col span={24} style={{padding: '8px'}}>
                            <Row gutter={[16, 16]}>
                                <Col span={6}>
                                    <Card 
                                        className="bg-gray" 
                                        style={{height:'5rem'}} 
                                        title={<Text tag='small' className="fw-400">Overtime Sessions</Text>} 
                                        description={<Text tag='span' className="text-success">100 visitors</Text>} 
                                    />
                                </Col>
                                <Col span={6}>
                                    <Card 
                                        className="bg-gray" 
                                        style={{height:'5rem'}} 
                                        title={<Text tag='small' className="fw-400">Total Sales</Text>} 
                                        description={<Text tag='span' className="text-dark fw-500">CA$0 _</Text>} 
                                    />
                                </Col>
                                <Col span={6}>
                                    <Card 
                                        className="bg-gray" 
                                        style={{height:'5rem'}} 
                                        title={<Text tag='small' className="fw-400">Orders</Text>} 
                                        description={<Text tag='span' className="text-dark fw-500">0 _</Text>} 
                                    />
                                </Col>
                                <Col span={6}>
                                    <Card 
                                        className="bg-gray" 
                                        style={{height:'5rem'}} 
                                        title={<Text tag='small' className="fw-400">Conversion Rate Over Time</Text>} 
                                        description={<Text tag='span' className="text-dark fw-500">0 _</Text>} 
                                    />
                                    
                                </Col>
                            </Row>
                            <LineChart isMobile={isMobile}/>
                        </Col>
                        <Col span={24} >
                            <YouTube style={{width:'100%', cursor:'pointer'}}/>
                        </Col>
                        <Col span={24} >
                            <Row gutter={[16, 16]}>
                                <Col  xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                                    <Card 
                                        variant="border" 
                                        description={
                                            <Row gutter={[8, 8]} justify="center" style={{ width: '100%' }}>
                                                    <Col span={24}  style={{ display: 'flex', justifyContent: 'center'}}>
                                                        {<CustomersDashboardReport />}
                                                    </Col>
                                                    <Col span={24}  style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                                                        <Text >Understand requirements of your customers</Text>
                                                        <Text tag='p' fontWeight="fw-400">Analyze our customers with the Recency, Frequency, and Monetary (RFM). Understand their ratings and reviews on your products and identify problems .</Text>
                                                    </Col>
                                                    <Col span={24} style={{ display: 'flex', justifyContent: 'center'}}>
                                                        <Button variant="outlined" color="secondary" text="View Report" />
                                                    </Col>
                                                </Row>

                                        } 
                                        style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',cursor:'pointer',height:'430px'}} 
                                        />
                                </Col>
                                <Col  xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                                    <Card 
                                        variant="border" 
                                        description={
                                            <Row gutter={[8, 8]} justify="center" style={{ width: '100%' }}>
                                                    <Col span={24}  style={{ display: 'flex', justifyContent: 'center'}}>
                                                        {<CustomersDashboardAds />}
                                                    </Col>
                                                    <Col span={24}  style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                                                        <Text >Increase sales and attract customers</Text>
                                                        <Text tag='p' fontWeight="fw-400">What’s New? Attract customer’s interest to your products and increase demands on your products. Explore our paid Ads on our platform.</Text>
                                                    </Col>
                                                    <Col span={24} style={{ display: 'flex', justifyContent: 'center'}}>
                                                        <Button variant="outlined" color="secondary" text="Explore Paid Ads" />
                                                    </Col>
                                                </Row>

                                        } 
                                        style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',cursor:'pointer',height:'430px'}} 
                                        />
                                    
                                </Col>
                                <Col span={24}>
                                    <Card 
                                        variant="border" 
                                        description={
                                        (isMobile || isTablet) ?
                                        <Row gutter={[8, 8]} justify="center" style={{ width: '100%' }}>
                                            <Col span={24}  style={{ display: 'flex', justifyContent: 'center', padding:'auto'}}>
                                                {<ProductReviews style={{height:'200px'}} />}
                                            </Col>
                                            <Col span={24} style={{ display: 'flex', justifyContent: 'center', padding:'auto'}} >
                                                <Row gutter={[8, 8]}>
                                                    <Col span={24}  style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                                                        <Text >Show product reviews</Text>
                                                        <Text tag='p' fontWeight="fw-400">See how products are rated. Understand how customers feels about the products and what they have to say about the products. Customers first and they are always right! Explore their opinions!</Text>
                                                    </Col>
                                                    <Col span={24} style={{ display: 'flex', justifyContent: 'center'}}>
                                                        <Button variant="outlined" color="secondary" text="View Reviews" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            
                                        </Row>:
                                        <Row gutter={[8, 8]} justify="center" style={{ width: '100%' }}>
                                            <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24} style={{ display: 'flex', justifyContent: 'center', padding:'16px'}} >
                                                <Row gutter={[8, 8]} >
                                                    <Col span={24}  style={{ display: 'flex', flexDirection:'column', justifyContent: 'start'}}>
                                                        <Text >Show product reviews</Text>
                                                        <Text tag='p' fontWeight="fw-400">See how products are rated. Understand how customers feels about the products and what they have to say about the products. Customers first and they are always right! Explore their opinions!</Text>
                                                    </Col>
                                                    <Col span={24} style={{ display: 'flex', justifyContent: 'start'}}>
                                                        <Button variant="outlined" color="secondary" text="View Reviews" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}  style={{ display: 'flex', justifyContent: 'center', padding:'auto'}}>
                                                {<ProductReviews  style={{height:'200px'}}  />}
                                            </Col>
                                            
                                        </Row>} 
                                        style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', cursor:'pointer',height:`${(isMobile || isTablet)?'430px' :'200px'}`}}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Content>
            
            :
            <Content style={{
                // margin: '6px',
                overflowY: 'auto',  // Makes the content scrollable
                height: '100vh',  // Ensures it takes full height of the viewport
                scrollbarWidth: 'none',  // Firefox
                msOverflowStyle: 'none',  // Internet Explorer
            }}>
            
            <div className="d-flex justify-content-between align-items-center p-3">
                <Breadcrumb
                
                    items={[
                        {
                            title: <a href="/">Home</a>,
                        },
                        {
                            title: 'DashBoard',
                        },
                    ]}
                />
                <span className="bg-white p-2" style={{borderRadius: '8px', cursor:'pointer'}}>
                    <i class="fa-solid fa-calendar"></i> <span className="ms-1">Last 30 days</span>
                </span>
            </div>
            <div
                style={{
                padding: '18px 18px',
                // margin: '8px',
                marginTop:'-16px',
                minHeight: '100vh',
                // backgroundColor:'white',
                maxHeight: 'calc(100vh - 152px)',  // 72px is an example for header and padding height, adjust if needed
                overflowY: 'auto',  // Enables scroll when content overflows
                scrollbarWidth: 'none',  // Firefox
                msOverflowStyle: 'none',  // Internet Explorer
            }}
            >
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Row  gutter={[16, 16]}>
                            <Col span={12}>
                                <Card 
                                    className="bg-gray" 
                                    style={{height:'5rem'}} 
                                    title={<Text tag='small' className="fw-400">Overtime Sessions</Text>} 
                                    description={<Text tag='span' className="text-success">100 visitors</Text>} 
                                />
                            </Col>
                            <Col span={12}>
                                <Card 
                                    className="bg-gray" 
                                    style={{height:'5rem'}} 
                                    title={<Text tag='small' className="fw-400">Total Sales</Text>} 
                                    description={<Text tag='span' className="text-dark fw-500">CA$0 _</Text>} 
                                />
                            </Col>
                            <Col span={12}>
                                <Card 
                                    className="bg-gray" 
                                    style={{height:'5rem'}} 
                                    title={<Text tag='small' className="fw-400">Orders</Text>} 
                                    description={<Text tag='span' className="text-dark fw-500">0 _</Text>} 
                                />
                            </Col>
                            <Col span={12}>
                                <Card 
                                    className="bg-gray" 
                                    style={{height:'5rem'}} 
                                    title={<Text tag='small' className="fw-400">Conversion Rate Over Time</Text>} 
                                    description={<Text tag='span' className="text-dark fw-500">0 _</Text>} 
                                />
                            </Col>
                        </Row>
                        <LineChart isMobile={isMobile}/>
                    </Col>
                    <Col span={24} >
                        <YouTube style={{width:'100%', cursor:'pointer'}}/>
                    </Col>
                    <Col span={24} >
                        <Row gutter={[16, 16]}>
                            <Col  xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                                <Card 
                                    variant="border" 
                                    description={
                                        <Row gutter={[8, 8]} justify="center" style={{ width: '100%' }}>
                                                <Col span={24}  style={{ display: 'flex', justifyContent: 'center'}}>
                                                    {<CustomersDashboardReport style={{height:'200px'}} />}
                                                </Col>
                                                <Col span={24}  style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                                                    <Text >Understand requirements of your customers</Text>
                                                    <Text tag='p' fontWeight="fw-400">Analyze our customers with the Recency, Frequency, and Monetary (RFM). Understand their ratings and reviews on your products and identify problems .</Text>
                                                </Col>
                                                <Col span={24} style={{ display: 'flex', justifyContent: 'center'}}>
                                                    <Button variant="outlined" color="secondary" text="View Report" />
                                                </Col>
                                            </Row>

                                    } 
                                    style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',cursor:'pointer',height:'430px'}} 
                                    />
                            </Col>
                            <Col  xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                                <Card 
                                    variant="border" 
                                    description={
                                        <Row gutter={[8, 8]} justify="center" style={{ width: '100%' }}>
                                                <Col span={24}  style={{ display: 'flex', justifyContent: 'center'}}>
                                                    {<CustomersDashboardAds  style={{height:'200px'}}/>}
                                                </Col>
                                                <Col span={24}  style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                                                    <Text >Increase sales and attract customers</Text>
                                                    <Text tag='p' fontWeight="fw-400">What’s New? Attract customer’s interest to your products and increase demands on your products. Explore our paid Ads on our platform.</Text>
                                                </Col>
                                                <Col span={24} style={{ display: 'flex', justifyContent: 'center'}}>
                                                    <Button variant="outlined" color="secondary" text="View Report" />
                                                </Col>
                                            </Row>

                                    } 
                                    style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',cursor:'pointer',height:'430px'}} 
                                    />
                                
                            </Col>
                            <Col span={24}>
                                <Card 
                                    variant="border" 
                                    description={
                                        <Row gutter={[8, 8]} justify="center" style={{ width: '100%' }}>
                                            <Col span={24}  style={{ display: 'flex', justifyContent: 'center', padding:'auto'}}>
                                                {<ProductReviews style={{height:'200px'}} />}
                                            </Col>
                                            <Col span={24} style={{ display: 'flex', justifyContent: 'center', padding:'auto'}} >
                                                <Row gutter={[8, 8]}>
                                                    <Col span={24}  style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                                                        <Text >Show product reviews</Text>
                                                        <Text tag='p' fontWeight="fw-400">See how products are rated. Understand how customers feels about the products and what they have to say about the products. Customers first and they are always right! Explore their opinions!</Text>
                                                    </Col>
                                                    <Col span={24} style={{ display: 'flex', justifyContent: 'center'}}>
                                                        <Button variant="outlined" color="secondary" text="View Reviews" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        
                                        </Row>} 
                                    style={{boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', cursor:'pointer',height:`430px`}}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Content>}
        </>
        
    )

}

export default AdminDashBoard;
