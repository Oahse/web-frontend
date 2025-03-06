import React, { useEffect, useState } from "react";
import { Avatar, Col,Modal,Row, Tag} from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import Tabs from "../../../components/ui/Tabs/Tabs";
import Table from "../../../components/ui/Table/Table";
import AdminContent from "../AdminContent";
import { exportToExcel, genHtmlPdf, updateURL } from "../../../utils/helper";
import AdminDiscountItem from "../Discounts/DiscountItem";
import Button from "../../../components/ui/Button/Button";
import List from "../../../components/ui/List/List";
import Text from "../../../components/ui/Typography/Text";
import { useParams } from "react-router-dom";

const AdminDiscounts = ({ API_URL, Companyname, isMobile, isTablet, itemnumber,add=false }) => {
  const { id } = useParams(); // Get the `id` from the URL
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // State for selected row keys
  const [selecteditems, setSelectedItems] = useState([])
  const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: "Discounts" }]); // Breadcrumb state
  const [currentitems, setCurrentItems] = useState([
    {
      id: 1,
      date: new Date(),
      title: 'Discount 1',
      status: 'active',
      method: 'Online',
      type: 'Percentage',
      combinations: 'Combinations 1',
      used: true,
    },
    {
      id: 2,
      date: new Date(),
      title: 'Discount 2',
      status: 'expired',
      method: 'In-Store',
      type: 'Fixed Amount',
      combinations: 'Combinations 2',
      used: false,
    },
    {
      id: 3,
      date: new Date(),
      title: 'Discount 3',
      status: 'not started',
      method: 'Online',
      type: 'Percentage',
      combinations: 'Combinations 3',
      used: true,
    },
    {
      id: 4,
      date: new Date(),
      title: 'Discount 4',
      status: 'active',
      method: 'In-Store',
      type: 'Fixed Amount',
      combinations: 'Combinations 4',
      used: false,
    },
    {
      id: 5,
      date: new Date(),
      title: 'Discount 5',
      status: 'expired',
      method: 'Online',
      type: 'Percentage',
      combinations: 'Combinations 5',
      used: true,
    },
  ])
  const [isAdd, setAdd] = useState(add);
  const [item, setItem] = useState(id ? currentitems.find((item) => item.id.toString() === id) : null);
  
  // console.log(window.location,'location')
  const handleDiscount = () => {
    // console.log("=====ppp");
    const url = `${window.location.origin}/web-frontend/admin/discounts`;
    updateURL(url, {});
    
    setBreadCrumbItems([
      { title: 'Discounts' }
    ]);
    setItem(null);
    setAdd(false);
  };
  
  const handleDiscountItem = (record) => {
    // console.log(record,"=====");
    const url = `${window.location.origin}/web-frontend/admin/discounts/${record.id}`;
    updateURL(url, {});
    
    setBreadCrumbItems([
      { title: <a onClick={handleDiscount} style={{ cursor: 'pointer' }}>Discounts</a> },
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
        const url = `${window.location.origin}/web-frontend/admin/discounts/add`;
        updateURL(url, {});
        
        setBreadCrumbItems([
          { title: <a onClick={handleDiscount} style={{ cursor: 'pointer' }}>Discounts</a> },
          { title: 'Add'}
        ]);
        setAdd(true);
    }
  
  const handleDeleteItems = (items) => {
    Modal.confirm({
      title: 'Are you sure you want to delete these Discounts?',
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
        title: "Discount",
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
        title: "Title",
        dataIndex: "title",
        key: "title",
        render:(_,record) =>(<div className="d-flex justify-content-start align-items-start" style={{gap:'0.5rem'}}>
          <Avatar src={record?.picture || `https://picsum.photos/200/300?random=${record.id}`} shape='square' size={'small'} />
          <Text tag="p" fontWeight="fw-300">
              {record.title}
          </Text>
      </div>)
      },
      
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (_, record) => (
          <>
            {record.status === 'active'? 
              <Tag color="#198754">Active</Tag>
             : 
              record.status === 'expired'? 
                <Tag color="#DC3545">Expired</Tag>
              :
              <Tag color="#FBA70D">Not Started</Tag>
            }
          </>
        ),
      },
      
      {
        title: "Method",
        dataIndex: "method",
        key: "method",
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "Combinations",
        dataIndex: "combinations",
        key: "combinations",
      },
      {
        title: "Used",
        dataIndex: "used", // You can calculate total in the render function
        key: "used",
        render: (_, record) => `${record.used ? 'True':'False'}`,
      },
    ];
    
    return (
      <>
        {isMobile?
        <List id='discounts-table' 
              items={items} 
              onSelectedItems={handleSelectedItems} 
              onRowClick={handleDiscountItem} 
              suffix={
                  <Text tag="small" fontWeight="fw-300">
                      {item?.currency} {item?.price}
                  </Text>}
          />
        :
        <Table
          id='discounts-table'
          columns={columns}
          items={items}
          onSelectedRowKeys={(selectedRowKeys) => setSelectedRowKeys(selectedRowKeys)}
          onSelectedItems={handleSelectedItems}
          onRowClick={handleDiscountItem}
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
          title: 'Discount 1',
          status: 'active',
          method: 'Online',
          type: 'Percentage',
          combinations: 'Combinations 1',
          used: true,
        },
        {
          id: 2,
          date: new Date(),
          title: 'Discount 2',
          status: 'expired',
          method: 'In-Store',
          type: 'Fixed Amount',
          combinations: 'Combinations 2',
          used: false,
        },
        {
          id: 3,
          date: new Date(),
          title: 'Discount 3',
          status: 'not started',
          method: 'Online',
          type: 'Percentage',
          combinations: 'Combinations 3',
          used: true,
        },
        {
          id: 4,
          date: new Date(),
          title: 'Discount 4',
          status: 'active',
          method: 'In-Store',
          type: 'Fixed Amount',
          combinations: 'Combinations 4',
          used: false,
        },
        {
          id: 5,
          date: new Date(),
          title: 'Discount 5',
          status: 'expired',
          method: 'Online',
          type: 'Percentage',
          combinations: 'Combinations 5',
          used: true,
        },
        // Add more items as needed
      ]),
      key: '1',
    },
    {
      label: 'Unfulfilled',
      children: renderTableContent([
        {
          id: 6,
          date: new Date(),
          title: 'Discount 6',
          status: 'not started',
          method: 'In-Store',
          type: 'Fixed Amount',
          combinations: 'Combinations 6',
          used: false,
        },
        {
          id: 7,
          date: new Date(),
          title: 'Discount 7',
          status: 'expired',
          method: 'Online',
          type: 'Percentage',
          combinations: 'Combinations 7',
          used: true,
        },
        {
          id: 8,
          date: new Date(),
          title: 'Discount 8',
          status: 'active',
          method: 'In-Store',
          type: 'Fixed Amount',
          combinations: 'Combinations 8',
          used: true,
        },
        {
          id: 9,
          date: new Date(),
          title: 'Discount 9',
          status: 'active',
          method: 'Online',
          type: 'Percentage',
          combinations: 'Combinations 9',
          used: false,
        },
        {
          id: 10,
          date: new Date(),
          title: 'Discount 10',
          status: 'not started',
          method: 'In-Store',
          type: 'Fixed Amount',
          combinations: 'Combinations 10',
          used: true,
        },
        // Add more items as needed
      ]),
      key: '2',
    },
    {
      label: 'UnPaid',
      children: renderTableContent([
        {
          id: 11,
          date: new Date(),
          title: 'Discount 11',
          status: 'unpaid',
          method: 'Online',
          type: 'Percentage',
          combinations: 'Combinations 11',
          used: true,
        },
        {
          id: 12,
          date: new Date(),
          title: 'Discount 12',
          status: 'unpaid',
          method: 'In-Store',
          type: 'Fixed Amount',
          combinations: 'Combinations 12',
          used: false,
        },
        {
          id: 13,
          date: new Date(),
          title: 'Discount 13',
          status: 'unpaid',
          method: 'Online',
          type: 'Percentage',
          combinations: 'Combinations 13',
          used: false,
        },
        {
          id: 14,
          date: new Date(),
          title: 'Discount 14',
          status: 'unpaid',
          method: 'In-Store',
          type: 'Fixed Amount',
          combinations: 'Combinations 14',
          used: true,
        },
        {
          id: 15,
          date: new Date(),
          title: 'Discount 15',
          status: 'unpaid',
          method: 'Online',
          type: 'Percentage',
          combinations: 'Combinations 15',
          used: false,
        },
        // Add more items as needed
      ]),
      key: '3',
      closable: false,
    },
    {
      label: 'Open',
      children: renderTableContent([
        {
          id: 16,
          date: new Date(),
          title: 'Discount 16',
          status: 'open',
          method: 'Online',
          type: 'Fixed Amount',
          combinations: 'Combinations 16',
          used: true,
        },
        {
          id: 17,
          date: new Date(),
          title: 'Discount 17',
          status: 'open',
          method: 'In-Store',
          type: 'Percentage',
          combinations: 'Combinations 17',
          used: false,
        },
        {
          id: 18,
          date: new Date(),
          title: 'Discount 18',
          status: 'open',
          method: 'Online',
          type: 'Fixed Amount',
          combinations: 'Combinations 18',
          used: true,
        },
        {
          id: 19,
          date: new Date(),
          title: 'Discount 19',
          status: 'open',
          method: 'In-Store',
          type: 'Percentage',
          combinations: 'Combinations 19',
          used: false,
        },
        {
          id: 20,
          date: new Date(),
          title: 'Discount 20',
          status: 'open',
          method: 'Online',
          type: 'Fixed Amount',
          combinations: 'Combinations 20',
          used: true,
        },
        // Add more items as needed
      ]),
      key: '4',
      closable: false,
    },
    {
      label: 'Archive',
      children: renderTableContent([
        {
          id: 21,
          date: new Date(),
          title: 'Discount 21',
          status: 'archived',
          method: 'Online',
          type: 'Percentage',
          combinations: 'Combinations 21',
          used: true,
        },
        {
          id: 22,
          date: new Date(),
          title: 'Discount 22',
          status: 'archived',
          method: 'In-Store',
          type: 'Fixed Amount',
          combinations: 'Combinations 22',
          used: false,
        },
        {
          id: 23,
          date: new Date(),
          title: 'Discount 23',
          status: 'archived',
          method: 'Online',
          type: 'Percentage',
          combinations: 'Combinations 23',
          used: true,
        },
        {
          id: 24,
          date: new Date(),
          title: 'Discount 24',
          status: 'archived',
          method: 'In-Store',
          type: 'Fixed Amount',
          combinations: 'Combinations 24',
          used: false,
        },
        {
          id: 25,
          date: new Date(),
          title: 'Discount 25',
          status: 'archived',
          method: 'Online',
          type: 'Percentage',
          combinations: 'Combinations 25',
          used: true,
        },
        // Add more items as needed
      ]),
      key: '5',
      closable: false,
    },
  ];
  


  const options =[
    {icon:<Icon icon="catppuccin:pdf" width="25" height="25" onClick={() => genHtmlPdf({ contentid: "#discounts-table", pdfname: 'Discounts' })} />, label:'Pdf'},
    {icon:<Icon icon="vscode-icons:file-type-excel2"  width="25" height="25" onClick={() => exportToExcel({ json_data: currentitems, fileName: 'Discounts' })} />, label:'Excel'}
  ]
  const suffix = (
    <div className="d-flex gap-2">
      {/* <Select options={options}/> */}
      <Button variant='outlined' text={isMobile?
          <Icon icon="catppuccin:pdf" width="25" height="25" />
          :
          'Export to Pdf'} onClick={() => genHtmlPdf({ contentid: "#discounts-table", pdfname: 'Discounts' })} />
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
      return <AdminDiscountItem API_URL={API_URL} Companyname={Companyname} add={isAdd} handleGoBack={handleDiscount}/>;
    } else {
      if (item) {
        return <AdminDiscountItem API_URL={API_URL} Companyname={Companyname} item={item}  handleGoBack={handleDiscount}/>;
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
          handleDiscountItem(selectedItem);
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

export default AdminDiscounts;
