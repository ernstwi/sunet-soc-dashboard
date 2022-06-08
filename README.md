# soc_dashboard

This is the front end to [soc_collector](https://git.sunet.se/soc_collector.git/).

## Configuration

The following env vars are required:

| | |
|-|-|
| `PER_PAGE`      | How many results to display per page in main list view               |
| `COLLECTOR_URL` | Where to access soc_collector backend                                |
| `JWT_URL`       | Where to find JWT issuer (currently a fork of SUNET/auth-server-poc) |

An example configuration is supplied in `.env`, which corresponds to the default config in soc_collector.

## Dependencies

- `envsubst`, which is part of GNU gettext. On macOS, this is available at `brew install gettext`.

## Commands

| | |
|-|-|
| `npm run start`     | Compile and start Parcel development server with hot reloading |
| `npm run build`     | Only compile, normally not used except in Docker workflow      |
| `docker-compose up` | Compile and serve from dockerized nginx (production setup)     |

## Explanation of env var injection

You might notice that both `npm run start` and `Dockerfile` contain a step which takes env vars and creates a file `inject.js`. With the default `.env` config `inject.js` looks like this:

```
window.injectedEnv = {
    PER_PAGE: "5",
    COLLECTOR_URL: "https://localhost:1443",
    JWT_URL: "http://localhost:8000/api/v1.0/auth"
};
```

We need this workaround since we are building static code which runs in a browser. References to `process.env` are baked into the compiled code at build time rather than accessed dynamically at runtime (how could they be?). So to enable use of a prebuilt Docker image with env vars supplied at runtime, we add this runtime-step which takes the local environment and "compiles" it (using `envsubst`, see [Dependencies](#dependencies)) to `inject.js`. The code running in a browser can then access our env vars at e.g. `window.injectedEnv.PER_PAGE`.

**Note that our env vars are very visible, so you should not put any secrets in here!**

This also requires us to tell Parcel to leave references to `inject.js` alone, since we will compile this file outside of Parcel. We do this using `parcel-resolver-ignore` which is enabled in `.parcelrc` and configured in `package.json`.

## Misc notes

- soc_collector exists as a submodule to this repo, with the idea that this is the latest version of soc_collector which is compatible and tested with the main branch of soc_dashboard.
- In `package.json`, `dependenciesComments` is just a random key not used by npm which we use since there are no comments in JSON.

## Todo

- Filters `domain` and `asn_country_code` do not work with backend
- Filters are exact match, I think we want substring or prefix
