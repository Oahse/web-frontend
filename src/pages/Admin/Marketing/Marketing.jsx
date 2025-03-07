import { Breadcrumb, Col, Layout, Row} from "antd";
import LineChart from "../../../components/ui/Charts/Line";
import Text from "../../../components/ui/Typography/Text";
import Card from "../../../components/ui/Card/Card";
import AdminContent from "../AdminContent";
import BarChart from "../../../components/ui/Charts/BarChart";
import HorizontalBarChart from "../../../components/ui/Charts/HorizontalBarChart";
import DoughnutChart from "../../../components/ui/Charts/DoughnutChart";


const AdminMarketing = ({API_URL,Companyname,isMobile,isTablet }) => {
    
    const breadCrumbItems = [
        {title:'Marketing'}
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
                    <Col span={24}>
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
                        <Row gutter={[16, 16]} className="mt-2">
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
                        
                    </Col>
                    
                </Row>
                }
        </AdminContent>
        
    )

}

export default AdminMarketing;
