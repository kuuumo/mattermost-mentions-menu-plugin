.PHONY: all install build package clean dev deploy

all: package

install:
	cd webapp && npm install

build: install
	cd webapp && npm run build

package: build
	mkdir -p dist
	tar -czf dist/mattermost-mentions-menu-plugin.tar.gz plugin.json webapp/dist/main.js

clean:
	rm -rf webapp/dist
	rm -rf dist

dev:
	cd webapp && npm run dev

deploy: package
	@echo "Upload dist/mattermost-mentions-menu-plugin.tar.gz to your Mattermost server"
	@echo "Access System Console > Plugins Management > Upload Plugin"
