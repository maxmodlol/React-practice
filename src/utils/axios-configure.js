import axios from 'axios';

const app = axios.create({
    headers: {  
        'Content-Type': 'application/json'
      }

})

export default app;