
import axios from 'axios';

axios.get('http://127.0.0.1:8000/api/v1/auth/login/')
  .then(res => console.log(res.data));
