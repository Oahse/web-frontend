import axios from 'axios';

// Helper function to handle API calls
const fetchData = async (method, url, data = null, config = {}) => {
    let result = {loading: true, data: null, error: null };
    try {
        const response = await axios({method, url, data, ...config});
        if (response.success === true){
            result.data = response.data.data;
            result.error = response.data.message
        }else{
            result.data = response.data.data;
        }
        result.loading = false;
        
    } catch (error) {
        result.error = error.message;
        result.loading = false;
    }
    return result;
};
export default fetchData;