import { Icon } from "@iconify/react/dist/iconify.js";
import { Layout } from "antd";
import React from "react";
import AdminContent from "./AdminContent";


const AdminDiscount = ({ API_URL, Companyname,isMobile }) => {
    let breadCrumbItems = [
        {title:'Discount'}
      ]
    return (
        <AdminContent 
          API_URL ={API_URL}
          Companyname={Companyname}
          breadCrumbItems={breadCrumbItems}
          >
                <h3>Discount Section</h3>
                <p>Manage and set discounts for various products and services.</p>
            </AdminContent>
    );
};

export default AdminDiscount;
