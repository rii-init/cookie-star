#!/bin/bash

cd INSTALL_DIR;
cd client;

if [-z "$1"]; then
        nohup npm run up;
else 
    if [ "$1" = "status" ]; then
        tail -f nohup.out
    else
        kill $(pidof ultr7a.com)
    fi 
fi
