import axios from "axios";

axios.defaults.baseURL = 'http://localhost/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');  
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';