import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import AdminContent from "./AdminContent";

const AdminNotifications = ({ API_URL, Companyname,isMobile }) => {
    let breadCrumbItems = [
        {title:'Notifications'}
      ]
    return (
        <AdminContent 
            API_URL ={API_URL}
            Companyname={Companyname}
            breadCrumbItems={breadCrumbItems}
            >
            <h3>Notifications Section</h3>
            <p>Here you can manage and view all Notifications.</p>
        </AdminContent>
    );
};

export default AdminNotifications;
