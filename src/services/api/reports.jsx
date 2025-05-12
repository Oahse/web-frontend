import fetchData from "./fetch";

export const fetchReports = async ({ baseurl = 'http://localhost:8001' }) => {
    return fetchData('GET', `${baseurl}/api/v1/reports/`);
};

// Fetch dashboard data
export const fetchDashboardData = async ({ baseurl = 'http://localhost:8001' }) => {
    return fetchData('GET', `${baseurl}/api/v1/dashboard/`);
};