import service from './service';
console.log(service.post());
const api = {
  login(params = {}) {
    return service.post(`/login`, Object.assign({}, params))
  }
}


export default api;
