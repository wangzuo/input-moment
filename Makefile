all:
	./node_modules/.bin/webpack -p
	./node_modules/.bin/lessc --clean-css src/less/input-moment.less dist/input-moment.css
clean:
	rm dist/*
	rm example/bundle*
