import { Breadcrumb, Layout } from "antd";
import React from "react";

const { Content } = Layout;

const AdminAnalytics = ({ isMobile }) => {
    return (
        <Content style={{ margin: '6px' }}>
            <Breadcrumb
                items={[
                    { title: <a href="/">Home</a> },
                    { title: 'Analytics' },
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
                <h3>Analytics Section</h3>
                <p>Here you can analyze the system data and statistics.</p>
            </div>
        </Content>
    );
};

export default AdminAnalytics;
