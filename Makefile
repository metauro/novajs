# example: make pkg=openapi test
.PHONY: test
test:
	jest packages/${pkg}/test/*.test.ts --preset=ts-jest

.PHONY: link
link:
	for dir in packages/*; \
	do \
      cd $$dir; \
      yarn unlink; \
      yarn link; \
      cd ../..; \
    done;

.PHONY: unlink
unlink:
	for dir in packages/*; \
	do \
      cd $$dir; \
      yarn unlink; \
    done;

.PHONY: gen-license
gen-license:
	license -year=2020 -name=metauro -o LICENSE mit; \
	for dir in packages/*; \
    do \
	  cd $$dir; \
	  license -year=2020 -name=metauro -o LICENSE mit; \
	  cd ../../; \
    done;



