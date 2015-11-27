all:
	babel src --out-dir dist
	./node_modules/.bin/webpack -p
clean:
	rm dist/*
	rm example/bundle*
