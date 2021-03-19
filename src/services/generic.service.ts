import axios, { AxiosResponse } from "axios"
import { RequestObject } from '@/definitions/interfaces'

const request = async ({ url, options = "" }: RequestObject) => {
  const res: AxiosResponse = await axios(url + options)
  return res.data
}

export default request 