import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import AdminContent from "./AdminContent";

const AdminSettings = ({ API_URL, Companyname,isMobile }) => {
    let breadCrumbItems = [
        {title:'Settings'}
      ]
    return (
        <AdminContent 
          API_URL ={API_URL}
          Companyname={Companyname}
          breadCrumbItems={breadCrumbItems}
          >
                <h3>Settings Section</h3>
                <p>Here you can manage and view all Settings.</p>
            </AdminContent>
    );
};

export default AdminSettings;
