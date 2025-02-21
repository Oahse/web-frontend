import { Icon } from "@iconify/react/dist/iconify.js";
import { Breadcrumb, Layout } from "antd";
import React from "react";

const { Content } = Layout;

const AdminDiscount = ({ isMobile }) => {
    return (
        <Content style={{ margin: '6px' }}>
            <div className="d-flex justify-content-between align-items-center p-2">
                <Breadcrumb
                    items={[
                        {
                            title: <a href="/">Home</a>,
                        },
                        {
                            title: 'Discount',
                        },
                    ]}
                />
                <span className="bg-white p-2" style={{borderRadius: '8px', cursor:'pointer'}}>
                    <Icon icon="uit:calender" width="20" height="20" /> <span className="m-auto">Last 30 days</span>
                </span>
            </div>
            <div
                style={{
                    padding: '6px 18px',
                    margin: '8px',
                    minHeight: '100vh',
                    backgroundColor: 'white',
                }}
            >
                <h3>Discount Section</h3>
                <p>Manage and set discounts for various products and services.</p>
            </div>
        </Content>
    );
};

export default AdminDiscount;
