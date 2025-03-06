import React, { useEffect, useState } from "react";
import { Avatar, Col, Row } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import Table from "../../../components/ui/Table/Table";
import AdminContent from "../AdminContent";
import { exportToExcel, genHtmlPdf, updateURL } from "../../../utils/helper";
import List from "../../../components/ui/List/List";
import Text from "../../../components/ui/Typography/Text";
import AdminFinanceItem from "./FinanceItem";
import { useParams } from "react-router-dom";
import Select from "../../../components/ui/Input/Select/Select";

const AdminFinance = ({ API_URL, Companyname, isMobile, isTablet, itemnumber }) => {
  const { id } = useParams(); // Get the `id` from the URL
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // State for selected row keys
  const [selecteditems, setSelectedItems] = useState([]);
  const [breadCrumbItems, setBreadCrumbItems] = useState([{ title: "Finance" }]); // Breadcrumb state
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
  const [item, setItem] = useState(id ? currentitems.find((item) => item.id.toString() === id) : null);

  // Handle clicking on "Finance" breadcrumb
  const handleFinance = () => {
    const url = `${window.location.origin}/web-frontend/admin/finance`;
    updateURL(url, {});
    setBreadCrumbItems([{ title: "Finance" }]);
    setItem(null);
  };

  // Handle clicking on specific finance item
  const handleFinanceItem = (record) => {
    const url = `${window.location.origin}/web-frontend/admin/finance/${record.id}`;
    updateURL(url, {});
    setBreadCrumbItems([
      { title: <a onClick={handleFinance} style={{ cursor: 'pointer' }}>Finance</a> },
      { title: record.id },
    ]);
    setItem(record);
  };

  // Handle the selected items
  const handleSelectedItems = (items) => {
    setSelectedItems(items);
  };

  // Render table content based on whether the screen is mobile
  const renderTableContent = (items) => {
    const columns = [
      {
        title: "Id",
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
        title: "Sender",
        dataIndex: "sender",
        key: "sender",
        render: (_, record) => (
          <div className="d-flex justify-content-start align-items-start" style={{ gap: "0.5rem" }}>
            <Avatar
              src={record?.picture || `https://picsum.photos/200/300?random=${record.id}`}
              shape="square"
              size={"small"}
            />
            <Text tag="p" fontWeight="fw-300">
              {record.sender}
            </Text>
          </div>
        ),
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Account",
        dataIndex: "account",
        key: "account",
      },
      {
        title: "Amount",
        dataIndex: "amount", // You can calculate total in the render function
        key: "amount",
        render: (_, record) => `$${record.amount.toFixed(2)}`,
      },
    ];

    return (
      <>
        {isMobile ? (
          <List 
            id="finance-table" 
            items={items} 
            onSelectedItems={handleSelectedItems} 
            onRowClick={handleFinanceItem}
            suffix={<Text tag="small" fontWeight="fw-300">{item?.amount}</Text>}
          />
        ) : (
          <Table
            id='finance-table'
            columns={columns}
            items={items}
            onSelectedRowKeys={(selectedRowKeys) => setSelectedRowKeys(selectedRowKeys)}
            onSelectedItems={handleSelectedItems}
            onRowClick={handleFinanceItem}
          />
        )}
      </>
    );
  };

  const dateFilters = [
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 3 Days', value: 'last_3_days' },
    { label: 'Last 7 Days', value: 'last_7_days' },
    { label: 'Last 14 Days', value: 'last_14_days' },
    { label: 'Last 28 Days', value: 'last_28_days' },
    { label: 'Last 30 Days', value: 'last_30_days' },
    { label: 'Last 1 Month', value: 'last_1_month' },
    { label: 'Last 3 Months', value: 'last_3_months' },
    { label: 'Last 6 Months', value: 'last_6_months' },
    { label: 'Last 9 Months', value: 'last_9_months' },
    { label: 'Last Year', value: 'last_year' }
  ];

  const suffix = (
    <div className="d-flex gap-2">
      <Select
        options={dateFilters.map(date => ({
          label: date.label,   
          code: date.value
        }))}
        placeholder='Filter by'
        optionFilterProp="label" 
      />
    </div>
  );

  const data = [
    { id: 1, date: new Date('2025-03-01'), description: "Purchase of office supplies", account: "Office Expense", amount: 150.75 },
    { id: 2, date: new Date('2025-03-02'), description: "Payment for services rendered", account: "Service Revenue", amount: 300.00 },
    { id: 3, date: new Date('2025-03-03'), description: "Employee salary", account: "Salaries and Wages", amount: 5000.00 },
    { id: 4, date: new Date('2025-03-04'), description: "Utility bill payment", account: "Utility Expenses", amount: 120.50 },
    { id: 5, date: new Date('2025-03-05'), description: "Purchase of software subscription", account: "Software Expense", amount: 250.00 },
    { id: 6, date: new Date('2025-03-06'), description: "Office rent payment", account: "Rent Expense", amount: 1500.00 },
    { id: 7, date: new Date('2025-03-07'), description: "Travel expenses", account: "Travel Expense", amount: 450.00 },
  ];

  // Render child component based on item
  const renderChild = ({ item }) => {
    if (item) {
      return <AdminFinanceItem API_URL={API_URL} Companyname={Companyname} item={item} handleGoBack={handleFinance} />;
    } else {
      return (
        <Row gutter={[16, 16]} style={{ padding: '8px' }}>
          <Col xxl={16} xl={16} lg={16} md={16} sm={24} xs={24}>
            <Row gutter={[16, 16]}>
              <Col span={24} className="col-item">
                <Row gutter={[16, 16]} style={{ padding: '8px' }}>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <div className="container-fluid d-flex justify-content-space-between align-items-center gap-3">
                      <Text tag="p" fontWeight="fw-400">
                        Total Sales
                      </Text>
                      <Text tag="p" fontWeight="fw-600 fs-5">
                        CA $16 _
                      </Text>
                    </div>
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                    <div className="container-fluid d-flex justify-content-space-between align-items-center gap-3">
                      <Text tag="p" fontWeight="fw-400">
                        Payouts
                      </Text>
                      <Text tag="p" fontWeight="fw-600 fs-5">
                        CA $14.95
                      </Text>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col span={24} className="col-item">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Text tag="p" fontWeight="fw-600">
                      Recent Transactions
                    </Text>
                  </Col>
                  <Col span={24}>{renderTableContent(data)}</Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Row gutter={[16, 16]} style={{ paddingLeft: '4px', paddingRight: '4px' }}>
              <Col span={24} className="col-item border-1 ms-auto border">
                <div className="d-flex flex-column justify-content-start align-items-start">
                  <Text tag="p" fontWeight="fw-600">
                    Taxes
                  </Text>
                  <Text fontColor="text-link" fontSize="fs-md" fontWeight="fw-400" className="mt-3 mb-1 text-break border-1 border rounded-sm p-2 w-100">
                    No tag given
                  </Text>
                </div>
              </Col>
              <Col span={24} className="col-item border-1 ms-auto border">
                <div className="d-flex flex-column justify-content-start align-items-start">
                  <Text tag="p" fontWeight="fw-600">
                    Amount
                  </Text>
                  <Text fontColor="text-link" fontSize="fs-md" fontWeight="fw-600" className="mt-3 mb-1 text-break border-1 border rounded-sm p-2 w-100">
                    <span className="d-flex justify-content-space-between align-items-center">
                      <Icon icon="material-symbols-light:download-rounded" width="25" height="25" /> Payouts
                    </span>
                    <Text tag="p" fontWeight="fw-600" fontColor="text-success" fontSize="fs-lg">
                      - $12.35
                    </Text>
                  </Text>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      );
    }
  };

  useEffect(() => {
    if (id && !item) {
      const selectedItem = currentitems.find((item) => item.id.toString() === id);
      if (selectedItem) {
        handleFinanceItem(selectedItem);
      }
    }
  }, [id, currentitems]);

  return (
    <AdminContent API_URL={API_URL} Companyname={Companyname} breadCrumbItems={breadCrumbItems} suffix={suffix}>
      {renderChild({ item })}
    </AdminContent>
  );
};

export default AdminFinance;
