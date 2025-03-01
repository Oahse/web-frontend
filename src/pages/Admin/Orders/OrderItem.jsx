import { Breadcrumb, Col, Layout, Row} from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactComponent as PaidBasket }  from '../../../assets/paid_basket.svg';
import { ReactComponent as FailedBasket }  from '../../../assets/failed_basket.svg';
import Tabs from "../../../components/ui/Tabs/Tabs";
import Table from "../../../components/ui/Table/Table";
import { useState } from "react";
import AdminContent from "../AdminContent";

const { Content } = Layout;

const AdminOrderItem = ({ API_URL, Companyname, isMobile, isTablet, item }) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // State for selected row keys
    const renderTableContent = (items) => {
        // Columns for the Antd Table
        const columns = [
          {
            title: 'Order',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date) => date.toLocaleDateString(), // Format date properly
          },
          {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
          },
          {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
          },
          {
            title: 'Total',
            dataIndex: 'total', // You can calculate total in the render function
            key: 'total',
            render: (_, record) => `$${(record.price * record.quantity).toFixed(2)}`,
          },
          {
            title: 'Payment Status',
            dataIndex: 'payment_status',
            key: 'payment_status',
            render: (_, record) => (
                <>
                  {record.payment_status} {(record.payment_status === false || record.payment_status==='Failed')?<FailedBasket />:<PaidBasket />}
                </>
              ),
          },
          {
            title: 'Fulfillment Status',
            dataIndex: 'fulfillment_status',
            key: 'fulfillment_status',
          },
          {
            title: 'Qty',
            dataIndex: 'quantity',
            key: 'quantity',
          },
          {
            title: 'Delivery Status',
            dataIndex: 'delivery_status',
            key: 'delivery_status',
          },
        ];
    
        return (<Table
                        columns={columns}
                        items={items}
                        onSelectedRowKeys={(selectedRowKeys)=>(setSelectedRowKeys(selectedRowKeys))}
                      />)
      }
    const initialItems = [
      {
        label: 'All',
        children: renderTableContent([
          {
            id: 1,
            date: new Date(),
            customer: 'John Doe',
            brand: 'Brand A',
            price: 50,
            quantity: 2,
            payment_status: 'Paid',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered'
          },
          {
            id: 2,
            date: new Date(),
            customer: 'Jane Smith',
            brand: 'Brand B',
            price: 30,
            quantity: 1,
            payment_status: 'Pending',
            fulfillment_status: 'Pending',
            delivery_status: 'In Progress'
          },
          {
            id: 3,
            date: new Date(),
            customer: 'George Brown',
            brand: 'Brand C',
            price: 20,
            quantity: 3,
            payment_status: 'Failed',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered'
          },
          {
            id: 4,
            date: new Date(),
            customer: 'George Brown',
            brand: 'Brand C',
            price: 20,
            quantity: 3,
            payment_status: 'Failed',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered'
          },
          {
            id: 5,
            date: new Date(),
            customer: 'George Brown',
            brand: 'Brand C',
            price: 20,
            quantity: 3,
            payment_status: 'Failed',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered'
          },
          {
            id: 6,
            date: new Date(),
            customer: 'George Brown',
            brand: 'Brand C',
            price: 20,
            quantity: 3,
            payment_status: 'Failed',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered'
          },
          // Add more items as needed...
        ]),
        key: '1',
      },
      {
        label: 'Unfullfilled',
        children: 'Content of Tab 2',
        key: '2',
      },
      {
        label: 'UnPaid',
        children: 'Content of Tab 3',
        key: '3',
        closable: false,
      },
      {
        label: 'Open',
        children: 'Content of Tab 3',
        key: '4',
        closable: false,
      },
      {
        label: 'Archive',
        children: 'Content of Tab 3',
        key: '5',
        closable: false,
      },
    ];
  
    const breadCrumbItems = [
      {title:'Orders'},
      {title:item?.name || 'test13'}
    ]
    return (
      <AdminContent
        API_URL ={API_URL}
        Companyname={Companyname}
        breadCrumbItems={breadCrumbItems}
        >
          <Row gutter={[16, 16]} >
                  
                  <Col span={24} style={{paddingLeft: '8px', paddingRight:'8px'}}>
                      <Tabs 
                          initialItems={initialItems} 
                          tabBarExtraContent={<div style={{display:'flex',justifyContent:'space-around', alignContent:'center',gap:'10px'}}>
                              <Icon icon="fluent:filter-20-regular" width="25" height="25" />
                              <Icon icon="ph:arrows-down-up-light" width="25" height="25" />
                          </div>}
                      />
                  </Col>
                  {/* <Col span={24} >
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
                  </Col> */}
              </Row>
      </AdminContent>
          
    );
};

export default AdminOrderItem;
