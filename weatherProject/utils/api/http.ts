/// <reference types="vite/client" />

import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const http = axios.create({
	baseURL,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
});

export default http