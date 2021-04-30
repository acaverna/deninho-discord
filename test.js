const https = require("https");
const cheerio = require("cheerio");
const htmlparser2 = require("htmlparser2");

https.get(
  "https://www.palavrasque.com/palavra-aleatoria.php?submit=nova+palavra",
  (res) => {
    if (res.statuscode !== 200) {
      console.error(
        `did not get an ok from the server. code: ${res.statuscode}`
      );
      res.resume();
      return;
    }

    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("close", () => {
      const dom = htmlparser2.parsedom(data);
      const $ = cheerio.load(dom);
      const randomword = $("b").text();

      https.get(
        "https://api.giphy.com/v1/gifs/search?api_key=uaywnbjplor7avhntaj8bumkbc43obt3&q=" + randomword + "&limit=1&offset=0&rating=pg-13&lang=pt",
        (resgiphy) => {
          if (resgiphy.statuscode !== 200) {
            console.error(
              `did not get an ok from the server. code: ${resgiphy.statuscode}`
            );
            resgiphy.resume();
            return;
          }

          let data = "";

          resgiphy.on("data", (chunk) => {
            data += chunk;
          });

          resgiphy.on("close", () => {
            datajson = json.parse(data)
            if (datajson.data.length >= 1){
              const gifurl = json.parse(data)
              console.log(gifurl.data[0].url)
            }else{

            }
          });
        }
      );
    });
  }
);
