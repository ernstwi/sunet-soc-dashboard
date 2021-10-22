export COUCHDB_USER=couchdb
export COUCHDB_PASSWORD=insecure
export COUCHDB_NAME=test
export COUCHDB_HOSTNAME=localhost
cd soc_collector/docker/
docker compose up -d
sleep 2

cd ../demo/
python ../src/wsgi.py &
cd ../..
go run jwt_mock.go &
sleep 2

export PER_PAGE=2
export COLLECTOR_URL=http://localhost:8000
export JWT_URL=:http://localhost:8080
npm run start
