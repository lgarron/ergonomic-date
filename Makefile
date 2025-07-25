.PHONY: build
build: build-js build-types

.PHONY: build-js
build-js: setup
	bun run ./script/build-js.ts

.PHONY: build-types
build-types: setup
	bun x tsc --project ./tsconfig.build.json

.PHONY: test
test: setup
	bun test
	bun run ./test/example.ts

.PHONY: lint
lint: lint-biome lint-tsc lint-readme

.PHONY: lint-biome
lint-biome: setup
	bun x @biomejs/biome check

.PHONY: lint-tsc
lint-tsc: setup
	bun x tsc --noEmit --project .
	bun x tsc --noEmit --project ./test/tsconfig.json

.PHONY: lint-readme
lint-readme:
	bun x readme-cli-help --check-only --fence "ts example" "cat test/example.ts"

.PHONY: format
format: setup
	bun x @biomejs/biome check --write
	bun x readme-cli-help --fence "ts example" "cat test/example.ts"

.PHONY: setup
setup:
	bun install --frozen-lockfile

.PHONY: clean
clean:
	rm -rf ./.temp ./dist

.PHONY: reset
reset: clean
	rm -rf ./node_modules

.PHONY: publish
publish:
	npm publish

.PHONY: prepublishOnly
prepublishOnly: lint test clean build
