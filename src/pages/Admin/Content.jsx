
import React from "react";
import AdminContent from "./AdminContent";

const AdminContents = ({ API_URL, Companyname, isMobile }) => {
    let breadCrumbItems = [
        {title:'Contents'}
      ]
    return (
        <AdminContent 
          API_URL ={API_URL}
          Companyname={Companyname}
          breadCrumbItems={breadCrumbItems}
          >
                <h3>Contents Section</h3>
                <p>Here you can manage and view customer details.</p>
        </AdminContent>
    );
};

export default AdminContents;
