# soc_dashboard

## Development setup

Quick start:
- `source init.sh`

What it does:
- Starts `soc_collector` listening on `COLLECTOR_URL`
- Starts `jwt_mock.go` listening on `JWT_URL`
- Starts `soc_dashboard` listening on `http://localhost:8001`

---

The commit pointed to by the `soc_collector` submodule is compatible with `main` in this repo.

---

To populate `soc_collector` with data from `example_data.json`:

```
cat example_data.json | curl -s -u user3:pw3 --data-binary @- ${COLLECTOR_URL}/sc/v0/add
```
