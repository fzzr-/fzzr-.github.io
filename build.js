#!/usr/bin/env node

var uncss = require('uncss')
var csso = require('csso');
var glob = require('glob')
var fs = require('fs')

var stylesheetLocation = '_site/assets/'
var stylesheetName = 'main.css'
var sourceStylesheetLocation = 'assets/'

var jekyll_opt_css = function () {
	var css = fs.readFileSync(stylesheetLocation + stylesheetName, 'utf8')

	glob('_site/**/*.html', function (err, files) {
		if (err) {
			console.log(err)
		}

		uncss(files, {
			raw: css,
			ignoreSheets: [/\/css\//]
		}, function (err, output) {
			if (err) {
				console.log(err)
			} else {
				var outpath = sourceStylesheetLocation + stylesheetName;

				// minify:
				var ast = csso.syntax.parse(output);
				var compressedAst = csso.compress(ast).ast;
				var output = csso.syntax.generate(compressedAst);

				console.log("output path: " + outpath);
				fs.writeFileSync(outpath, output);
			}
		})
	})
}

jekyll_opt_css()
