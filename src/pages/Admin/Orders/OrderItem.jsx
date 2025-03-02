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
      {title:<a href="/web-frontend">Orders</a>},
      {title:item?.name || 'test13'}
    ]
    const suffix = (
      <span className="bg-white p-2" style={{ borderRadius: '8px', cursor: 'pointer' }}>
        <Icon icon="uit:calender" width="20" height="20" />
        <span className="m-auto">Last 30 days</span>
      </span>
    );
    
    return (
      <Row gutter={[16, 16]} >
          <Col span={24} style={{paddingLeft: '8px', paddingRight:'8px'}}>
            <Row gutter={[16, 16]} >
              <Col  xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                  dfdf
              </Col>
            </Row>
          </Col>
          <Col span={24} style={{paddingLeft: '8px', paddingRight:'8px'}}>
              dfdf
          </Col>
          <Col span={24} style={{paddingLeft: '8px', paddingRight:'8px'}}>
              dfdf
          </Col>
      </Row>
          
    );
};

export default AdminOrderItem;
