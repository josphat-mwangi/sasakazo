const request = require("request");
const authBase64 = require("./Authbase64");

const get_access_token = (req, res, next) => {
  let auth_credentials = process.env.authurl;
  let auth = 'QXpzMktlalUxQVJ2SUw1SmRKc0FSYlYyZ0RyV21wT0I6aGlwR3ZGSmJPeHJpMzMwYw==';

  request(
    {
      uri: auth_credentials,
      headers: {
        "Content-Type": 'application/json',
        "Authorization": "Basic " + auth,
      },
    },
    (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        req.access_token = JSON.parse(body).access_token;
        next();
      }
    }
  );
};

module.exports = get_access_token;