# XMeme

## Project Description
This app is built for designing and deploying a simple webpage where users can post and see memes.

## Prerequisites
This project requires NodeJS (version 8 or later) and NPM. Node and NPM are really easy to install. To make sure you have them available on your machine, try running the following command.
`$ npm -v && node -v
6.4.1
v8.16.0`

To install and set up the library, run:
`npm install -g npm`

Now initiate it by the following command:
`npm init start`

After this we install the dependecies that are:
    body-parser
    ejs
    express
    json
    meanie-mongoose-to-json
    mongoose
    request
    
    `npm install body-parser
    npm install ejs
    npm install express
    npm install json
    npm install meanie-mongoose-to-json
    npm install mongoose
    npm install request`

## Serving the App : 
`npm run dev`

## Flows
1. Users will post Memes by providing these inputs
   -- Name of the person posting the meme
   --Caption for the Meme
   --URL of the Meme image

2. Users will view the latest 100 memes posted 
  -- If they post a new meme, it will get listed. Note that these submitted memes will be shown one below the other.
  -- Each meme should display the name of the meme maker, the caption for the meme and the image pulled from the meme URL.
  
##  Mandatory Requirements
1. The backend shall be capable of receiving the posted meme inputs from the frontend and store them in a database.
2. The backend shall be capable of fetching the list of memes from the database and send them to the frontend.
3. The interaction between the frontend and backend shall be based on a REST API with support for the below 3 endpoints.
4. Endpoint to send a meme to the backend

  -- HTTP Method - POST

  -- Endpoint - /memes

  --Json Body contains these inputs - name, url, caption

  --The backend should allocate a unique id for the meme and return it as a json response.

  --Example request and sample response

`curl --location --request POST 'http://localhost:8081/memes' \

--header 'Content-Type: application/json' \

--data-raw '{

"name": "shalika sinha",

"url": "https://images.pexels.com/photos/3573382/pexels-photo-3573382.jpeg",

"caption": "This is a meme"

}'`

Endpoint to fetch the latest 100 memes created from the backend
HTTP Method - GET
Endpoint - /memes
Error:
If there are no memes available, an empty array shall be returned.
Example request
`curl --location --request GET 'http://localhost:8081/memes'`



Endpoint to specify a particular id (identifying the meme) to fetch a single Meme.
HTTP Method - GET
Endpoint - /memes/<id>
Error:
If a meme with that Id doesn’t exist, a 404 HTTP response code should be returned.
Example request and sample response
`curl --location --request GET 'http://localhost:8081/memes/<id>'`
     
The database shall be designed to store and retrieve the meme content.

The Frontend shall have a form at the top which can be used by users to post memes with these fields - Name of the meme creator, Caption for the meme and URL of the meme image. It shall send these inputs to the backend.

The Frontend shall list the latest 100 memes posted, either in the lower section of the page (below the form) or on a separate page. It shall fetch these details from the backend.

Each meme shall list these three fields one below the other - Name of the meme creator, the caption for the meme, the image fetched from the meme URL.

Display memes in the reverse chronological order i.e. last created one first.
    
    
