import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import AdminContent from "./AdminContent";

const AdminProducts = ({ API_URL, Companyname,isMobile }) => {
    let breadCrumbItems = [
        {title:'Products'}
      ]
    return (
        <AdminContent 
          API_URL ={API_URL}
          Companyname={Companyname}
          breadCrumbItems={breadCrumbItems}
          >
                <h3>Products Section</h3>
                <p>Here you can manage and view all products.</p>
            </AdminContent>
    );
};

export default AdminProducts;
