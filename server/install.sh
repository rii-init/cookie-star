#!/bin/bash

# get current working directory
INSTALL_DIR="$(pwd)";

# modify ultr7a.com.service using ^^^
sed -i -o "s|INSTALL_DIR|$INSTALL_DIR|" ultr7a.com.service

# modify service.sh using ^^^
sed -i -o "s|INSTALL_DIR|$INSTALL_DIR|" service.sh

cp ./ultr7a.com.service /etc/systemd/system/uwu.ultr7a.com.service