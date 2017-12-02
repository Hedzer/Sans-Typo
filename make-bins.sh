#!/bin/bash
rm -r Release
cp -r build Release
cp -r Assets Release
cp index.html Release
cp package.json Release

if [ -x "$(command -v nwbuild)" ]; then
	npm install nw-builder -g
fi

nwbuild -p win32,win64,osx64,linux32,linux64 Release -o bin -f
mv bin/sans-typo/* bin
rm -r bin/sans-typo