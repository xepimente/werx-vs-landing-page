import http from '../http-common';

class VoterDataService {
 checkIfRestaurantIsExists(data){
  return http.post('/voter/check-restaurant', data)
 }
 registerVoter(data){
  return http.post('/voter/register-voter', data)
 }
 getRestaurant(data){
  return http.post('/voter/get-restaurant', data)
 }
 getRestaurantLogo(data){
  return http.post('/voter/get-restaurant-logo', data)
 }
 updateVoter(data){
  return http.put('/voter/update-voter', data)
 }

 getLogoData(){
  return http.get('/logo/get-logos')
 }

 getLogo(data) {
  return http.post('/logo/get-logo', data)
 }
}

export default new VoterDataService();