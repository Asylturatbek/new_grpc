#!/bin/sh
sudo docker run -d --name config-svc -p 60061:60061 --network grpc-net --env-file ./.env asyl/config-svc 