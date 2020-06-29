#!/bin/sh
sudo docker run -d --name grpc_auth -p 50051:50051 --network grpc-net --env-file ./.env asyl/auth-grpc 