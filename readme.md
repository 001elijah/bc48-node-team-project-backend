This is a [Node.js](https://nodejs.org/uk) project.

## Getting Started

There are two repos to run the TaskPro App:

[bc48-node-team-project-backend](https://github.com/001elijah/bc48-node-team-project-backend) — back end.
[bc48-node-team-project-frontend](https://github.com/001elijah/bc48-node-team-project-frontend) — front end.

First ,run the [bc48-node-team-project-backend](https://github.com/001elijah/bc48-node-team-project-backend):

```bash
npm run start:dev
```

Then, run the [bc48-node-team-project-frontend](https://github.com/001elijah/bc48-node-team-project-frontend):

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
front end.

You can start editing the front end page by modifying `src/index.js`. The page
auto-updates as you edit the file.

[API routes] can be accessed on
ex: [http://localhost:3001/api-docs/#/](http://localhost:3001/api-docs/#/) or whatever port.

You can find an env example at `./.env-example`.

The page auto-updates as you edit the project.

Use [Postman](https://www.postman.com/) to try API routes out.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

[API routes] can be accessed on
[http://localhost:3000/api-docs/#/](http://localhost:3000/api-docs/#/).

## Backgrounds

Backgrounds are stored on Cloudinary cloud storage.
Front end fetches backgrounds from back end database, on its turn,
back end fetches them from Cloudinary cloud storage.

To upload new background, you need to have all images for all dimensions:
mobile(x1/x2), tablet(x1/x2), desktop(x1/x2), and thumbnail.
Background file name must correspond to the following format:
ex: "26.jpg" — for actual background,
ex: "26.png" — for background thumbnail.

There are four different folders for every background size:

[background folder](https://console.cloudinary.com/console/c-dac771c9d3ad3069d91c9731631109/media_library/folders/c4715d2de3895384f2a3d84d30ce8d046ehttps://console.cloudinary.com/console/c-dac771c9d3ad3069d91c9731631109/media_library/folders/c4715d2de3895384f2a3d84d30ce8d046e),
[mobile folder](https://console.cloudinary.com/console/c-dac771c9d3ad3069d91c9731631109/media_library/folders/c4715d2de3895384f2a3d84d30ce8d046e),
[tablet folder](https://console.cloudinary.com/console/c-dac771c9d3ad3069d91c9731631109/media_library/folders/c4715dfc7a8924081605076f53bf10f4c6),
[desktop foler](https://console.cloudinary.com/console/c-dac771c9d3ad3069d91c9731631109/media_library/folders/c4715e03c289307a411a1572554dc1ecab),
[thumbnail folder](https://console.cloudinary.com/console/c-dac771c9d3ad3069d91c9731631109/media_library/folders/c4724ae005896ff5ffba1065b1153a6fce).

After background upload to Cloudinary cloud storage, connect to [MongoDB](https://www.mongodb.com/docs/)
and clear "backgrounds" collection in order to make back end to fetch all backgrounds
from Cloudinary cloud storage.

To connect to [MongoDB](https://www.mongodb.com/docs/), use .env-example file at [bc48-node-team-project-backend](https://github.com/001elijah/bc48-node-team-project-backend).

For .env data or Cloudinary backrounds upload ask [001elijah](https://github.com/001elijah).

Finally, enjoy your new backgrounds!

## Learn More

To learn more about React, take a look at the following resources:

-   [Node.js documentation](https://nodejs.org/uk/docs) - learn about Node.js features.
-   [Learn Express](https://expressjs.com/en/guide/routing.html) - an Express tutorial.
-   [Postman website](https://www.postman.com/) - download Postman.
-   [MongoDB documentation](https://www.mongodb.com/docs/) - learn about MongoDB.
-   [React documentation](https://uk.reactjs.org/) - learn about React features.
-   [Learn React](https://uk.reactjs.org/) - a React tutorial.