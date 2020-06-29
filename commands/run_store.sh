#!/bin/sh
sudo docker run -d --name grpc_store -p 40041:40041 --network grpc-net --env-file ./.env asyl/store-grpc