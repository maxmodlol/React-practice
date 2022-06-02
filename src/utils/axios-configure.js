import axios from 'axios';

 export default function app (url,headers) {


const app = axios.create({
  baseURL:url,
  headers

})
return (
app.get(url)
)
 }
