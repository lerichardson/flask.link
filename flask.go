package main

import (
	"html/template"
	"net/http"
	"os"
	"mongo"
)

var tpl = template.Must(template.ParseFiles("./public/index.html"))

type redirData struct {
	Title string
	url   string
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	tpl.Execute(w, nil)
}
func redirectionHandler(w http.ResponseWriter, r *http.Request) {
	tpl.Execute(w, nil)
}
func main() {
	mongo.connectToMongo()
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/", indexHandler)
	mux.HandleFunc("/redirect", redirectionHandler)
	fsAssets := http.FileServer(http.Dir("assets"))
	mux.Handle("/assets/", http.StripPrefix("/assets/", fsAssets))
	http.ListenAndServe(":"+port, mux)
}
