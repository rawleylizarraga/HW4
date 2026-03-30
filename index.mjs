import express from 'express';
import { getAll, searchByName } from 'rest-countries';
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
   const countries = await getAll(['name', 'flags', 'cca3']);
   countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
   console.log(countries);
   res.render("index", { countries })
});

app.get('/country', async (req, res) => {
   // let countryCode = req.query.code;
   // let countryInfo = countries[`get${countryCode}`]();
   // res.render('planet', { countryInfo, countryName });

   let countryCode = req.query.code;

   let url = `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,flags,area,capital,population`; // max 10 fields
   let response = await fetch(url);
   let countryInfo = await response.json();

   console.log(url);
   console.log(countryInfo);

   res.render('country', { countryInfo, countryCode });
});

app.listen(3000, () => {
   console.log('server started');
});