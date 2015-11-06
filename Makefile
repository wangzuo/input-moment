all:
	babel src --out-dir dist
	webpack
clean:
	rm dist/*
	rm example/bundle*
