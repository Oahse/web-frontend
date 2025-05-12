import { ToastContainer, toast } from 'react-toastify';
import Preloader from "@/components/admin/PreLoader"; // Import Preloader if needed

const Toast = ({ title, subtitle}) => {
  return (
    <div className="p-1">
        <h4 className="text-dark fs-18 fw-semibold">{title}</h4> {/* fs-6 is for small heading text */}
        <p className="fs-12">{subtitle}</p> {/* fs-6 is for small paragraph text */}
    </div>

  );
};

export default Toast;
