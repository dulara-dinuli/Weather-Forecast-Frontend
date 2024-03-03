let express = require('express');

let app = express();
app.use(express.static(__dirname+'/dist/weather-forecast-frontend'));

app.get('/*', (req, resp)=>{
    resp.sendFile(__dirname+'/dist/weather-forecast-frontend/index.html');
});


app.listen(process.env.PORT || 8080);