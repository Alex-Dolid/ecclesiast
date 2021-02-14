// Core
import axios from "axios";

const instance = axios.create({
  baseURL: "https://b.jw-cdn.org/apis",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiIzN2Y0NzNlNC1jYzEyLTQ5NGMtOWY2ZC0wOThmZWRkYWI0NjUiLCJzdWIiOiJ3d3cuancub3JnLXB1YmxpYyIsImlzcyI6IldlYlB1Ymxpc2hpbmc6cHJkIiwiaWF0IjoxNjEzMjI0ODI5LCJuYmYiOjE2MTMyMjQ4MjksImV4cCI6MTYxMzgyOTYyOSwiYXVkIjpbIk11bHRpU2l0ZVNlYXJjaDpwcmQiLCJKV0JNZWRpYXRvcjpwcmQiLCJBbGVydHM6cHJkIiwiT21uaVNlYXJjaDpwcmQiXSwicGVybXMiOnsib21uaS1zZWFyY2giOnsic2l0ZXMiOlsiancub3JnOnByZCIsIndvbDpwcmQiXSwiZmlsdGVycyI6WyJhbGwiLCJwdWJsaWNhdGlvbnMiLCJ2aWRlb3MiLCJhdWRpbyIsImJpYmxlIl0sInRhZ3MiOnsiZXhjbHVkZWQiOlsiU2VhcmNoRXhjbHVkZSIsIldXV0V4Y2x1ZGUiXX19LCJzZWFyY2giOnsiZmFjZXRzIjpbeyJuYW1lIjoidHlwZSIsImZpZWxkIjoidGFncyIsInZhbHVlcyI6WyJ0eXBlOnZpZGVvIl19XX19fQ.fVBRhdDOaEI9wZJvbN8wv89NoCCgY37rKZxaVY3Nzlop0WzHA72KyBDhRDUCSfOKmh6YEPoFzuDBe8b4rb-8vBJQNht-Dn90iyekN9peFZd5RSOR4jt5MwHX-x9lLawE9uRnUSJEPBlubmvwxF95dxQdv1BshnLps0GPmGEmP_DfzcZ8h-0sUcgS9ZxMAqCC4Sn5nxBOtFGQlVlBS6Xu90cRdgcD3j7ptew6C1Bo7dGuNtUWeYvQP6ogLA6r2x0AQX_xb11HlJqMH6dMaLH04jVX8HktVfQXpWxuGa_tfAzxvPNxoylMhBB-CdBbftqt6f9a6Ak_nj3Qs9SVDS7keg"
  }
});

export default instance;
