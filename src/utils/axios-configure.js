import axios from 'axios';

 export default function app (url,headers= {
  'Content-Type': 'application/json'
}
) {


const app = axios.create({
  baseURL:url,
  headers

})
return (
app.get(url)
)
 }
