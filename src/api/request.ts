import { func } from "prop-types";

const request = async (url: string, method: string, params: any) => {
  method = method.toUpperCase();
  console.log(url, method, params)

  params = params || {};
  
  if (method === 'GET') {
    Object.keys(params).forEach((key: string, index: number) => {
      var str = '';
      if (index == 0) {
        str = `?${key}=${params[key]}`;
      } else {
        str = `&${key}=${params[key]}`;
      }
      url+= str;
    })
  }

  const config = {
    method,
    headers:{
      'Content-Type':'application/json;charset=UTF-8'
    },
    body: JSON.stringify(params),
    mode:'cors',
    cache:'default'
  }

  if (method === 'GET') delete config.body;

  let data = (await fetch(url, { ...config as any })).json();
  return data;

  
}
export default request;