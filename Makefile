.PHONY: build
build: build-js build-types

.PHONY: check
check: lint test build check-package.json

.PHONY: build-js
build-js: setup
	bun run ./script/build-js.ts

.PHONY: build-types
build-types: setup
	bun x -- bun-dx --package typescript tsc -- --project ./tsconfig.build.json

.PHONY: test
test: setup
	bun test
	bun run ./test/example.ts

.PHONY: lint
lint: lint-biome lint-tsc lint-readme

.PHONY: lint-biome
lint-biome: setup
	bun x -- bun-dx --package @biomejs/biome biome -- check

.PHONY: lint-tsc
lint-tsc: setup
	bun x -- bun-dx --package typescript tsc -- --noEmit --project .
	bun x -- bun-dx --package typescript tsc -- --noEmit --project ./test/tsconfig.json

.PHONY: lint-readme
lint-readme:
	bun x -- bun-dx --package readme-cli-help readme-cli-help -- -- check

.PHONY: format
format: setup
	bun x -- bun-dx --package @biomejs/biome biome -- check --write
	bun x -- bun-dx --package readme-cli-help readme-cli-help -- -- update

.PHONY: check-package.json
check-package.json: build
	bun x -- bun-dx --package @cubing/dev-config package.json -- check

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
prepublishOnly: clean check build
