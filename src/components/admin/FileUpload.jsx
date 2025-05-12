import React, { useState } from 'react';

const FileUpload = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="file-upload">
      <input type="file" id="myFile" onChange={handleFileChange} />
      {image && <img src={image} id="myFile-input" alt="preview" className="has-img" />}
    </div>
  );
};

export default FileUpload;
