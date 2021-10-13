# soc_dashboard

## Development setup

Run `soc_collector` on port 8000. The commit pointed to by the `soc_collector` submodule is compatible with `main` in this repo.

Populate `soc_collector` with data from `example_data.json`:

```
cat example_data.json | curl -s -u user3:pw3 --data-binary @- http://localhost:8000/sc/v0/add
```

Get dependencies and start the front end:

```
npm run start
```
