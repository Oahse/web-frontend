import { Breadcrumb, Layout } from "antd";
import React from "react";

const { Content } = Layout;

const AdminProducts = ({ isMobile }) => {
    return (
        <Content style={{ margin: '6px' }}>
            <Breadcrumb
                items={[
                    { title: <a href="/">Home</a> },
                    { title: 'Products' },
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
                <h3>Products Section</h3>
                <p>Here you can manage and view all products.</p>
            </div>
        </Content>
    );
};

export default AdminProducts;
