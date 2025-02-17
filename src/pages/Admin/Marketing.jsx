import { Breadcrumb, Layout } from "antd";
import React from "react";

const { Content } = Layout;

const AdminMarketing = ({ isMobile }) => {
    return (
        <Content style={{ margin: '6px' }}>
            <Breadcrumb
                items={[
                    { title: <a href="/">Home</a> },
                    { title: 'Marketing' },
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
                <h3>Marketing Section</h3>
                <p>Manage your marketing strategies, campaigns, and promotions here.</p>
            </div>
        </Content>
    );
};

export default AdminMarketing;
