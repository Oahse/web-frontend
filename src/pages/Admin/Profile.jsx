import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import AdminContent from "./AdminContent";

const AdminProfile = ({ API_URL, Companyname,isMobile }) => {
    let breadCrumbItems = [
        {title:'Profile'}
      ]
    return (
        <AdminContent 
          API_URL ={API_URL}
          Companyname={Companyname}
          breadCrumbItems={breadCrumbItems}
          >
                <h3>Profile Section</h3>
                <p>Here you can manage and view all Profile.</p>
            </AdminContent>
    );
};

export default AdminProfile;
