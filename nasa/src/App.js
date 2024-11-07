import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Details from './Details.js'
function App() {

  const [pictureOBJ, setPictureOBJ] = useState({
    "href": "https://images-assets.nasa.gov/image/9248164/collection.json",
    "data": [
      {
        "center": "MSFC",
        "title": "Early Rockets",
        "keywords": [
          "Wright Brothers",
          "Airplane",
          "Kitty Hawk"
        ],
        "nasa_id": "9248164",
        "date_created": "1903-12-17T00:00:00Z",
        "media_type": "image",
        "description": "On December 17, 1903, two brothers from Dayton, Ohio, named Wilbur and Orville Wright, were successful in flying an airplane they built. Their powered aircraft flew for 12 seconds above the sand dunes of Kitty Hawk, North Carolina, making them the first men to pilot a heavier-than-air machine that took off on its own power, remained under control, and sustained flight."
      }
    ],
    "links": [
      {
        "href": "https://images-assets.nasa.gov/image/9248164/9248164~thumb.jpg",
        "rel": "preview",
        "render": "image"
      }
    ]
  })
  const NASAapiCall = async (year, page) => {
    let url = `https://images-api.nasa.gov/search?year_start=${year}&year_end=${year + 1}&page=${page}`
    const response = await fetch(url);
    console.log(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json
  }

  const getImage = async () => {
    let picture = null
    let page = Math.ceil(Math.random() * 100)
    let date = new Date().getFullYear()
    let year = 1900 + Math.floor(Math.random() * (date - 1899))
    let calls = 0;
    while (!picture & calls < 20) {
      calls++;
      const json = await NASAapiCall(year, page)
      if (json.collection.items.length == 0) {
        if (json.collection.metadata.total_hits == 0) {
          year = 1900 + Math.floor(Math.random() * (date - 1899))
          console.log(`New year: ${year}`);
        }
        else {
          for (let link of json.collection.links) {
            if (link.rel == "prev") {
              let max_page = link.href;
              const index = max_page.indexOf("page=")
              max_page = max_page.slice(index + 5)
              console.log(`Max page ${max_page}`)
              page = Math.ceil(Math.random() * (max_page))
            }
          }

        }
      }
      else {
        const numberOfItems = json.collection.items.length
        const item = Math.floor(Math.random() * numberOfItems)
        picture = json.collection.items[item]
      }

    }
    if (picture) {
      const response = await fetch(picture.href);

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      picture.href = json[1]
    }
    setPictureOBJ(picture)

  }
  useEffect(() => { getImage() }, [])


  return (
    <div className="App">
      <h4>Random NASA API picture</h4>
      <hr></hr>
      <h2> {pictureOBJ.data[0].title}</h2>
      <img src={pictureOBJ.href} width="80%" />
      <p>{pictureOBJ.data[0].description}</p>
      <br />
      <Details title="Center" value={pictureOBJ.data[0].center}></Details>
      <Details title="Date Taken" value={pictureOBJ.data[0].date_created}></Details>
      <Details title="Image ID" value={pictureOBJ.data[0].nasa_id}></Details>
      <button onClick={getImage}>Load New Image</button>
      <br />

    </div>
  );
}

export default App;
