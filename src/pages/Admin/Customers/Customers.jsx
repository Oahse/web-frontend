import React, { useEffect, useState } from "react";
import { Avatar, Col, Row, Tag, Modal } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import Table from "../../../components/ui/Table/Table";
import AdminContent from "../AdminContent";
import { exportToExcel, genHtmlPdf, updateURL } from "../../../utils/helper";
import Button from "../../../components/ui/Button/Button";
import List from "../../../components/ui/List/List";
import Text from "../../../components/ui/Typography/Text";
import SearchInput from "../../../components/ui/Input/SearchInput";
import AdminCustomerItem from "./CustomersItem";
import { useParams } from "react-router-dom";

const AdminCustomers = ({ API_URL, Companyname, isMobile, isTablet, itemnumber, add = false }) => {
  const { id } = useParams(); // Get the `id` from the URL
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // State for selected row keys
  const [selecteditems, setSelectedItems] = useState([]);
  const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: "Customers" }]); // Breadcrumb state
  const [isAdd, setAdd] = useState(add);
  const [currentitems, setCurrentItems] = useState([
    {
      id: 1,
      date: new Date(),
      customer: "John Doe",
      name: "iPhone 12 Pro Max",
      email_subscription: true,
      location: "San Francisco, CA",
      orders: 50,
      amount_spent: 100,
    },
    {
      id: 2,
      date: new Date(),
      customer: "Jane Smith",
      name: "Samsung Galaxy S21",
      email_subscription: false,
      location: "New York, NY",
      orders: 30,
      amount_spent: 80,
    },
    {
      id: 3,
      date: new Date(),
      customer: "Michael Johnson",
      name: "MacBook Pro 16\"",
      email_subscription: true,
      location: "Los Angeles, CA",
      orders: 25,
      amount_spent: 220,
    },
    // More items...
  ]);

  const [filteredItems, setFilteredItems] = useState(currentitems); // Filtered items based on search
  const [item, setItem] = useState(id ? currentitems.find((item) => item.id.toString() === id) : null);

  const handleCustomer = () => {
    const url = `${window.location.origin}/web-frontend/admin/customers`;
    updateURL(url, {});

    setBreadCrumbItems([
      { title: "Customers" }
    ]);
    setItem(null);
    setAdd(false);
  };

  const handleAddItem = (e) => {
    const url = `${window.location.origin}/web-frontend/admin/customers/add`;
    updateURL(url, {});

    setBreadCrumbItems([
      { title: <a onClick={handleCustomer} style={{ cursor: 'pointer' }}>Customers</a> },
      { title: 'Add' }
    ]);
    setAdd(true);
  };

  const handleDeleteItems = (items) => {
    Modal.confirm({
      title: 'Are you sure you want to delete these customers?',
      onOk: () => {
        const updatedItems = currentitems.filter((currentItem) => 
          !items.some(item => item.id === currentItem.id)
        );
        setCurrentItems(updatedItems);
        setFilteredItems(updatedItems); // Also update the filtered list
      },
    });
  };

  const handleCustomerItem = (record) => {
    const url = `${window.location.origin}/web-frontend/admin/customers/${record.id}`;
    updateURL(url, {});

    setBreadCrumbItems([
      { title: <a onClick={handleCustomer} style={{ cursor: 'pointer' }}>Customers</a> },
      { title: record.id }
    ]);

    setItem(record);
    setAdd(false);
  };

  const handleSelectedItems = (items) => {
    setSelectedItems(items);
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
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (_, record) => (
          <div className="d-flex justify-content-start align-items-start" style={{ gap: "0.5rem" }}>
            <Avatar
              src={record?.picture || `https://picsum.photos/200/300?random=${record.id}`}
              shape="square"
              size={"small"}
            />
            <Text tag="p" fontWeight="fw-300">
              {record.name}
            </Text>
          </div>
        ),
      },
      {
        title: "Email Subscription",
        dataIndex: "email_subscription",
        key: "email_subscription",
        render: (_, record) => (
          <>
            {record.email_subscription === false ? (
              <Tag color="#FBA70D">Pending</Tag>
            ) : (
              <Tag color="#198754">Subscribed</Tag>
            )}
          </>
        ),
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
      },
      {
        title: "Total Orders",
        dataIndex: "orders",
        key: "orders",
      },
      {
        title: "Amount Spent",
        dataIndex: "amount_spent", // You can calculate total in the render function
        key: "amount_spent",
        render: (_, record) => `$${record.amount_spent.toFixed(2)}`,
      },
    ];

    return (
      <>
        {isMobile ? (
          <List
            id="orders-table"
            items={items}
            onSelectedItems={handleSelectedItems}
            onRowClick={handleCustomerItem}
            suffix={<Text tag="small" fontWeight="fw-300">
                      {item?.currency} {item?.price}
                    </Text>}
          />
        ) : (
          <Table
            id="customers-table"
            columns={columns}
            items={items}
            onSelectedRowKeys={(selectedRowKeys) => setSelectedRowKeys(selectedRowKeys)}
            onSelectedItems={handleSelectedItems}
            onRowClick={handleCustomerItem}
          />
        )}
      </>
    );
  };

  const options = [
    {
      icon: (
        <Icon
          icon="catppuccin:pdf"
          width="25"
          height="25"
          onClick={() => genHtmlPdf({ contentid: "#orders-table", pdfname: "Orders" })}
        />
      ),
      label: "Pdf",
    },
    {
      icon: (
        <Icon
          icon="vscode-icons:file-type-excel2"
          width="25"
          height="25"
          onClick={() => exportToExcel({ json_data: currentitems, fileName: "Orders" })}
        />
      ),
      label: "Excel",
    },
  ];

  const suffix = (
    <div className="d-flex gap-2">
      <Button
        variant="outlined"
        text={isMobile ? (
          <Icon icon="catppuccin:pdf" width="25" height="25" />
        ) : (
          "Export to Pdf"
        )}
        onClick={() => genHtmlPdf({ contentid: "#customers-table", pdfname: "Customers" })}
      />
      <Button
        color={selecteditems?.length > 0 ? "danger" : "primary"}
        text={
          selecteditems?.length > 0
            ? isMobile
              ? <Icon icon="material-symbols-light:delete-outline-rounded" width="25" height="25" />
              : "Delete"
            : isMobile
            ? <Icon icon="material-symbols-light:add-rounded" width="25" height="25" />
            : "Add"
        }
        onClick={(e) => (selecteditems?.length > 0 ? handleDeleteItems(selecteditems) : handleAddItem())}
      />
    </div>
  );

  const handleSearch = (searchTerm) => {
    // Filter current items based on search term
    const filtered = currentitems.filter((item) => item.customer.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredItems(filtered);
  };

  const content = renderTableContent(filteredItems);

  const renderChild = ({ item }) => {
    if (isAdd) {
      return <AdminCustomerItem API_URL={API_URL} Companyname={Companyname} add={isAdd} handleGoBack={handleCustomer} />;
    } else {
      if (item) {
        return <AdminCustomerItem API_URL={API_URL} Companyname={Companyname} item={item} handleGoBack={handleCustomer} />;
      } else {
        return (
          <Row gutter={[16, 0]}>
            <Col span={24} style={{ paddingLeft: "8px", paddingRight: "8px" }}>
              <div
                className="custom-tabs"
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
              >
                <div className="p-2" style={{ width: "100%", marginBottom: "-16px" }}>
                  <SearchInput
                    placeholder="Search Customers"
                    onSearch={handleSearch}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="p-2" style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                  <Icon icon="fluent:filter-20-regular" width="25" height="25" />
                  <Icon icon="ph:arrows-down-up-light" width="25" height="25" />
                </div>
              </div>
            </Col>
            <Col span={24} style={{ paddingLeft: "8px", paddingRight: "8px" }}>
              {content}
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
        handleCustomerItem(selectedItem);
      }
    }
    if (item) {
      handleCustomerItem(item);
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

export default AdminCustomers;
