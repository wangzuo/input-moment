all:
	babel src --out-dir dist
	webpack -p
clean:
	rm dist/*
	rm example/bundle*
