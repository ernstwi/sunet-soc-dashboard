package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT")
		w.Header().Set("Access-Control-Allow-Headers", "Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		auth := r.Header.Get("Authorization")
		if auth != "Basic dXNyOnB3ZA==" { // btoa("usr:pwd")
			w.WriteHeader(http.StatusUnauthorized)
			return
		}

		fmt.Fprint(w, "{\"access_token\": \"JWT_TOKEN_PLACEHOLDER\"}")
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}
