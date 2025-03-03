import React, { useEffect, useState } from "react";
import { Avatar, Col,Modal,Row} from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactComponent as PaidBasket } from "../../../assets/paid_basket.svg";
import { ReactComponent as FailedBasket } from "../../../assets/failed_basket.svg";
import Tabs from "../../../components/ui/Tabs/Tabs";
import Table from "../../../components/ui/Table/Table";
import AdminContent from "../AdminContent";
import { exportToExcel, genHtmlPdf, updateURL } from "../../../utils/helper";
import AdminOrderItem from "./OrderItem";
import Button from "../../../components/ui/Button/Button";
import List from "../../../components/ui/List/List";
import Text from "../../../components/ui/Typography/Text";
import { useParams } from "react-router-dom";

const AdminOrders = ({ API_URL, Companyname, isMobile, isTablet, itemnumber,add=false }) => {
  const { id } = useParams(); // Get the `id` from the URL
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // State for selected row keys
  const [selecteditems, setSelectedItems] = useState([])
  const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: "Orders" }]); // Breadcrumb state
  const [currentitems, setCurrentItems] = useState([
    {
      id: 1,
      date: new Date(),
      customer: 'John Doe',
      brand: 'Brand A',
      name: 'iPhone 12 Pro Max',
      price: 50,
      currency: '$',
      quantity: 2,
      payment_status: 'Paid',
      fulfillment_status: 'Fulfilled',
      delivery_status: 'Delivered',
    },
    {
      id: 2,
      date: new Date(),
      customer: 'Jane Smith',
      brand: 'Brand B',
      name: 'Samsung Galaxy S21',
      price: 30,
      currency: '$',
      quantity: 1,
      payment_status: 'Pending',
      fulfillment_status: 'Pending',
      delivery_status: 'In Progress',
    },
    {
      id: 3,
      date: new Date(),
      customer: 'George Brown',
      brand: 'Brand C',
      name: 'MacBook Pro M1',
      price: 20,
      currency: '$',
      quantity: 3,
      payment_status: 'Failed',
      fulfillment_status: 'Fulfilled',
      delivery_status: 'Delivered',
    },
    {
      id: 4,
      date: new Date(),
      customer: 'Anna Lee',
      brand: 'Brand D',
      name: 'iPad Pro 2021',
      price: 40,
      currency: '$',
      quantity: 1,
      payment_status: 'Paid',
      fulfillment_status: 'Fulfilled',
      delivery_status: 'Shipped',
    },
    {
      id: 5,
      date: new Date(),
      customer: 'David Wright',
      brand: 'Brand E',
      name: 'AirPods Pro',
      price: 70,
      currency: '$',
      quantity: 4,
      payment_status: 'Failed',
      fulfillment_status: 'Pending',
      delivery_status: 'Not Shipped',
    },
    {
      id: 6,
      date: new Date(),
      customer: 'Linda Harris',
      brand: 'Brand F',
      name: 'OnePlus 9',
      price: 25,
      currency: '$',
      quantity: 2,
      payment_status: 'Paid',
      fulfillment_status: 'Fulfilled',
      delivery_status: 'Delivered',
    },
    {
      id: 7,
      date: new Date(),
      customer: 'James Scott',
      brand: 'Brand G',
      name: 'Google Pixel 5',
      price: 60,
      currency: '$',
      quantity: 3,
      payment_status: 'Pending',
      fulfillment_status: 'Fulfilled',
      delivery_status: 'In Progress',
    },
    {
      id: 8,
      date: new Date(),
      customer: 'Mary Adams',
      brand: 'Brand H',
      name: 'Sony WH-1000XM4',
      price: 100,
      currency: '$',
      quantity: 2,
      payment_status: 'Paid',
      fulfillment_status: 'Fulfilled',
      delivery_status: 'Delivered',
    },
  ])
  const [isAdd, setAdd] = useState(add);
  const [item, setItem] = useState(id ? currentitems.find((item) => item.id.toString() === id) : null);
  
  // console.log(window.location,'location')
  const handleOrder = () => {
    // console.log("=====ppp");
    const url = `${window.location.origin}/web-frontend/admin/orders`;
    updateURL(url, {});
    
    setBreadCrumbItems([
      { title: 'Orders' }
    ]);
    setItem(null);
    setAdd(false);
  };
  
  const handleOrderItem = (record) => {
    // console.log(record,"=====");
    const url = `${window.location.origin}/web-frontend/admin/orders/${record.id}`;
    updateURL(url, {});
    
    setBreadCrumbItems([
      { title: <a onClick={handleOrder} style={{ cursor: 'pointer' }}>Orders</a> },
      { title: record.id }
    ]);
    setItem(record);
    setAdd(false);
  };

  const handleSelectedItems =(items)=>{
      // console.log(items,'|||')
      setSelectedItems(items)
  }
  const handleAddItem = (e) =>{
    console.log('is adding---')
        const url = `${window.location.origin}/web-frontend/admin/orders/add`;
        updateURL(url, {});
        
        setBreadCrumbItems([
          { title: <a onClick={handleOrder} style={{ cursor: 'pointer' }}>Orders</a> },
          { title: 'Add'}
        ]);
        setAdd(true);
    }
  
  const handleDeleteItems = (items) => {
    Modal.confirm({
      title: 'Are you sure you want to delete these orders?',
      onOk: () => {
        const updatedItems = currentitems.filter((currentItem) => 
          !items.some(item => item.id === currentItem.id)
        );
        setCurrentItems(updatedItems);
      },
    });
  };

  const renderTableContent = (items) => {
    const columns = [
      {
        title: "Order",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        render: (date) => date.toLocaleDateString(), // Format date properly
      },
      {
        title: "Customer",
        dataIndex: "customer",
        key: "customer",
        render:(_,record) =>(<div className="d-flex justify-content-start align-items-start" style={{gap:'0.5rem'}}>
          <Avatar src={record?.picture || `https://picsum.photos/200/300?random=${record.id}`} shape='square' size={'small'} />
          <Text tag="p" fontWeight="fw-300">
              {record.customer}
          </Text>
      </div>)
      },
      
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      
      {
        title: "Payment Status",
        dataIndex: "payment_status",
        key: "payment_status",
        render: (_, record) => (
          <>
            {record.payment_status}{" "}
            {record.payment_status === false || record.payment_status === "Failed" ? (
              <FailedBasket />
            ) : (
              <PaidBasket />
            )}
          </>
        ),
      },
      {
        title: "Fulfillment Status",
        dataIndex: "fulfillment_status",
        key: "fulfillment_status",
      },
      {
        title: "Qty",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Total",
        dataIndex: "total", // You can calculate total in the render function
        key: "total",
        render: (_, record) => `$${(record.price * record.quantity).toFixed(2)}`,
      },
      {
        title: "Delivery Status",
        dataIndex: "delivery_status",
        key: "delivery_status",
      },
    ];
    
    return (
      <>
        {isMobile?
        <List id='orders-table' items={items} onSelectedItems={handleSelectedItems} onRowClick={handleOrderItem}/>
        :
        <Table
          id='orders-table'
          columns={columns}
          items={items}
          onSelectedRowKeys={(selectedRowKeys) => setSelectedRowKeys(selectedRowKeys)}
          onSelectedItems={handleSelectedItems}
          onRowClick={handleOrderItem}
        />}
      </>
    );
  };

  // Now let's define initialItems with data for each tab
    const initialItems = [
        {
          label: 'All',
          children: renderTableContent([
          {
            id: 1,
            date: new Date(),
            customer: 'John Doe',
            brand: 'Brand A',
            name: 'iPhone 12 Pro Max',
            price: 50,
            currency: '$',
            quantity: 2,
            payment_status: 'Paid',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered',
          },
          {
            id: 2,
            date: new Date(),
            customer: 'Jane Smith',
            brand: 'Brand B',
            name: 'Samsung Galaxy S21',
            price: 30,
            currency: '$',
            quantity: 1,
            payment_status: 'Pending',
            fulfillment_status: 'Pending',
            delivery_status: 'In Progress',
          },
          {
            id: 3,
            date: new Date(),
            customer: 'George Brown',
            brand: 'Brand C',
            name: 'MacBook Pro M1',
            price: 20,
            currency: '$',
            quantity: 3,
            payment_status: 'Failed',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered',
          },
          {
            id: 4,
            date: new Date(),
            customer: 'Anna Lee',
            brand: 'Brand D',
            name: 'iPad Pro 2021',
            price: 40,
            currency: '$',
            quantity: 1,
            payment_status: 'Paid',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Shipped',
          },
          {
            id: 5,
            date: new Date(),
            customer: 'David Wright',
            brand: 'Brand E',
            name: 'AirPods Pro',
            price: 70,
            currency: '$',
            quantity: 4,
            payment_status: 'Failed',
            fulfillment_status: 'Pending',
            delivery_status: 'Not Shipped',
          },
          {
            id: 6,
            date: new Date(),
            customer: 'Linda Harris',
            brand: 'Brand F',
            name: 'OnePlus 9',
            price: 25,
            currency: '$',
            quantity: 2,
            payment_status: 'Paid',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered',
          },
          {
            id: 7,
            date: new Date(),
            customer: 'James Scott',
            brand: 'Brand G',
            name: 'Google Pixel 5',
            price: 60,
            currency: '$',
            quantity: 3,
            payment_status: 'Pending',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'In Progress',
          },
          {
            id: 8,
            date: new Date(),
            customer: 'Mary Adams',
            brand: 'Brand H',
            name: 'Sony WH-1000XM4',
            price: 100,
            currency: '$',
            quantity: 2,
            payment_status: 'Paid',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered',
          },
        ]),
        key: '1',
      },
      {
        label: 'Unfulfilled',
        children: renderTableContent([
          {
            id: 9,
            date: new Date(),
            customer: 'Linda Harris',
            brand: 'Brand F',
            name: 'OnePlus 9',
            price: 25,
            currency: '$',
            quantity: 2,
            payment_status: 'Paid',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered',
          },
          {
            id: 10,
            date: new Date(),
            customer: 'James Scott',
            brand: 'Brand G',
            name: 'Google Pixel 5',
            price: 60,
            currency: '$',
            quantity: 3,
            payment_status: 'Pending',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'In Progress',
          },
          {
            id: 11,
            date: new Date(),
            customer: 'Mary Adams',
            brand: 'Brand H',
            name: 'Sony WH-1000XM4',
            price: 100,
            currency: '$',
            quantity: 2,
            payment_status: 'Paid',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered',
          },
          {
            id: 12,
            date: new Date(),
            customer: 'Peter Griffin',
            brand: 'Brand I',
            name: 'Nintendo Switch OLED',
            price: 300,
            currency: '$',
            quantity: 5,
            payment_status: 'Paid',
            fulfillment_status: 'Open',
            delivery_status: 'Shipped',
          },
          {
            id: 13,
            date: new Date(),
            customer: 'Stewie Griffin',
            brand: 'Brand J',
            name: 'Apple Watch Series 6',
            price: 400,
            currency: '$',
            quantity: 1,
            payment_status: 'Paid',
            fulfillment_status: 'Archived',
            delivery_status: 'Delivered',
          },
          {
            id: 14,
            date: new Date(),
            customer: 'John Doe',
            brand: 'Brand A',
            name: 'iPhone 12 Pro Max',
            price: 50,
            currency: '$',
            quantity: 2,
            payment_status: 'Paid',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered',
          },
          {
            id: 15,
            date: new Date(),
            customer: 'Jane Smith',
            brand: 'Brand B',
            name: 'Samsung Galaxy S21',
            price: 30,
            currency: '$',
            quantity: 1,
            payment_status: 'Pending',
            fulfillment_status: 'Pending',
            delivery_status: 'In Progress',
          },
          {
            id: 16,
            date: new Date(),
            customer: 'George Brown',
            brand: 'Brand C',
            name: 'MacBook Pro M1',
            price: 20,
            currency: '$',
            quantity: 3,
            payment_status: 'Failed',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered',
          },
        ]),
        key: '2',
      },
      {
        label: 'UnPaid',
        children: renderTableContent([
          {
            id: 17,
            date: new Date(),
            customer: 'John Doe',
            brand: 'Brand A',
            name: 'iPhone 12 Pro Max',
            price: 50,
            currency: '$',
            quantity: 2,
            payment_status: 'Unpaid',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered',
          },
          {
            id: 18,
            date: new Date(),
            customer: 'Jane Smith',
            brand: 'Brand B',
            name: 'Samsung Galaxy S21',
            price: 30,
            currency: '$',
            quantity: 1,
            payment_status: 'Unpaid',
            fulfillment_status: 'Pending',
            delivery_status: 'In Progress',
          },
          {
            id: 19,
            date: new Date(),
            customer: 'George Brown',
            brand: 'Brand C',
            name: 'MacBook Pro M1',
            price: 20,
            currency: '$',
            quantity: 3,
            payment_status: 'Unpaid',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Shipped',
          },
          {
            id: 20,
            date: new Date(),
            customer: 'Anna Lee',
            brand: 'Brand D',
            name: 'iPad Pro 2021',
            price: 40,
            currency: '$',
            quantity: 1,
            payment_status: 'Unpaid',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Shipped',
          },
          {
            id: 21,
            date: new Date(),
            customer: 'David Wright',
            brand: 'Brand E',
            name: 'AirPods Pro',
            price: 70,
            currency: '$',
            quantity: 4,
            payment_status: 'Unpaid',
            fulfillment_status: 'Pending',
            delivery_status: 'Not Shipped',
          },
          {
            id: 22,
            date: new Date(),
            customer: 'Linda Harris',
            brand: 'Brand F',
            name: 'OnePlus 9',
            price: 25,
            currency: '$',
            quantity: 2,
            payment_status: 'Unpaid',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered',
          },
          {
            id: 23,
            date: new Date(),
            customer: 'James Scott',
            brand: 'Brand G',
            name: 'Google Pixel 5',
            price: 60,
            currency: '$',
            quantity: 3,
            payment_status: 'Unpaid',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'In Progress',
          },
          {
            id: 24,
            date: new Date(),
            customer: 'Mary Adams',
            brand: 'Brand H',
            name: 'Sony WH-1000XM4',
            price: 100,
            currency: '$',
            quantity: 2,
            payment_status: 'Unpaid',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Delivered',
          },
        ]),
        key: '3',
        closable: false,
      },
      {
        label: 'Open',
        children: renderTableContent([
          {
            id: 25,
            date: new Date(),
            customer: 'Peter Griffin',
            brand: 'Brand I',
            name: 'Nintendo Switch OLED',
            price: 300,
            currency: '$',
            quantity: 5,
            payment_status: 'Open',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Shipped',
          },
          {
            id: 26,
            date: new Date(),
            customer: 'Stewie Griffin',
            brand: 'Brand J',
            name: 'Apple Watch Series 6',
            price: 400,
            currency: '$',
            quantity: 1,
            payment_status: 'Open',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Shipped',
          },
          {
            id: 27,
            date: new Date(),
            customer: 'John Doe',
            brand: 'Brand A',
            name: 'iPhone 12 Pro Max',
            price: 50,
            currency: '$',
            quantity: 2,
            payment_status: 'Open',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Shipped',
          },
          {
            id: 28,
            date: new Date(),
            customer: 'Jane Smith',
            brand: 'Brand B',
            name: 'Samsung Galaxy S21',
            price: 30,
            currency: '$',
            quantity: 1,
            payment_status: 'Open',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Shipped',
          },
          {
            id: 29,
            date: new Date(),
            customer: 'George Brown',
            brand: 'Brand C',
            name: 'MacBook Pro M1',
            price: 20,
            currency: '$',
            quantity: 3,
            payment_status: 'Open',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Shipped',
          },
          {
            id: 30,
            date: new Date(),
            customer: 'Anna Lee',
            brand: 'Brand D',
            name: 'iPad Pro 2021',
            price: 40,
            currency: '$',
            quantity: 1,
            payment_status: 'Open',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Shipped',
          },
          {
            id: 31,
            date: new Date(),
            customer: 'David Wright',
            brand: 'Brand E',
            name: 'AirPods Pro',
            price: 70,
            currency: '$',
            quantity: 4,
            payment_status: 'Open',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Shipped',
          },
          {
            id: 32,
            date: new Date(),
            customer: 'Linda Harris',
            brand: 'Brand F',
            name: 'OnePlus 9',
            price: 25,
            currency: '$',
            quantity: 2,
            payment_status: 'Open',
            fulfillment_status: 'Fulfilled',
            delivery_status: 'Shipped',
          },
        ]),
        key: '4',
        closable: false,
      },
      {
        label: 'Archive',
        children: renderTableContent([
          {
            id: 33,
            date: new Date(),
            customer: 'Stewie Griffin',
            brand: 'Brand J',
            name: 'Apple Watch Series 6',
            price: 400,
            currency: '$',
            quantity: 1,
            payment_status: 'Paid',
            fulfillment_status: 'Archived',
            delivery_status: 'Delivered',
          },
          {
            id: 34,
            date: new Date(),
            customer: 'Peter Griffin',
            brand: 'Brand I',
            name: 'Nintendo Switch OLED',
            price: 300,
            currency: '$',
            quantity: 5,
            payment_status: 'Paid',
            fulfillment_status: 'Archived',
            delivery_status: 'Delivered',
          },
          {
            id: 35,
            date: new Date(),
            customer: 'John Doe',
            brand: 'Brand A',
            name: 'iPhone 12 Pro Max',
            price: 50,
            currency: '$',
            quantity: 2,
            payment_status: 'Paid',
            fulfillment_status: 'Archived',
            delivery_status: 'Delivered',
          },
          {
            id: 36,
            date: new Date(),
            customer: 'Jane Smith',
            brand: 'Brand B',
            name: 'Samsung Galaxy S21',
            price: 30,
            currency: '$',
            quantity: 1,
            payment_status: 'Paid',
            fulfillment_status: 'Archived',
            delivery_status: 'Delivered',
          },
          {
            id: 37,
            date: new Date(),
            customer: 'George Brown',
            brand: 'Brand C',
            name: 'MacBook Pro M1',
            price: 20,
            currency: '$',
            quantity: 3,
            payment_status: 'Paid',
            fulfillment_status: 'Archived',
            delivery_status: 'Delivered',
          },
          {
            id: 38,
            date: new Date(),
            customer: 'Anna Lee',
            brand: 'Brand D',
            name: 'iPad Pro 2021',
            price: 40,
            currency: '$',
            quantity: 1,
            payment_status: 'Paid',
            fulfillment_status: 'Archived',
            delivery_status: 'Delivered',
          },
          {
            id: 39,
            date: new Date(),
            customer: 'David Wright',
            brand: 'Brand E',
            name: 'AirPods Pro',
            price: 70,
            currency: '$',
            quantity: 4,
            payment_status: 'Paid',
            fulfillment_status: 'Archived',
            delivery_status: 'Delivered',
          },
          {
            id: 40,
            date: new Date(),
            customer: 'Linda Harris',
            brand: 'Brand F',
            name: 'OnePlus 9',
            price: 25,
            currency: '$',
            quantity: 2,
            payment_status: 'Paid',
            fulfillment_status: 'Archived',
            delivery_status: 'Delivered',
          },
        ]),
        key: '5',
        closable: false,
      },
    ];


  const options =[
    {icon:<Icon icon="catppuccin:pdf" width="25" height="25" onClick={() => genHtmlPdf({ contentid: "#orders-table", pdfname: 'Orders' })} />, label:'Pdf'},
    {icon:<Icon icon="vscode-icons:file-type-excel2"  width="25" height="25" onClick={() => exportToExcel({ json_data: currentitems, fileName: 'Orders' })} />, label:'Excel'}
  ]
  const suffix = (
    <div className="d-flex gap-2">
      {/* <Select options={options}/> */}
      <Button variant='outlined' text={isMobile?
          <Icon icon="catppuccin:pdf" width="25" height="25" />
          :
          'Export to Pdf'} onClick={() => genHtmlPdf({ contentid: "#orders-table", pdfname: 'Orders' })} />
      <Button 
        color={selecteditems?.length>0?'danger':'primary'} 
        text={
            selecteditems?.length>0?
              isMobile?
                <Icon icon="material-symbols-light:delete-outline-rounded" width="25" height="25" />
                :
                'Delete'
            :
              isMobile?
              <Icon icon="material-symbols-light:add-rounded" width="25" height="25" />
              :
              'Create'
          }
        onClick={(e)=>(selecteditems?.length > 0?handleDeleteItems(selecteditems):handleAddItem)}
        />
    </div>
  );

  const renderChild = ({ item }) => {
    if (isAdd) {
      return <AdminOrderItem API_URL={API_URL} Companyname={Companyname} add={isAdd} handleGoBack={handleOrder}/>;
    } else {
      if (item) {
        return <AdminOrderItem API_URL={API_URL} Companyname={Companyname} item={item}  handleGoBack={handleOrder}/>;
      } else {
        return (
          <Row gutter={[16, 16]}>
            <Col span={24} style={{ paddingLeft: "8px", paddingRight: "8px" }}>
              <Tabs
                initialItems={initialItems}
                tabBarExtraContent={
                  <div className="ms-2" style={{ display: "flex", justifyContent: "space-around", alignContent: "center", gap: "10px" }}>
                    <Icon icon="fluent:filter-20-regular" width="25" height="25" />
                    <Icon icon="ph:arrows-down-up-light" width="25" height="25" />
                  </div>
                }
              />
            </Col>
          </Row>
        );
      }
    }
    
  };
  useEffect(() => {
      if (id && !item) {
        const selectedItem = currentitems.find(item => item.id.toString() === id);
        if (selectedItem) {
          handleOrderItem(selectedItem);
        }
      }
    
      if (add) {
        handleAddItem();
      }
    }, [id, add, currentitems]);
  
  return (
    <AdminContent API_URL={API_URL} Companyname={Companyname} breadCrumbItems={breadCrumbItems} suffix={suffix}>
      {renderChild({ item })}
    </AdminContent>
  );
};

export default AdminOrders;
