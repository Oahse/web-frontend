import { Icon } from "@iconify/react/dist/iconify.js";

import React from "react";
import AdminContent from "./AdminContent";


const AdminFinance = ({ API_URL, Companyname,isMobile }) => {
    let breadCrumbItems = [
        {title:'Finance'}
      ]
    return (
        <AdminContent 
          API_URL ={API_URL}
          Companyname={Companyname}
          breadCrumbItems={breadCrumbItems}
          >
                <h3>Finance Section</h3>
                <p>Here you can manage and view finance-related data.</p>
            </AdminContent>
    );
};

export default AdminFinance;
