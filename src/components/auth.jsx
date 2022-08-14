import axios from "axios";

/* Authorization*/
const apiUrl = "https://upayments-studycase-api.herokuapp.com/api";
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5pbGVzaDI0MTI5MUBnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vbmlsZXNoMjQxMjkxIiwiaWF0IjoxNjYwMDQ2OTQzLCJleHAiOjE2NjA0Nzg5NDN9.x10i3GT01NFcUtAC9RTZTg6ovD4_r_VXDkx1nftGJlg";

const authAxios = axios.create({
  baseURL : apiUrl,
  headers : {
    Authorization : `Bearer ${accessToken}`,
  },
})

export default authAxios;