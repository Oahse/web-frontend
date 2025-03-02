import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import AdminContent from "./AdminContent";

const AdminMessages = ({ API_URL, Companyname,isMobile }) => {
    let breadCrumbItems = [
        {title:'Messages'}
      ]
    return (
        <AdminContent 
            API_URL ={API_URL}
            Companyname={Companyname}
            breadCrumbItems={breadCrumbItems}
            >
            <h3>Messages Section</h3>
            <p>Here you can manage and view all Messages.</p>
        </AdminContent>
    );
};

export default AdminMessages;
