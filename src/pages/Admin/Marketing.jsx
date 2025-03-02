import { Icon } from "@iconify/react/dist/iconify.js";
import { Breadcrumb, Layout } from "antd";
import React from "react";
import AdminContent from "./AdminContent";

const { Content } = Layout;

const AdminMarketing = ({ API_URL, Companyname,isMobile }) => {
    let breadCrumbItems = [
        {title:'Marketing'}
      ]
    return (
        <AdminContent 
          API_URL ={API_URL}
          Companyname={Companyname}
          breadCrumbItems={breadCrumbItems}
          >
                <h3>Marketing Section</h3>
                <p>Manage your marketing strategies, campaigns, and promotions here.</p>
            </AdminContent>
    );
};

export default AdminMarketing;
