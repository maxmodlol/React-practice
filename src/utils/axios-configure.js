import axios from 'axios';
import { HEADER_CONFG } from '../utils/const'

export default function app(url, headers = HEADER_CONFG
) {


  const app = axios.create({
    baseURL: url,
    headers

  })
  return (
    app.get(url)
  )
}
