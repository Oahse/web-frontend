import { Icon } from "@iconify/react/dist/iconify.js";
import { Breadcrumb, Layout } from "antd";
import React from "react";
import AdminContent from "./AdminContent";

const { Content } = Layout;

const AdminAnalytics = ({ API_URL, Companyname, isMobile }) => {
    let breadCrumbItems = [
        {title:'Analytics'}
      ]
    return (
        <AdminContent 
          API_URL ={API_URL}
          Companyname={Companyname}
          breadCrumbItems={breadCrumbItems}
          >
            <h3>Analytics Section</h3>
            <p>Here you can analyze the system data and statistics.</p>
        </AdminContent>
        
    );
};

export default AdminAnalytics;
