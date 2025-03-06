import { Breadcrumb, Col, Layout, Row} from "antd";
import LineChart from "../../../components/ui/Charts/Line";
import Text from "../../../components/ui/Typography/Text";
import Card from "../../../components/ui/Card/Card";
import AdminContent from "../AdminContent";
import BarChart from "../../../components/ui/Charts/BarChart";
import PieChart from "../../../components/ui/Charts/DoughnutChart";
import HorizontalBarChart from "../../../components/ui/Charts/HorizontalBarChart";
import DoughnutChart from "../../../components/ui/Charts/DoughnutChart";


const AdminAnalytics = ({API_URL,Companyname,isMobile,isTablet }) => {
    
    const breadCrumbItems = [
        {title:'Analytics'}
    ]
    const data = [
        { location: 'Nigeria', sessions: 14 },
        { location: 'United Kingdom', sessions: 4 },
        { location: 'Canada', sessions: 1 },
        { location: 'United States of America', sessions: 1 },
      ];
    return (
        <AdminContent 
            API_URL ={API_URL}
            Companyname={Companyname}
            breadCrumbItems={breadCrumbItems}>
            {
                <Row gutter={[16, 16]} >
                    <Col span={24} style={{paddingLeft: '8px', paddingRight:'8px'}}>
                        <Row gutter={[16, 16]}>
                            <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} >
                                <Card 
                                    className="bg-white border-1 border" 
                                    style={{height:'5rem'}} 
                                    title={<Text tag='small' className="fw-400">Gross Sales</Text>} 
                                    description={<Text tag='span' className="text-success">CA$0 _</Text>} 
                                />
                            </Col>
                            <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} >
                                <Card 
                                    className="bg-white border-1 border" 
                                    style={{height:'5rem'}} 
                                    title={<Text tag='small' className="fw-400">Returning Sales</Text>} 
                                    description={<Text tag='span' className="text-dark fw-500">0 %</Text>} 
                                />
                            </Col>
                            <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} >
                                <Card 
                                    className="bg-white border-1 border" 
                                    style={{height:'5rem'}} 
                                    title={<Text tag='small' className="fw-400">Fullfilled Orders</Text>} 
                                    description={<Text tag='span' className="text-dark fw-500">4 _</Text>} 
                                />
                            </Col>
                            <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12} >
                                <Card 
                                    className="bg-white border-1 border" 
                                    style={{height:'5rem'}} 
                                    title={<Text tag='small' className="fw-400">Orders</Text>} 
                                    description={<Text tag='span' className="text-dark fw-500">0 _</Text>} 
                                />
                                
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]} className="mt-3">
                            <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24} >
                                <div className="col-item border-1 ms-auto border">
                                    <LineChart isMobile={isMobile}/>
                                </div>
                                
                            </Col>
                            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24} >
                                <div className="d-flex flex-column justify-content-start align-items-start col-item border-1 ms-auto border">
                                    <Text tag="p" fontWeight="fw-600" className={'mb-2'}>
                                        Total Sales Break Down
                                    </Text>
                                    <Text
                                        fontColor="text-black"
                                        fontSize="fs-md"
                                        fontWeight="fw-400"
                                        bgColor='bg-gray'
                                        className="mt-1 text-break border-1 border rounded-md p-2 w-100 d-flex justify-content-between align-items-center"
                                        >
                                        <span>Gross Sales</span> 
                                        <span>CA$ 16.0 _</span>
                                    </Text>
                                    <Text
                                        fontColor="text-black"
                                        fontSize="fs-md"
                                        fontWeight="fw-400"
                                        bgColor='bg-gray'
                                        className="mt-1 text-break border-1 border rounded-md p-2 w-100 d-flex justify-content-between align-items-center"
                                        >
                                        <span>Discounts</span> 
                                        <span>CA$ 16.0 _</span>
                                    </Text>
                                    <Text
                                        fontColor="text-black"
                                        fontSize="fs-md"
                                        fontWeight="fw-400"
                                        bgColor='bg-gray'
                                        className="mt-1 text-break border-1 border rounded-md p-2 w-100 d-flex justify-content-between align-items-center"
                                        >
                                        <span>Net Sales</span> 
                                        <span>CA$ 16.0 _</span>
                                    </Text>
                                    <Text
                                        fontColor="text-black"
                                        fontSize="fs-md"
                                        fontWeight="fw-400"
                                        bgColor='bg-gray'
                                        className="mt-1 text-break border-1 border rounded-md p-2 w-100 d-flex justify-content-between align-items-center"
                                        >
                                        <span>Returns</span> 
                                        <span>CA$ 16.0 _</span>
                                    </Text>
                                    <Text
                                        fontColor="text-black"
                                        fontSize="fs-md"
                                        fontWeight="fw-400"
                                        bgColor='bg-gray'
                                        className="mt-1 text-break border-1 border rounded-md p-2 w-100 d-flex justify-content-between align-items-center"
                                        >
                                        <span>Taxes</span> 
                                        <span>CA$ 16.0 _</span>
                                    </Text>
                                    <Text
                                        fontColor="text-black"
                                        fontSize="fs-md"
                                        fontWeight="fw-400"
                                        bgColor='bg-gray'
                                        className="mt-1 text-break border-1 border rounded-md p-2 w-100 d-flex justify-content-between align-items-center"
                                        >
                                        <span>Shipping Charges</span> 
                                        <span>CA$ 16.0 _</span>
                                    </Text>
                                    <Text
                                        fontColor="text-black"
                                        fontSize="fs-md"
                                        fontWeight="fw-400"
                                        bgColor='bg-gray'
                                        className="mt-1 text-break border-1 border rounded-md p-2 w-100 d-flex justify-content-between align-items-center"
                                        >
                                        <span>Total Sales</span> 
                                        <span>CA$ 16.0 _</span>
                                    </Text>

                                </div>
                            </Col>
                        </Row>
                        
                    </Col>
                    <Col span={24} >
                        <Row gutter={[16, 16]} className="mt-1">
                            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24} >
                                <div className="col-item border-1 ms-auto border d-flex flex-column justify-content-start align-items-start">
                                    <Text tag="p" fontWeight="fw-600">
                                        Average Order Value over time
                                    </Text>
                                    <LineChart isMobile={isMobile} height={'250px'} xaxis={['1/25', '2/25', '3/25', '4/25', '5/25', '6/25']}/>
                                </div>
                                
                            </Col>
                            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24} >
                                <div className="col-item border-1 ms-auto border d-flex flex-column justify-content-start align-items-start">
                                    <Text tag="p" fontWeight="fw-600">
                                        Total says by product
                                    </Text>
                                    <LineChart isMobile={isMobile} height={'250px'} xaxis={['1/25', '2/25', '3/25', '4/25', '5/25', '6/25']}/>
                                </div>
                            </Col>
                            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24} >
                                <div className="col-item border-1 ms-auto border d-flex flex-column justify-content-start align-items-start">
                                    <Text tag="p" fontWeight="fw-600">
                                        Sessions over time
                                    </Text>
                                    <LineChart isMobile={isMobile} height={'250px'} xaxis={['1/25', '2/25', '3/25', '4/25', '5/25', '6/25']}/>
                                </div>
                                
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} >
                        <Row gutter={[16, 16]} className="mt-1">
                            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24} >
                                <div className="col-item border-1 ms-auto border d-flex flex-column justify-content-start align-items-start">
                                    <Text tag="p" fontWeight="fw-600">
                                        Conversion rate over time
                                    </Text>
                                    <BarChart label={'Sales Over Months'} />
                                </div>
                                
                            </Col>
                            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24} >
                                <div className="col-item border-1 ms-auto border d-flex flex-column justify-content-start align-items-start">
                                    <Text tag="p" fontWeight="fw-600">
                                        Conversion rate brakedown
                                    </Text>
                                    <div style={{ width: '100%', height: 250, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text tag="small" fontWeight="fw-300">
                                            There is no information for this data range
                                        </Text>
                                    </div>
                                </div>
                                
                            </Col>
                            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24} >
                                <div className="col-item border-1 ms-auto border d-flex flex-column justify-content-start align-items-start">
                                    <Text tag="p" fontWeight="fw-600">
                                        Sessions by device type
                                    </Text>
                                    <DoughnutChart />
                                </div>
                                
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} >
                        <Row gutter={[16, 16]} className="mt-1">
                            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24} >
                                <div className="col-item border-1 ms-auto border d-flex flex-column justify-content-start align-items-start">
                                    <Text tag="p" fontWeight="fw-600">
                                        Sessions by Location
                                    </Text>
                                    <HorizontalBarChart data={data} />
                                </div>
                                
                            </Col>
                            <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24} >
                                <div className="col-item border-1 ms-auto border d-flex flex-column justify-content-start align-items-start">
                                    <Text tag="p" fontWeight="fw-600">
                                        Top referrers by sessions
                                    </Text>
                                    
                                    <HorizontalBarChart data={data} />
                                </div>
                                
                            </Col>
                            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24} >
                                <div className="col-item border-1 ms-auto border d-flex flex-column justify-content-start align-items-start">
                                    <Text tag="p" fontWeight="fw-600">
                                        Product by sell through rate
                                    </Text>
                                    <BarChart label={'Sales Over Months'} />
                                </div>
                                
                            </Col>
                        </Row>
                    </Col>
                </Row>
                }
        </AdminContent>
        
    )

}

export default AdminAnalytics;
