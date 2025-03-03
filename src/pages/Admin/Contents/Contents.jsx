import React, { useEffect, useState } from "react";
import { Avatar, Col,Modal,Row} from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import Tabs from "../../../components/ui/Tabs/Tabs";
import Table from "../../../components/ui/Table/Table";
import AdminContent from "../AdminContent";
import { exportToExcel, genHtmlPdf, handleDownloadContent, updateURL } from "../../../utils/helper";
import Button from "../../../components/ui/Button/Button";
import List from "../../../components/ui/List/List";
import Text from "../../../components/ui/Typography/Text";
import { useParams } from "react-router-dom";

const AdminContents = ({ API_URL, Companyname, isMobile, isTablet, itemnumber}) => {
  const { id } = useParams(); // Get the `id` from the URL
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // State for selected row keys
  const [selecteditems, setSelectedItems] = useState([])
  const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: "Contents" }]); // Breadcrumb state
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
  const [item, setItem] = useState(id ? currentitems.find((item) => item.id.toString() === id) : null);
  
  
  

  const handleSelectedItems =(items)=>{
      // console.log(items,'|||')
      setSelectedItems(items)
  }
  
  
  const handleDeleteItems = (items) => {
    Modal.confirm({
      title: 'Are you sure you want to delete these contents?',
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
        title: "Content",
        dataIndex: "id",
        key: "id",
      },
      
      {
        title: "File Name",
        dataIndex: "file_name",
        key: "file_name",
        render:(_,record) =>(<div className="d-flex justify-content-start align-items-start" style={{gap:'0.5rem'}}>
          <Avatar src={record?.picture || `https://picsum.photos/200/300?random=${record.id}`} shape='square' size={'small'} />
          <Text tag="p" fontWeight="fw-300">
              {record.file_name}
          </Text>
      </div>)
      },
      
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Date Added",
        dataIndex: "date",
        key: "date",
        render: (date) => date.toLocaleDateString(), // Format date properly
      },
      
      {
        title: "Size",
        dataIndex: "size",
        key: "size"
      },
      {
        render:(_, record)=><Icon icon="material-symbols-light:download-rounded" width="24" height="24" style={{color:'#5d92b3'}} onClick={() => handleDownloadContent(record.file_name,record.picture)} />
      }
    ];
    
    return (
      <>
        {isMobile?
        <List id='contents-table' items={items} onSelectedItems={handleSelectedItems} />
        :
        <Table
          id='contents-table'
          columns={columns}
          items={items}
          onSelectedRowKeys={(selectedRowKeys) => setSelectedRowKeys(selectedRowKeys)}
          onSelectedItems={handleSelectedItems}
        />}
      </>
    );
  };

  // Now let's define initialItems with data for each tab
  const initialItems = [
    {
      label: 'All Files',
      children: renderTableContent([
        {
          id: 1,
          date: new Date('2025-03-03T10:00:00'),
          picture:`https://picsum.photos/200/300?random=${1}`,
          file_name: 'JohnDoe_567.png',
          type: 'Png',
          size: '20.00 MB',
        },
        {
          id: 2,
          date: new Date('2025-03-03T10:30:00'),
          picture:`https://picsum.photos/200/300?random=${2}`,
          file_name: 'JaneSmith_234.jpg',
          type: 'Jpg',
          size: '150.00 KB',
        },
        {
          id: 3,
          date: new Date('2025-03-03T11:00:00'),
          picture:`https://picsum.photos/200/300?random=${3}`,
          file_name: 'MichaelJohnson_876.pdf',
          type: 'Pdf',
          size: '2.00 MB',
        },
        {
          id: 4,
          date: new Date('2025-03-03T11:30:00'),
          picture:`https://picsum.photos/200/300?random=${4}`,
          file_name: 'SaraLee_345.docx',
          type: 'Docx',
          size: '1.50 MB',
        },
        {
          id: 5,
          date: new Date('2025-03-03T12:00:00'),
          picture:`https://picsum.photos/200/300?random=${5}`,
          file_name: 'TomHarris_987.xls',
          type: 'Xls',
          size: '500.00 KB',
        },
        {
          id: 6,
          date: new Date('2025-03-03T12:30:00'),
          picture:`https://picsum.photos/200/300?random=${6}`,
          file_name: 'EmilyWhite_432.txt',
          type: 'Txt',
          size: '5.00 MB',
        },
        {
          id: 7,
          date: new Date('2025-03-03T13:00:00'),
          picture:`https://picsum.photos/200/300?random=${7}`,
          file_name: 'ChrisBrown_123.pptx',
          type: 'Pptx',
          size: '50.00 MB',
        },
        {
          id: 8,
          date: new Date('2025-03-03T13:30:00'),
          picture:`https://picsum.photos/200/300?random=${8}`,
          file_name: 'AnnaGreen_654.csv',
          type: 'Csv',
          size: '200.00 KB',
        },
      ]),
      key: '1',
    },
    {
      label: 'Images',
      children: renderTableContent([
        {
          id: 9,
          date: new Date('2025-03-03T14:00:00'),
          picture:`https://picsum.photos/200/300?random=${9}`,
          file_name: 'JohnDoe_123.png',
          type: 'Png',
          size: '25.00 MB',
        },
        {
          id: 10,
          date: new Date('2025-03-03T14:30:00'),
          picture:`https://picsum.photos/200/300?random=${10}`,
          file_name: 'JaneSmith_456.jpg',
          type: 'Jpg',
          size: '1.20 MB',
        },
        {
          id: 11,
          date: new Date('2025-03-03T15:00:00'),
          picture:`https://picsum.photos/200/300?random=${11}`,
          file_name: 'MichaelJohnson_789.gif',
          type: 'Gif',
          size: '15.00 MB',
        },
        {
          id: 12,
          date: new Date('2025-03-03T15:30:00'),
          picture:`https://picsum.photos/200/300?random=${12}`,
          file_name: 'SaraLee_321.jpeg',
          type: 'Jpeg',
          size: '35.00 MB',
        },
      ]),
      key: '2',
    },
    {
      label: 'Documents',
      children: renderTableContent([
        {
          id: 13,
          date: new Date('2025-03-03T16:00:00'),
          picture:`https://picsum.photos/200/300?random=${13}`,
          file_name: 'TomHarris_876.pdf',
          type: 'Pdf',
          size: '10.00 MB',
        },
        {
          id: 14,
          date: new Date('2025-03-03T16:30:00'),
          picture:`https://picsum.photos/200/300?random=${14}`,
          file_name: 'EmilyWhite_543.docx',
          type: 'Docx',
          size: '1.80 MB',
        },
        {
          id: 15,
          date: new Date('2025-03-03T17:00:00'),
          picture:`https://picsum.photos/200/300?random=${15}`,
          file_name: 'ChrisBrown_234.xlsx',
          type: 'Xlsx',
          size: '2.50 MB',
        },
        {
          id: 16,
          date: new Date('2025-03-03T17:30:00'),
          picture:`https://picsum.photos/200/300?random=${16}`,
          file_name: 'AnnaGreen_987.pptx',
          type: 'Pptx',
          size: '15.00 MB',
        },
        {
          id: 17,
          date: new Date('2025-03-03T18:00:00'),
          picture:`https://picsum.photos/200/300?random=${17}`,
          file_name: 'JohnDoe_654.txt',
          type: 'Txt',
          size: '600.00 KB',
        },
      ]),
      key: '3',
    },
  ];
  

  const options =[
    {icon:<Icon icon="catppuccin:pdf" width="25" height="25" onClick={() => genHtmlPdf({ contentid: "#contents-table", pdfname: 'Contents' })} />, label:'Pdf'},
    {icon:<Icon icon="vscode-icons:file-type-excel2"  width="25" height="25" onClick={() => exportToExcel({ json_data: currentitems, fileName: 'Contents' })} />, label:'Excel'}
  ]
  const suffix = (
    <div className="d-flex gap-2">
      {/* <Select options={options}/> */}
      <Button variant='outlined' text={isMobile?
          <Icon icon="catppuccin:pdf" width="25" height="25" />
          :
          'Export to Pdf'} onClick={() => genHtmlPdf({ contentid: "#contents-table", pdfname: 'Contents' })} />
      {
        selecteditems?.length>0 && 
          <Button 
            color={selecteditems?.length>0?'danger':'primary'} 
            text={
              isMobile?
              <Icon icon="material-symbols-light:delete-outline-rounded" width="25" height="25" />
              :
              'Delete'
              }
            onClick={(e)=>(handleDeleteItems(selecteditems))}
          />
      }
      
    </div>
  );

  const renderChild = ({ item }) => {
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
    
  };
  
  
  return (
    <AdminContent API_URL={API_URL} Companyname={Companyname} breadCrumbItems={breadCrumbItems} suffix={suffix}>
      {renderChild({ item })}
    </AdminContent>
  );
};

export default AdminContents;
