import { Breadcrumb, Layout } from "antd";
import React from "react";

const { Content } = Layout;

const AdminDiscount = ({ isMobile }) => {
    return (
        <Content style={{ margin: '6px' }}>
            <Breadcrumb
                items={[
                    { title: <a href="/">Home</a> },
                    { title: 'Discount' },
                ]}
            />
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
