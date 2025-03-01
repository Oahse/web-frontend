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
import AdminContent from "./AdminContent";

const AdminDashBoard = ({API_URL,Companyname,isMobile,isTablet }) => {
    
    const breadCrumbItems = [
        {title:'DashBoard'}
    ]
    return (
        <AdminContent 
            API_URL ={API_URL}
            Companyname={Companyname}
            breadCrumbItems={breadCrumbItems}>
            {!isMobile ? 
            <Row gutter={[16, 16]} >
                        
                <Col span={24} style={{paddingLeft: '8px', paddingRight:'8px'}}>
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
            
            :
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
                </Row>}
        </AdminContent>
        
    )

}

export default AdminDashBoard;
