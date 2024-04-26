import axios from "axios"
 
const kakaoHeader = {
  "Authorization": "6391c6d463c2215a31a40506ed6ec73e", //ADMIN KEY
  "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
};
 
const getKakaoToken = async code => {
  try {
    const data = {
      grant_type: "authorization_code",
      client_id: "3648ea223e4d0e9a853c7842d0b4aaa9", // REST_API_KEY
      redirect_uri: "http://localhost:8080/kakaoLogin",
      code: code
    };
    
    const queryString = Object.keys(data)
      .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");
    
    const result = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      queryString,
      { headers: kakaoHeader }
    );
    console.log(result);
 
    console.log("카카오 토큰", queryString);
    return result;
  } catch (e) {
    return e;
  }
};
 

 
export { getKakaoToken };
 