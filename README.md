# soc_dashboard

## Development setup

Env vars:
- `COLLECTOR_URL`
- `JWT_URL`
- `PER_PAGE`

The commit pointed to by the `soc_collector` submodule is compatible with `main` in this repo.

Populate `soc_collector` with data from `example_data.json`:

```
cat example_data.json | curl -s -u user3:pw3 --data-binary @- ${COLLECTOR_URL}/sc/v0/add
```

Get dependencies and start the front end:

```
npm run start
```
