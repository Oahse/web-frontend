import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import AdminContent from "./AdminContent";

const AdminUsers = ({ API_URL, Companyname,isMobile }) => {
    let breadCrumbItems = [
        {title:'Users'}
      ]
    return (
        <AdminContent 
          API_URL ={API_URL}
          Companyname={Companyname}
          breadCrumbItems={breadCrumbItems}
          >
                <h3>Users Section</h3>
                <p>Here you can manage and view all Users.</p>
            </AdminContent>
    );
};

export default AdminUsers;
