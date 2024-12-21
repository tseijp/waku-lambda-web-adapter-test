# Makefile
BUILD_DIR=${PWD}

install:
	rm -rf node_modules
	npm install

build:
	npm run build

artifacts:
	# Copy essential files for deployment
	cp -r dist node_modules package.json startServer.mjs run.sh $(ARTIFACTS_DIR)

	$(eval ARCHIVE_PATH=$(shell npm pack))
	tar -xzvf "$(ARCHIVE_PATH)"

	ln -s /tmp/cache $(ARTIFACTS_DIR)/cache

	# Create deployment zip
	cd $(ARTIFACTS_DIR) && zip -ry ${BUILD_DIR}/lambdaFunctionSrc.zip .
	rm -rf "$(ARTIFACTS_DIR)"
	mv ${BUILD_DIR}/lambdaFunctionSrc.zip "$(ARTIFACTS_DIR)"

build-WakuFunction: install build artifacts
