import { useEffect, useState } from "react";

import Preloader from "@/components/admin/PreLoader";
import SideBar from "@/components/admin/SideBar";
import AdminHeader from "@/components/admin/toolbar/header";
import AdminFooter from "@/components/admin/toolbar/footer";
import Breadcrumbs from "@/components/admin/breadcrumbs";
import { createProduct } from '@/services/api/products';
import { convertImageToBase64 } from '@/services/helper';
import { ToastContainer, toast } from 'react-toastify';
import Toast from "@/components/Toast";
import useAdminStyles from '@/hooks/useAdminStyles';


const menuItems = [
    {
      title: 'Ecommerce',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.2652 3.57566C12.1187 3.42921 11.8813 3.42921 11.7348 3.57566L5.25 10.0605V19.8748C5.25 20.0819 5.41789 20.2498 5.625 20.2498H9V16.1248C9 15.0893 9.83947 14.2498 10.875 14.2498H13.125C14.1605 14.2498 15 15.0893 15 16.1248V20.2498H18.375C18.5821 20.2498 18.75 20.0819 18.75 19.8748V10.0605L12.2652 3.57566ZM20.25 11.5605L21.2197 12.5302C21.5126 12.8231 21.9874 12.8231 22.2803 12.5302C22.5732 12.2373 22.5732 11.7624 22.2803 11.4695L13.3258 2.51499C12.5936 1.78276 11.4064 1.78276 10.6742 2.515L1.71967 11.4695C1.42678 11.7624 1.42678 12.2373 1.71967 12.5302C2.01256 12.8231 2.48744 12.8231 2.78033 12.5302L3.75 11.5605V19.8748C3.75 20.9104 4.58947 21.7498 5.625 21.7498H18.375C19.4105 21.7498 20.25 20.9104 20.25 19.8748V11.5605ZM13.5 20.2498H10.5V16.1248C10.5 15.9177 10.6679 15.7498 10.875 15.7498H13.125C13.3321 15.7498 13.5 15.9177 13.5 16.1248V20.2498Z" fill="#111111"/>
  </svg>, // or component
      link: '/admin',
      
    },
    {
      title: 'Product',
      icon: <i className="icon-file-plus"></i>,
      children: [
            { title: 'All Products', link: '/admin/products' },
            { title: 'Add Product', link: '/admin/products/add' },
      ],
      link: "javascript:void(0);",
      isActive: true,
    },
    {
        title: 'Category',
        icon: <i className="icon-layers"></i>,
        children: [
          { title: 'Category list', link: '/admin/categories' },
          { title: 'New category', link: '/admin/categories/add' },
        ],
        link: "javascript:void(0);",
      },
    {
      title: 'Attributes',
      icon: <svg width="24" height="22" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.5 1.875C0.5 0.839466 1.33947 0 2.375 0H19.625C20.6605 0 21.5 0.839466 21.5 1.875V3.375C21.5 4.29657 20.8351 5.06285 19.9589 5.22035L19.3733 15.1762C19.28 16.7619 17.9669 18 16.3785 18H5.62154C4.03311 18 2.71999 16.7619 2.62671 15.1762L2.04108 5.22035C1.16485 5.06285 0.5 4.29657 0.5 3.375V1.875ZM2.75659 3.75C2.75266 3.74997 2.74873 3.74997 2.74479 3.75H2.375C2.16789 3.75 2 3.58211 2 3.375V1.875C2 1.66789 2.16789 1.5 2.375 1.5H19.625C19.8321 1.5 20 1.66789 20 1.875V3.375C20 3.58211 19.8321 3.75 19.625 3.75H19.2552C19.2513 3.74997 19.2473 3.74997 19.2434 3.75H2.75659ZM3.54541 5.25L4.12412 15.0881C4.17076 15.8809 4.82732 16.5 5.62154 16.5H16.3785C17.1727 16.5 17.8292 15.8809 17.8759 15.0881L18.4546 5.25H3.54541ZM8.24976 8.25C8.24976 7.83579 8.58554 7.5 8.99976 7.5H12.9998C13.414 7.5 13.7498 7.83579 13.7498 8.25C13.7498 8.66421 13.414 9 12.9998 9H8.99976C8.58554 9 8.24976 8.66421 8.24976 8.25Z" fill="#111111"/>
  </svg>,
      children: [
        { title: 'Attributes', link: 'attributes.html' },
        { title: 'Add attributes', link: 'add-attributes.html' },
      ],
      link: "javascript:void(0);",
    },
    {
      title: 'Order',
      icon: <svg width="24" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.0001 2C8.34322 2 7.00008 3.34315 7.00008 5V5.75H13.0001V5C13.0001 3.34315 11.6569 2 10.0001 2ZM14.5001 5.75V5C14.5001 2.51472 12.4854 0.5 10.0001 0.5C7.51479 0.5 5.50008 2.51472 5.50008 5V5.75H3.51287C2.55332 5.75 1.74862 6.47444 1.64817 7.42872L0.385015 19.4287C0.268481 20.5358 1.13652 21.5 2.24971 21.5H17.7504C18.8636 21.5 19.7317 20.5358 19.6151 19.4287L18.352 7.42872C18.2515 6.47444 17.4468 5.75 16.4873 5.75H14.5001ZM13.0001 7.25H7.00008V8.66146C7.23023 8.86745 7.37508 9.16681 7.37508 9.5C7.37508 10.1213 6.8714 10.625 6.25008 10.625C5.62876 10.625 5.12508 10.1213 5.12508 9.5C5.12508 9.16681 5.26992 8.86745 5.50008 8.66146V7.25H3.51287C3.32096 7.25 3.16002 7.39489 3.13993 7.58574L1.87677 19.5857C1.85347 19.8072 2.02707 20 2.24971 20H17.7504C17.9731 20 18.1467 19.8072 18.1234 19.5857L16.8602 7.58574C16.8401 7.39489 16.6792 7.25 16.4873 7.25H14.5001V8.66146C14.7302 8.86746 14.8751 9.16681 14.8751 9.5C14.8751 10.1213 14.3714 10.625 13.7501 10.625C13.1288 10.625 12.6251 10.1213 12.6251 9.5C12.6251 9.16681 12.7699 8.86745 13.0001 8.66146V7.25Z" fill="#111111"/>
  </svg>,
      children: [
        { title: 'Order list', link: 'oder-list.html' },
        { title: 'Order detail', link: 'oder-detail.html' },
        { title: 'Order tracking', link: 'oder-tracking.html' },
      ],
      link: "javascript:void(0);",
    },
    {
      title: 'Users',
      icon: <i className="icon-user"></i>,
      link: "javascript:void(0);",
      children: [
        { title: 'All user', link: 'all-user.html' },
        { title: 'Add new user', link: 'add-new-user.html' },
        { title: 'Login', link: 'login.html' },
        { title: 'Sign up', link: 'sign-up.html' },
      ],
    },
    {
      title: 'Online Store',
      icon: <svg width="24" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M5.1392 7.41658C5.73654 7.87694 6.38132 8.27855 7.06498 8.61284C7.30482 7.3722 7.67417 6.24668 8.1472 5.30063C8.29118 5.01266 8.44837 4.7351 8.61825 4.47262C7.20101 5.11026 5.99608 6.13656 5.1392 7.41658ZM12 2.25C8.3534 2.25 5.17543 4.25226 3.50379 7.21378C2.70535 8.62832 2.25 10.2621 2.25 12C2.25 12.8417 2.35682 13.6595 2.55803 14.4401C3.64146 18.6436 7.45701 21.75 12 21.75C16.543 21.75 20.3585 18.6436 21.442 14.4401C21.6432 13.6595 21.75 12.8417 21.75 12C21.75 10.2621 21.2947 8.62832 20.4962 7.21378C18.8246 4.25226 15.6466 2.25 12 2.25ZM12 3.75C11.1945 3.75 10.2633 4.4225 9.48884 5.97145C9.0479 6.85334 8.69814 7.95052 8.48423 9.18993C9.5902 9.55342 10.772 9.75 12 9.75C13.228 9.75 14.4098 9.55342 15.5158 9.18993C15.3019 7.95052 14.9521 6.85334 14.5112 5.97145C13.7367 4.4225 12.8055 3.75 12 3.75ZM16.935 8.61284C16.6952 7.3722 16.3258 6.24668 15.8528 5.30063C15.7088 5.01266 15.5516 4.7351 15.3817 4.47262C16.799 5.11026 18.0039 6.13656 18.8608 7.41657C18.2635 7.87693 17.6187 8.27855 16.935 8.61284ZM15.7017 10.7042C14.53 11.0591 13.2872 11.25 12 11.25C10.7128 11.25 9.46996 11.0591 8.29832 10.7042C8.26657 11.1256 8.25 11.5583 8.25 12C8.25 13.2235 8.37714 14.3782 8.60185 15.4155C9.70027 15.6349 10.8365 15.75 12 15.75C13.1635 15.75 14.2997 15.6349 15.3981 15.4155C15.6229 14.3782 15.75 13.2235 15.75 12C15.75 11.5583 15.7334 11.1256 15.7017 10.7042ZM17.0027 15.0136C17.1639 14.0617 17.25 13.0479 17.25 12C17.25 11.3733 17.2192 10.7588 17.16 10.1625C18.023 9.7801 18.8356 9.30479 19.5851 8.7493C20.0129 9.74621 20.25 10.8447 20.25 12C20.25 12.6024 20.1856 13.189 20.0634 13.7535C19.0944 14.2668 18.0705 14.6906 17.0027 15.0136ZM14.9409 17.0206C13.9826 17.1716 13.0004 17.25 12 17.25C10.9996 17.25 10.0174 17.1716 9.0591 17.0206C9.18976 17.3811 9.33365 17.7182 9.48884 18.0286C10.2633 19.5775 11.1945 20.25 12 20.25C12.8055 20.25 13.7367 19.5775 14.5112 18.0286C14.6664 17.7182 14.8102 17.3811 14.9409 17.0206ZM15.3819 19.5272C15.5517 19.2648 15.7089 18.9873 15.8528 18.6994C16.1562 18.0925 16.417 17.4118 16.6283 16.6742C17.5649 16.4364 18.4735 16.1281 19.348 15.7552C18.4955 17.42 17.0936 18.757 15.3819 19.5272ZM8.61812 19.5272C8.44828 19.2648 8.29114 18.9873 8.1472 18.6994C7.84377 18.0925 7.583 17.4118 7.37171 16.6742C6.4351 16.4364 5.52652 16.1281 4.65199 15.7552C5.50454 17.42 6.9064 18.757 8.61812 19.5272ZM3.93656 13.7535C4.90563 14.2668 5.92951 14.6906 6.99729 15.0136C6.83612 14.0617 6.75 13.0479 6.75 12C6.75 11.3733 6.7808 10.7588 6.84003 10.1625C5.97701 9.7801 5.16437 9.30479 4.41491 8.7493C3.98705 9.74621 3.75 10.8447 3.75 12C3.75 12.6024 3.81444 13.189 3.93656 13.7535Z" fill="#0A0A0C"/>
      </svg>,
      link: "javascript:void(0);",
      children: [
        { title: 'View Store', link: '../index.html' },
        { title: 'Store Setting', link: 'store-setting.html' },
      ],
    },
    {
      title: 'Report',
      icon: <i className="icon-pie-chart"></i>,
      link: 'report.html',
    },
    {
      title: 'Setting',
      icon: <svg width="24" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.85353 1.81675C7.00421 0.91265 7.78644 0.25 8.70302 0.25H11.297C12.2136 0.25 12.9958 0.91265 13.1465 1.81675L13.36 3.0978C13.3789 3.21129 13.463 3.34312 13.6275 3.43418C13.7099 3.47981 13.7914 3.52694 13.8719 3.57554C14.0328 3.67272 14.1891 3.67975 14.297 3.63933L15.5139 3.18345C16.3722 2.86189 17.3372 3.208 17.7955 4.00177L19.0924 6.24821C19.5507 7.04199 19.368 8.05075 18.6603 8.63329L17.656 9.46011C17.5671 9.5333 17.4952 9.67172 17.4987 9.85864C17.4996 9.90566 17.5 9.95278 17.5 10C17.5 10.0472 17.4996 10.0943 17.4987 10.1413C17.4952 10.3283 17.5671 10.4667 17.656 10.5399L18.6603 11.3667C19.368 11.9492 19.5507 12.958 19.0924 13.7518L17.7955 15.9982C17.3372 16.792 16.3722 17.1381 15.5139 16.8165L14.297 16.3607C14.1891 16.3202 14.0328 16.3273 13.8719 16.4244C13.7914 16.4731 13.7099 16.5202 13.6275 16.5658C13.463 16.6569 13.3789 16.7887 13.36 16.9022L13.1465 18.1832C12.9958 19.0874 12.2136 19.75 11.297 19.75H8.70302C7.78644 19.75 7.00421 19.0873 6.85353 18.1832L6.64002 16.9022C6.62111 16.7887 6.53703 16.6569 6.37251 16.5658C6.29008 16.5202 6.20861 16.4731 6.12812 16.4245C5.96719 16.3273 5.81089 16.3203 5.703 16.3607L4.48613 16.8166C3.62781 17.1381 2.66282 16.792 2.20454 15.9982L0.907557 13.7518C0.44927 12.958 0.632026 11.9493 1.33966 11.3667L1.81634 11.9457L1.33966 11.3667L2.34401 10.5399C2.43291 10.4667 2.50477 10.3283 2.50131 10.1414C2.50044 10.0943 2.5 10.0472 2.5 10C2.5 9.95279 2.50044 9.90568 2.50131 9.85866C2.50477 9.67174 2.43291 9.53331 2.34401 9.46012L1.33966 8.63331C0.632025 8.05076 0.44927 7.042 0.907556 6.24823L2.20454 4.00179C2.66283 3.20801 3.62781 2.8619 4.48613 3.18346L5.70298 3.63934C5.81087 3.67975 5.96717 3.67273 6.12811 3.57555C6.2086 3.52695 6.29008 3.47981 6.37251 3.43418C6.53703 3.34312 6.62111 3.21129 6.64002 3.0978L6.85353 1.81675ZM8.70302 1.75C8.5197 1.75 8.36326 1.88253 8.33312 2.06335L8.11961 3.3444C8.01385 3.97899 7.59798 4.47031 7.09896 4.74654C7.03304 4.78303 6.96787 4.82073 6.90348 4.85961C6.41435 5.15497 5.77999 5.26999 5.17675 5.044L3.95989 4.58812C3.78823 4.52381 3.59523 4.59303 3.50358 4.75179L2.20659 6.99823C2.11494 7.15698 2.15149 7.35873 2.29301 7.47524L3.29737 8.30206C3.79348 8.71048 4.01162 9.31573 4.00105 9.88643C4.00035 9.92419 4 9.96205 4 10C4 10.038 4.00035 10.0758 4.00105 10.1136C4.01162 10.6843 3.79348 11.2895 3.29737 11.698L2.29302 12.5248L1.96067 12.1211L2.29302 12.5248C2.15149 12.6413 2.11494 12.843 2.20659 13.0018L3.50358 15.2482C3.59523 15.407 3.78823 15.4762 3.95989 15.4119L5.17676 14.956C5.78 14.73 6.41436 14.845 6.90349 15.1404C6.96787 15.1793 7.03304 15.217 7.09896 15.2535C7.59798 15.5297 8.01385 16.021 8.11961 16.6556L8.33312 17.9366C8.36326 18.1175 8.5197 18.25 8.70302 18.25H11.297C11.4803 18.25 11.6367 18.1175 11.6669 17.9366L11.8804 16.6556C11.9862 16.021 12.402 15.5297 12.901 15.2535C12.967 15.217 13.0321 15.1793 13.0965 15.1404C13.5856 14.845 14.22 14.73 14.8233 14.956L16.0401 15.4119C16.2118 15.4762 16.4048 15.407 16.4964 15.2482L17.7934 13.0018C17.8851 12.843 17.8485 12.6413 17.707 12.5248L16.7026 11.6979C16.2065 11.2895 15.9884 10.6843 15.999 10.1136C15.9997 10.0758 16 10.038 16 10C16 9.96205 15.9996 9.92419 15.9989 9.88642C15.9884 9.31571 16.2065 8.71046 16.7026 8.30204L17.707 7.47523C17.8485 7.35872 17.8851 7.15697 17.7934 6.99821L16.4964 4.75177C16.4048 4.59302 16.2118 4.5238 16.0401 4.58811L14.8232 5.04399C14.22 5.26998 13.5856 5.15496 13.0965 4.8596C13.0321 4.82072 12.967 4.78303 12.901 4.74654C12.402 4.47031 11.9862 3.979 11.8804 3.3444L11.6669 2.06335C11.6367 1.88253 11.4803 1.75 11.297 1.75H8.70302ZM9.99977 7.74992C8.75713 7.74992 7.74977 8.75728 7.74977 9.99992C7.74977 11.2426 8.75713 12.2499 9.99977 12.2499C11.2424 12.2499 12.2498 11.2426 12.2498 9.99992C12.2498 8.75728 11.2424 7.74992 9.99977 7.74992ZM6.24977 9.99992C6.24977 7.92885 7.9287 6.24992 9.99977 6.24992C12.0708 6.24992 13.7498 7.92885 13.7498 9.99992C13.7498 12.071 12.0708 13.7499 9.99977 13.7499C7.9287 13.7499 6.24977 12.071 6.24977 9.99992Z" fill="#0A0A0C"/>
  </svg>,
      link: 'setting.html',
    },
    {
      title:'FAQ',
      icon:<svg width="24" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.2691 7.55799C17.9409 7.215 17.6014 6.86156 17.4734 6.55078C17.355 6.26612 17.348 5.79429 17.3411 5.33725C17.328 4.48761 17.3141 3.5248 16.6446 2.85536C15.9752 2.18592 15.0124 2.17199 14.1627 2.15893C13.7057 2.15196 13.2339 2.145 12.9492 2.02661C12.6393 1.89864 12.285 1.55913 11.942 1.23094C11.3413 0.653772 10.6588 0 9.75 0C8.84116 0 8.15953 0.653772 7.55799 1.23094C7.215 1.55913 6.86156 1.89864 6.55078 2.02661C6.26786 2.145 5.79429 2.15196 5.33725 2.15893C4.48761 2.17199 3.5248 2.18592 2.85536 2.85536C2.18592 3.5248 2.17634 4.48761 2.15893 5.33725C2.15196 5.79429 2.145 6.26612 2.02661 6.55078C1.89864 6.86069 1.55913 7.215 1.23094 7.55799C0.653772 8.15866 0 8.84116 0 9.75C0 10.6588 0.653772 11.3405 1.23094 11.942C1.55913 12.285 1.89864 12.6384 2.02661 12.9492C2.145 13.2339 2.15196 13.7057 2.15893 14.1627C2.17199 15.0124 2.18592 15.9752 2.85536 16.6446C3.5248 17.3141 4.48761 17.328 5.33725 17.3411C5.79429 17.348 6.26612 17.355 6.55078 17.4734C6.86069 17.6014 7.215 17.9409 7.55799 18.2691C8.15866 18.8462 8.84116 19.5 9.75 19.5C10.6588 19.5 11.3405 18.8462 11.942 18.2691C12.285 17.9409 12.6384 17.6014 12.9492 17.4734C13.2339 17.355 13.7057 17.348 14.1627 17.3411C15.0124 17.328 15.9752 17.3141 16.6446 16.6446C17.3141 15.9752 17.328 15.0124 17.3411 14.1627C17.348 13.7057 17.355 13.2339 17.4734 12.9492C17.6014 12.6393 17.9409 12.285 18.2691 11.942C18.8462 11.3413 19.5 10.6588 19.5 9.75C19.5 8.84116 18.8462 8.15953 18.2691 7.55799ZM17.2636 10.9783C16.8466 11.4136 16.4148 11.8637 16.1859 12.4165C15.9665 12.9475 15.9569 13.5542 15.9482 14.1419C15.9395 14.7512 15.9299 15.3893 15.6592 15.6592C15.3885 15.9291 14.7547 15.9395 14.1419 15.9482C13.5542 15.9569 12.9475 15.9665 12.4165 16.1859C11.8637 16.4148 11.4136 16.8466 10.9783 17.2636C10.5431 17.6806 10.0982 18.1071 9.75 18.1071C9.40179 18.1071 8.95346 17.6788 8.52167 17.2636C8.08989 16.8483 7.63634 16.4148 7.08355 16.1859C6.55252 15.9665 5.94576 15.9569 5.35815 15.9482C4.74877 15.9395 4.11067 15.9299 3.8408 15.6592C3.57094 15.3885 3.56049 14.7547 3.55179 14.1419C3.54308 13.5542 3.5335 12.9475 3.31413 12.4165C3.08518 11.8637 2.65339 11.4136 2.23641 10.9783C1.81942 10.5431 1.39286 10.0982 1.39286 9.75C1.39286 9.40179 1.82116 8.95346 2.23641 8.52167C2.65165 8.08989 3.08518 7.63634 3.31413 7.08355C3.5335 6.55252 3.54308 5.94576 3.55179 5.35815C3.56049 4.74877 3.57007 4.11067 3.8408 3.8408C4.11154 3.57094 4.74529 3.56049 5.35815 3.55179C5.94576 3.54308 6.55252 3.5335 7.08355 3.31413C7.63634 3.08518 8.08641 2.65339 8.52167 2.23641C8.95694 1.81942 9.40179 1.39286 9.75 1.39286C10.0982 1.39286 10.5465 1.82116 10.9783 2.23641C11.4101 2.65165 11.8637 3.08518 12.4165 3.31413C12.9475 3.5335 13.5542 3.54308 14.1419 3.55179C14.7512 3.56049 15.3893 3.57007 15.6592 3.8408C15.9291 4.11154 15.9395 4.74529 15.9482 5.35815C15.9569 5.94576 15.9665 6.55252 16.1859 7.08355C16.4148 7.63634 16.8466 8.08641 17.2636 8.52167C17.6806 8.95694 18.1071 9.40179 18.1071 9.75C18.1071 10.0982 17.6788 10.5465 17.2636 10.9783ZM10.7946 14.2768C10.7946 14.4834 10.7334 14.6854 10.6186 14.8572C10.5038 15.0289 10.3407 15.1628 10.1498 15.2419C9.95888 15.321 9.74884 15.3417 9.5462 15.3014C9.34356 15.261 9.15742 15.1616 9.01133 15.0155C8.86523 14.8694 8.76574 14.6832 8.72543 14.4806C8.68512 14.2779 8.70581 14.0679 8.78488 13.877C8.86394 13.6861 8.99784 13.523 9.16963 13.4082C9.34142 13.2934 9.54339 13.2321 9.75 13.2321C10.0271 13.2321 10.2928 13.3422 10.4887 13.5381C10.6846 13.734 10.7946 13.9997 10.7946 14.2768ZM13.2321 8.00893C13.2321 9.52192 12.0343 10.7885 10.4464 11.0802V11.1429C10.4464 11.3276 10.3731 11.5047 10.2425 11.6353C10.1118 11.7659 9.9347 11.8393 9.75 11.8393C9.5653 11.8393 9.38816 11.7659 9.25755 11.6353C9.12695 11.5047 9.05357 11.3276 9.05357 11.1429V10.4464C9.05357 10.2617 9.12695 10.0846 9.25755 9.95398C9.38816 9.82337 9.5653 9.75 9.75 9.75C10.9017 9.75 11.8393 8.96652 11.8393 8.00893C11.8393 7.05134 10.9017 6.26786 9.75 6.26786C8.59828 6.26786 7.66071 7.05134 7.66071 8.00893V8.35714C7.66071 8.54185 7.58734 8.71899 7.45674 8.84959C7.32613 8.9802 7.14899 9.05357 6.96429 9.05357C6.77958 9.05357 6.60244 8.9802 6.47184 8.84959C6.34123 8.71899 6.26786 8.54185 6.26786 8.35714V8.00893C6.26786 6.28092 7.8296 4.875 9.75 4.875C11.6704 4.875 13.2321 6.28092 13.2321 8.00893Z" fill="#111111"/>
  </svg>,
      link:'faq.html'
    }
    ,
    {
      title:'Log Out',
      icon:<svg width="24" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.125 18.6875C8.125 18.903 8.0394 19.1097 7.88702 19.262C7.73465 19.4144 7.52799 19.5 7.3125 19.5H1.625C1.19402 19.5 0.780698 19.3288 0.475951 19.024C0.171205 18.7193 0 18.306 0 17.875V1.625C0 1.19402 0.171205 0.780698 0.475951 0.475951C0.780698 0.171205 1.19402 0 1.625 0H7.3125C7.52799 0 7.73465 0.0856026 7.88702 0.237976C8.0394 0.390349 8.125 0.597012 8.125 0.8125C8.125 1.02799 8.0394 1.23465 7.88702 1.38702C7.73465 1.5394 7.52799 1.625 7.3125 1.625H1.625V17.875H7.3125C7.52799 17.875 7.73465 17.9606 7.88702 18.113C8.0394 18.2653 8.125 18.472 8.125 18.6875ZM19.2623 9.17516L15.1998 5.11266C15.0474 4.9602 14.8406 4.87455 14.625 4.87455C14.4094 4.87455 14.2026 4.9602 14.0502 5.11266C13.8977 5.26511 13.812 5.47189 13.812 5.6875C13.812 5.90311 13.8977 6.10989 14.0502 6.26234L16.7263 8.9375H7.3125C7.09701 8.9375 6.89035 9.0231 6.73798 9.17548C6.5856 9.32785 6.5 9.53451 6.5 9.75C6.5 9.96549 6.5856 10.1722 6.73798 10.3245C6.89035 10.4769 7.09701 10.5625 7.3125 10.5625H16.7263L14.0502 13.2377C13.8977 13.3901 13.812 13.5969 13.812 13.8125C13.812 14.0281 13.8977 14.2349 14.0502 14.3873C14.2026 14.5398 14.4094 14.6255 14.625 14.6255C14.8406 14.6255 15.0474 14.5398 15.1998 14.3873L19.2623 10.3248C19.3379 10.2494 19.3978 10.1598 19.4387 10.0611C19.4796 9.9625 19.5006 9.85678 19.5006 9.75C19.5006 9.64322 19.4796 9.5375 19.4387 9.43886C19.3978 9.34023 19.3379 9.25062 19.2623 9.17516Z" fill="#111111"/>
    </svg>,
      link:'login.html'
    }
  ];

  const AddAdminProducts = ({ API_URL, Companyname, isLoggedIn, loggedInUser,categories=[]  }) => {
    useAdminStyles(); // ✅ dynamically manages admin styles
    const [product, setProduct] = useState(null);
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState([]);
    const [isHeaderFullWidth, setIsHeaderFullWidth] = useState(false);
    const showHideMenu = (e) => {
        e.preventDefault()
        // Find the layout-wrap element
    
        var layoutWrap = document.getElementById('layout-wrap');
      
        // Toggle the full-width class based on the state
        if (isHeaderFullWidth) {
          layoutWrap.classList.remove('full-width');
          
        } else {
          layoutWrap.classList.add('full-width');
        }
      
        // Toggle the state of the full-width flag
        setIsHeaderFullWidth(!isHeaderFullWidth);
        
      };
    useEffect(() => {
      if (product) {
        setFormData({
          name: product.name || '',
          category: product.category || '',
          price: product.price || '',
          salePrice: product.salePrice || '',
          date: product.date || '',
          brand: product.brand || '',
          color: product.color || '',
          size: product.size || '',
          sku: product.sku || '',
          stock: product.stock || '',
          tags: product.tags || '',
          description: product.description || '',
          image: product.image || '',
        });
        setImagePreview(product.image || []);
      }
    }, [product]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleImageChange = (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        const promises = files.map(file => 
          convertImageToBase64(file).then(base64 => {
            return base64;
          }).catch(() => URL.createObjectURL(file))
        );
  
        Promise.all(promises).then(base64Images => {
          setFormData(prev => ({ ...prev, image: [...imagePreview, ...base64Images] }));
          setImagePreview(prev => [...prev, ...base64Images]);
        });
      }
    };
  
    const handleRemoveImage = (img) => {
      setImagePreview(prev => prev.filter(item => item !== img));
    };
  
    const handleSave = async () => {
        if (
            !formData.name ||
            !formData.category ||
            !formData.price ||
            !formData.brand ||
            !formData.stock ||
            !formData.description
          ) {
            toast.error(<Toast title="Validation Error" subtitle="Please fill out all required fields." />);
            return;
          }
          
  
      try {
        const result = await createProduct({ productData: formData });
  
        if (!result.error) {
          setProduct(result.data);
          toast.success(<Toast title={result.message} subtitle="" />);
        } else {
          toast.error(<Toast title={result.error} subtitle="Something went wrong. Please try again." />);
        }
      } catch (error) {
        toast.error(<Toast title="An error occurred. Please try again." subtitle={error} />);
      } 
    };
  
    
    return(
        <div id="wrapper">
            {/* <!-- #page --> */}
            <div id="page" className="">
                {/* <!-- layout-wrap --> */}
                <div id="layout-wrap" className="layout-wrap">
                    {/* <!-- preload --> */}
                    {loading && <Preloader />} 
                    {/* <!-- /preload --> */}
                    {/* <!-- section-menu-left --> */}
                    <SideBar activeMenu={1} onshowHideMenu={showHideMenu} />
                    {/* <!-- /section-menu-left --> */}
                    <div className="section-content-right">
                        {/* <!-- header-dashboard --> */}
                        <AdminHeader onshowHideMenu={showHideMenu} isLoggedIn={isLoggedIn} user={loggedInUser}  />
                        {/* <!-- /header-dashboard --> */}
                        {/* <!-- main-content --> */}
                        <div className="main-content">
                        {/* <!-- main-content-wrap --> */}
                        <div className="main-content-inner">
                            {/* <!-- main-content-wrap --> */}
                            <div className="main-content-wrap">
                                <div className="flex items-center flex-wrap justify-between gap20 mb-30">
                                    <h3>Add Product</h3>
                                    <Breadcrumbs
                                        items={[
                                            { label: 'Dashboard', href: '/admin' },
                                            { label: 'Product', href: 'javascript:void(0);' },
                                            { label: 'Add Products' }
                                        ]}
                                    />
                                </div>
                                {/* <!-- form-add-product --> */}
                                <form className="form-add-product" >
                                    <div className="wg-box mb-30">
                                        <fieldset>
                                            <div className="body-title mb-10">Upload images</div>
                                            <div className="upload-image mb-16 flex-grow">
                                                <div className="item up-load">
                                                    <label className="uploadfile h250" for="myFile">
                                                        <span className="icon">
                                                        <i className="icon-upload-cloud"></i>
                                                        </span>
                                                        <span className="body-text">Drop your images here or select <span className="tf-color">click to browse</span></span>
                                                        <img src='' alt={formData?.title || formData?.name || 'Category Image'} className="has-img"/>
                                                        <input type="file" id="myFile" name="filename" onChange={handleImageChange}/>
                                                    </label>
                                                </div>
                                                <div className="flex flex-wrap justify-center -mx-1">
                                                    {imagePreview.map((img, index) => (
                                                    <div key={index} className="w-1/2 sm:w-1/3 md:w-1/4 px-1 mb-2">
                                                        <div
                                                        className="relative group bg-gray-100 p-2 rounded"
                                                        style={{ position: 'relative' }}
                                                        >
                                                        {/* Image */}
                                                        <img
                                                            src={img}
                                                            alt={`Preview ${index}`}
                                                            style={{ width: '100px', height: '100px', borderRadius: '6px' }}
                                                        />

                                                        {/* Delete Icon with inline styles */}
                                                        <button
                                                            type="button"
                                                            // onClick={() => handleImageDelete(index)}
                                                            style={{
                                                                position: 'absolute',
                                                                top: '4px',
                                                                right: '4px',
                                                                color: 'red',
                                                                padding:'4px',
                                                                fontSize:'large',
                                                                opacity: 1,
                                                                transition: 'opacity 0.3s',
                                                                pointerEvents: 'auto',
                                                            }}
                                                            className="delete-icon"
                                                            onClick={()=>handleRemoveImage(img)}
                                                        >
                                                            <i className="icon-trash-2"></i>
                                                        </button>
                                                        </div>
                                                    </div>
                                                    ))}

                                                </div>

                                            </div>
                                            <div className="body-text">You need to add at least 4 images. Pay attention to the quality of the pictures you add, comply with the background color standards. Pictures must be in certain dimensions. Notice that the product shows all the details</div>
                                        </fieldset>
                                    </div>
                                    <div className="wg-box mb-30">
                                    <fieldset className="name">
                                    <div className="body-title mb-10">Product title <span className="tf-color-1">*</span></div>
                                    <input
                                        className="mb-10"
                                        type="text"
                                        placeholder="Enter title"
                                        onChange={handleInputChange}
                                        name="name"
                                        value={formData?.name || ""}
                                        aria-required="true"
                                        required
                                    />
                                    <div className="text-tiny text-surface-2">Do not exceed 20 characters when entering the product name.</div>
                                    </fieldset>

                                        <fieldset className="category">
                                            <div className="body-title mb-10">Category <span className="tf-color-1">*</span></div>
                                            <input className="" type="text" placeholder="Choose category" onChange={handleInputChange} name="text" tabindex="0" value="" aria-required="true" required=""/>
                                        </fieldset>
                                        <div className="cols-lg gap22">
                                            <fieldset className="price">
                                                <div className="body-title mb-10">Price <span className="tf-color-1">*</span></div>
                                                <input className="" type="number" placeholder="Price" onChange={handleInputChange} name="text" tabindex="0" value="" aria-required="true" required=""/>
                                            </fieldset>
                                            <fieldset className="sale-price">
                                                <div className="body-title mb-10">Sale Price </div>
                                                <input className="" type="number" placeholder="Sale Price " onChange={handleInputChange} name="text" tabindex="0" value="" aria-required="true" required=""/>
                                            </fieldset>
                                            <fieldset className="schedule">
                                                <div className="body-title mb-10">Schedule</div>
                                                <input type="date" name="date" onChange={handleInputChange} />
                                            </fieldset>
                                        </div>
                                        <div className="cols-lg gap22">
                                            <fieldset className="choose-brand">
                                                <div className="body-title mb-10">Brand <span className="tf-color-1">*</span></div>
                                                <input className="" type="text" placeholder="Choose brand" onChange={handleInputChange} name="text" tabindex="0" value="" aria-required="true" required=""/>
                                            </fieldset>
                                            <fieldset className="variant-picker-item">
                                                <div className="variant-picker-label body-title">
                                                    Color: <span className="body-title-2 fw-4 variant-picker-label-value">Orange</span>
                                                </div>
                                                <div className="variant-picker-values">
                                                    <input id="values-orange" type="radio" name="color" checked=""/>
                                                    <label className="radius-60" for="values-orange" data-value="Orange">
                                                        <span className="btn-checkbox bg-color-orange"></span>
                                                    </label>
                                                    <input id="values-blue" type="radio" name="color"/>
                                                    <label className="radius-60" for="values-blue" data-value="Blue">
                                                        <span className="btn-checkbox bg-color-blue"></span>
                                                    </label>
                                                    <input id="values-yellow" type="radio" name="color"/>
                                                    <label className="radius-60" for="values-yellow" data-value="Yellow">
                                                        <span className="btn-checkbox bg-color-yellow"></span>
                                                    </label>
                                                    <input id="values-black" type="radio" name="color"/>
                                                    <label className="radius-60" for="values-black" data-value="Black">
                                                        <span className="btn-checkbox bg-color-black"></span>
                                                    </label>
                                                </div>
                                            </fieldset>
                                            <fieldset className="variant-picker-item">
                                                <div className="variant-picker-label body-text">
                                                    Size: <span className="body-title-2 variant-picker-label-value">S</span>
                                                </div>
                                                <div className="variant-picker-values">
                                                    <input type="radio" name="size" id="values-s"/>
                                                    <label className="style-text" for="values-s" data-value="S">
                                                        <div className="text">S</div>
                                                    </label>
                                                    <input type="radio" name="size" id="values-m" checked=""/>
                                                    <label className="style-text" for="values-m" data-value="M">
                                                        <div className="text">M</div>
                                                    </label>
                                                    <input type="radio" name="size" id="values-l"/>
                                                    <label className="style-text" for="values-l" data-value="L">
                                                        <div className="text">L</div>
                                                    </label>
                                                    <input type="radio" name="size" id="values-xl"/>
                                                    <label className="style-text" for="values-xl" data-value="XL">
                                                        <div className="text">XL</div>
                                                    </label>
                                                </div>
                                            </fieldset>
                                        </div>
                                        <div className="cols-lg gap22">
                                            <fieldset className="sku">
                                                <div className="body-title mb-10">SKU</div>
                                                <input className="" type="text" placeholder="Enter SKU" onChange={handleInputChange} name="text" tabindex="0" value="" aria-required="true" required=""/>
                                            </fieldset>
                                            <fieldset className="category">
                                                <div className="body-title mb-10">Stock <span className="tf-color-1">*</span></div>
                                                <input className="" type="text" placeholder="Enter Stock" onChange={handleInputChange} name="text" tabindex="0" value="" aria-required="true" required=""/>
                                            </fieldset>
                                            <fieldset className="sku">
                                                <div className="body-title mb-10">Tags</div>
                                                <input className="" type="text" placeholder="Enter a tag" onChange={handleInputChange} name="text" tabindex="0" value="" aria-required="true" required=""/>
                                            </fieldset>
                                        </div>
                                        <fieldset className="description">
                                            <div className="body-title mb-10">Description <span className="tf-color-1">*</span></div>
                                            <textarea className="mb-10" name="description" onChange={handleInputChange} placeholder="Short description about product" tabindex="0" aria-required="true" required=""></textarea>
                                            <div className="text-tiny">Do not exceed 100 characters when entering the product name.</div>
                                        </fieldset>
                                    </div>
                                
                                    <div className="cols gap10">
                                    
                                            <button className="tf-button w208" type="button" onClick={handleSave}>
                                              Save
                                            </button>
                                            <ToastContainer/>
                                    </div>
                                </form>
                                {/* <!-- /form-add-product --> */}
                            </div>
                            {/* <!-- /main-content-wrap --> */}
                        </div>
                        {/* <!-- /main-content-wrap --> */}
                        {/* <!-- bottom-page --> */}
                        <AdminFooter />
                            {/* <!-- /bottom-page --> */}
                    </div>
                        {/* <!-- /main-content --> */}
                    </div>

                </div>
                {/* <!-- /layout-wrap --> */}
            </div>
            {/* <!-- /#page --> */}
        </div>
    )
}
export default AddAdminProducts;