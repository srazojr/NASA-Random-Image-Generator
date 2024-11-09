# NASA Random Image Generator
 Display a random image from the NASA api
https://nasa-random-image-generator.pages.dev/
nasa.salvadorrazo.com


1) make a project with npx create-react-app nasa
2) fetch data from https://images-api.nasa.gov/search?year_start=${year}&year_end=${year+1}&page=${page}
3) display results


sample object from api:

{
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
      }