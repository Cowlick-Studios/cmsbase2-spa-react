import axios from 'axios';

let axiosInstance = axios.create({
	baseURL: process.env.REACT_APP_API,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use((request) => {
  let accessToken = localStorage.getItem("access_token");
	if (accessToken && request.headers) {
		request.headers['Authorization'] = `Bearer ${JSON.parse(accessToken)}`;
	}
	return request;
});

// axiosInstance.interceptors.response.use((response) => { 
//   return response;
// }, (error) => {
//   switch(error.response.status) {
//     case 401:
//       document.dispatchEvent(new CustomEvent('response_401', {
//         detail: { message: error.response.data.message },
//       }));
//       break;
//   }
//   return error.response;
// });

export { axiosInstance as http };
export { axios };
