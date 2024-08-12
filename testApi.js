const axios = require('axios');

const name = "françois";
axios.get(`http://localhost:4000/api/personnes/search/${encodeURIComponent(name)}`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
