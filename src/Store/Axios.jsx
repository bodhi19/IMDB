import axios from "axios";
 const instance=axios.create({
    baseURL:'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjRhNGUyODcyMzczMDUxNzYwOGEzODI5MTUzYWQxMiIsIm5iZiI6MTcyMTQ1Nzk0NC4xMDcxMTQsInN1YiI6IjY2OWI1YWEyNWZhYWE4NjcxZWM1MzhmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EMfXtutMxui2aJRijnTqci5b_9tw4faxdO159v1bczE'
      }
 })
 export default instance;