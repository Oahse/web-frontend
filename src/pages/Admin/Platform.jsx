import { Breadcrumb, Layout } from "antd";
import React from "react";

const { Content } = Layout;

const AdminPlatform = ({ isMobile }) => {
    return (
        <Content style={{ margin: '6px' }}>
            <Breadcrumb
                items={[
                    { title: <a href="/">Home</a> },
                    { title: 'Platform' },
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
                <h3>Platform Section</h3>
                <p>Manage your platform settings and configuration here.</p>
            </div>
        </Content>
    );
};

export default AdminPlatform;
