import React, { useEffect, useState } from "react";
import { Avatar, Col,Modal,Row, Tag} from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import Tabs from "../../../components/ui/Tabs/Tabs";
import Table from "../../../components/ui/Table/Table";
import AdminContent from "../AdminContent";
import { exportToExcel, genHtmlPdf, updateURL } from "../../../utils/helper";
import AdminProductItem from "./ProductItem";
import Button from "../../../components/ui/Button/Button";
import List from "../../../components/ui/List/List";
import Text from "../../../components/ui/Typography/Text";
import { useParams } from "react-router-dom";

const AdminProducts = ({ API_URL, Companyname, isMobile, isTablet, itemnumber,add=false }) => {
  const { id } = useParams(); // Get the `id` from the URL
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // State for selected row keys
  const [selectedItems, setSelectedItems] = useState([])
  const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: <span className="text-light">Products</span> }]); // Breadcrumb state
  const [currentitems, setCurrentItems] = useState([
    {
      id: 1,
      name: 'Product 1',
      picture: 'https://example.com/product1.jpg',
      inventory: 50,
      status: 'live',
      markets: 2,
      sales_channels: 3,
      type: 'Electronics',
      vendor: 'Vendor A'
    },
    {
      id: 2,
      name: 'Product 2',
      picture: 'https://example.com/product2.jpg',
      inventory: 30,
      status: 'dead',
      markets: 1,
      sales_channels: 1,
      type: 'Clothing',
      vendor: 'Vendor B'
    },
    {
      id: 3,
      name: 'Product 3',
      picture: 'https://example.com/product3.jpg',
      inventory: 100,
      status: 'live',
      markets: 3,
      sales_channels: 2,
      type: 'Food',
      vendor: 'Vendor C'
    },
    {
      id: 4,
      name: 'Product 4',
      picture: 'https://example.com/product4.jpg',
      inventory: 80,
      status: 'live',
      markets: 4,
      sales_channels: 5,
      type: 'Furniture',
      vendor: 'Vendor D'
    },
    {
      id: 5,
      name: 'Product 5',
      picture: 'https://example.com/product5.jpg',
      inventory: 120,
      status: 'dead',
      markets: 2,
      sales_channels: 4,
      type: 'Toys',
      vendor: 'Vendor E'
    },
    {
      id: 6,
      name: 'Product 6',
      picture: 'https://example.com/product6.jpg',
      inventory: 60,
      status: 'live',
      markets: 3,
      sales_channels: 2,
      type: 'Books',
      vendor: 'Vendor F'
    },
    {
      id: 7,
      name: 'Product 7',
      picture: 'https://example.com/product7.jpg',
      inventory: 90,
      status: 'dead',
      markets: 5,
      sales_channels: 3,
      type: 'Electronics',
      vendor: 'Vendor G'
    },
    {
      id: 8,
      name: 'Product 8',
      picture: 'https://example.com/product8.jpg',
      inventory: 200,
      status: 'live',
      markets: 6,
      sales_channels: 7,
      type: 'Clothing',
      vendor: 'Vendor H'
    },
    {
      id: 9,
      name: 'Product 9',
      picture: 'https://example.com/product9.jpg',
      inventory: 150,
      status: 'live',
      markets: 2,
      sales_channels: 4,
      type: 'Food',
      vendor: 'Vendor I'
    },
    {
      id: 10,
      name: 'Product 10',
      picture: 'https://example.com/product10.jpg',
      inventory: 110,
      status: 'dead',
      markets: 3,
      sales_channels: 5,
      type: 'Furniture',
      vendor: 'Vendor J'
    },
    {
      id: 11,
      name: 'Product 11',
      picture: 'https://example.com/product11.jpg',
      inventory: 60,
      status: 'live',
      markets: 1,
      sales_channels: 2,
      type: 'Toys',
      vendor: 'Vendor K'
    },
    {
      id: 12,
      name: 'Product 12',
      picture: 'https://example.com/product12.jpg',
      inventory: 40,
      status: 'live',
      markets: 4,
      sales_channels: 3,
      type: 'Books',
      vendor: 'Vendor L'
    },
    {
      id: 13,
      name: 'Product 13',
      picture: 'https://example.com/product13.jpg',
      inventory: 75,
      status: 'dead',
      markets: 2,
      sales_channels: 1,
      type: 'Electronics',
      vendor: 'Vendor M'
    }
  ])
  const [isAdd, setAdd] = useState(add);
  const [item, setItem] = useState(id ? currentitems.find((item) => item.id.toString() === id) : null);
  
  // console.log(window.location,'location')
  const handleProduct = () => {
    // console.log("=====ppp");
    const url = `${window.location.origin}/web-frontend/admin/products`;
    updateURL(url, {});
    
    setBreadCrumbItems([
      { title: 'Products' }
    ]);
    setItem(null);
    setAdd(false);
  };
  
  const handleProductItem = (record) => {
    // console.log(record,"=====");
    const url = `${window.location.origin}/web-frontend/admin/products/${record.id}`;
    updateURL(url, {});
    
    setBreadCrumbItems([
      { title: <a onClick={handleProduct} style={{ cursor: 'pointer' }}>Products</a> },
      { title: <span className="text-light">{record.id}</span> }
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
            const url = `${window.location.origin}/web-frontend/admin/products/add`;
            updateURL(url, {});
            
            setBreadCrumbItems([
            { title: <a onClick={handleProduct} style={{ cursor: 'pointer' }}>Products</a> },
            { title: <span className="text-light">Add</span>}
            ]);
            setAdd(true);
        }
    
    const handleDeleteItems = (items) => {
        Modal.confirm({
        title: 'Are you sure you want to delete these products?',
        onOk: () => {
            const updatedItems = currentitems.filter((currentItem) => 
            !items.some(item => item.id === currentItem.id)
            );
            setCurrentItems(updatedItems);
        },
        });
    };
    const columns = [
        {
          title: 'Product', // Column title for the product name
          dataIndex: 'name', // Key in the data that corresponds to product name
          key: 'name',
          render:(_,record) =>(<div className="d-flex justify-content-start align-items-start" style={{gap:'0.5rem'}}>
                <Avatar src={`https://picsum.photos/200/300?random=${record.id}`} shape='square' size={'small'} />
                <Text tag="p" fontWeight="fw-300">
                    {record.name}
                </Text>
            </div>)
        },
        {
          title: 'Inventory', // Column title for inventory count
          dataIndex: 'inventory', // Key in the data that corresponds to inventory count
          key: 'inventory',
        },
        {
          title: 'Status', // Column title for product status
          dataIndex: 'status', // Key in the data that corresponds to status (e.g., 'live' or 'dead')
          key: 'status',
          render:(_,record) =>(record.status === 'live'?
                <Tag color='#198754'>
                    {record.status}
                </Tag>:
                <Tag color='#DC3545'>
                    {record.status}
                </Tag>)
        },
        {
          title: 'Markets', // Column title for number of markets
          dataIndex: 'markets', // Key in the data that corresponds to the markets count
          key: 'markets',
        },
        {
          title: 'Sales Channels', // Column title for sales channels
          dataIndex: 'sales_channels', // Key in the data that corresponds to sales channels count
          key: 'sales_channels',
        },
        {
          title: 'Type', // Column title for product type
          dataIndex: 'type', // Key in the data that corresponds to product type (e.g., Electronics)
          key: 'type',
        },
        {
          title: 'Vendor', // Column title for vendor name
          dataIndex: 'vendor', // Key in the data that corresponds to vendor
          key: 'vendor',
        },
      ];
    const renderTableContent = (products) => {

    const items = products.map(product => ({
        id: product.id,
        name: product.name,
        picture: product.picture,
        inventory: product.inventory,
        status: product.status,
        markets: product.markets,
        sales_channels: product.sales_channels,
        type: product.type,
        vendor: product.vendor
        }));
    
    return (
        <>
            {isMobile?
            <List id='products-table' 
                items={items} 
                onSelectedItems={handleSelectedItems} 
                onRowClick={handleProductItem} 
                suffix={
                    <Text tag="small" fontWeight="fw-300">
                        {item?.currency} {item?.price}
                    </Text>}
            />
            :
            <Table
            id='products-table'
            columns={columns}
            items={items}
            onSelectedRowKeys={(selectedRowKeys) => setSelectedRowKeys(selectedRowKeys)}
            onSelectedItems={handleSelectedItems}
            onRowClick={handleProductItem}
            />}
        </>
        );
    };

    // Now let's define initialItems with data for each tab
    
    // Initial items based on categories (with dynamically filtered content)
    const initialItems = [
        {
            label: 'All',
            children: renderTableContent(currentitems),
            key: '1',
        },
        {
            label: 'Electronics',
            children: renderTableContent(currentitems.filter(product => product.type === 'Electronics')),
            key: '2',
        },
        {
            label: 'Clothing',
            children: renderTableContent(currentitems.filter(product => product.type === 'Clothing')),
            key: '3',
        },
        {
            label: 'Food',
            children: renderTableContent(currentitems.filter(product => product.type === 'Food')),
            key: '4',
        },
        {
            label: 'Furniture',
            children: renderTableContent(currentitems.filter(product => product.type === 'Furniture')),
            key: '5',
        },
        {
            label: 'Toys',
            children: renderTableContent(currentitems.filter(product => product.type === 'Toys')),
            key: '6',
        },
        {
            label: 'Books',
            children: renderTableContent(currentitems.filter(product => product.type === 'Books')),
            key: '7',
        },
    ];
  


    const options =[
        {icon:<Icon icon="catppuccin:pdf" width="25" height="25" onClick={() => genHtmlPdf({ contentid: "#products-table", pdfname: 'Products' })} />, label:'Pdf'},
        {icon:<Icon icon="vscode-icons:file-type-excel2"  width="25" height="25" onClick={() => exportToExcel({ json_data: currentitems, fileName: 'Products' })} />, label:'Excel'}
    ]
    const suffix = (
        <div className="d-flex gap-2">
        {/* <Select options={options}/> */}
        <Button variant='outlined' text={isMobile?
            <Icon icon="catppuccin:pdf" width="25" height="25" />
            :
            'Export to Pdf'} onClick={() => genHtmlPdf({ contentid: "#products-table", pdfname: 'Products' })} />
        
            <Button
                    color={selectedItems?.length > 0 ? 'danger' : 'primary'}
                    text={selectedItems?.length > 0 ? isMobile ? <Icon icon="material-symbols-light:delete-outline-rounded" width="25" height="25" /> : 'Delete' : isMobile ? <Icon icon="material-symbols-light:add-rounded" width="25" height="25" /> : 'Add'}
                    onClick={() => (selectedItems?.length > 0 ? handleDeleteItems(selectedItems) : handleAddItem())} />
        </div>
    );

    const renderChild = ({ item }) => {
        if (isAdd) {
        return <AdminProductItem API_URL={API_URL} Companyname={Companyname} add={isAdd} handleGoBack={handleProduct}/>;
        } else {
        if (item) {
            return <AdminProductItem API_URL={API_URL} Companyname={Companyname} item={item}  handleGoBack={handleProduct}/>;
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
            handleProductItem(selectedItem);
            }
        }
        // if (item) {
        //   handleProductItem(item);
        // }
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

export default AdminProducts;
