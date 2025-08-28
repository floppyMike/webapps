SRC_DIR ?= src
BUILD_DIR ?= site

.PHONY: all build clean

all: build

build:
	@printf "Generating site: '%s' -> '%s'\n" "$(SRC_DIR)" "$(BUILD_DIR)"
	@rm -rf "$(BUILD_DIR)"
	@mkdir -p "$(BUILD_DIR)"
	@cp -r "$(SRC_DIR)" "$(BUILD_DIR)/webapps"
	@find "$(BUILD_DIR)" -type f -name '*.html' -print0 | xargs -0 -n1 python gen.py
