package mongo

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func connectToMongo() {
	mongoBase := "mongodb+srv://"
	mongoUsername := "flask_user"
	mongoPwd := "aIMZOxzqI3pGL8jX"
	mongoUri := "flasklink.az1x6.mongodb.net"
	mongoFragments := "flaskDb?retryWrites=true&w=majority"
	mongoUrl := mongoBase + mongoUsername + ":" + mongoPwd + "@" + mongoUri + "/" + mongoFragments
	fmt.Printf("Booting up webserver and connecting to mongoDB\n")
	client, err := mongo.NewClient(options.Client().ApplyURI(mongoUrl))
	if err != nil {
		fmt.Print("❌  Connection unsuccessful: ", err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		fmt.Print("❌  Connection unsuccessful: ", err)
	}
	client.Disconnect(ctx)
	fmt.Printf("✔️  Connection successful")
}