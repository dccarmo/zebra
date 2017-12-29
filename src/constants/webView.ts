// tslint:disable:max-line-length

const webView = `
<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>%@TITLE@% - Visualizando Boleto</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <style type="text/css" media="screen">
		/*! normalize.css v3.0.1 | MIT License | git.io/normalize */

		html {
		    font-family: sans-serif;
		    -ms-text-size-adjust: 100%;
		    -webkit-text-size-adjust: 100%;
		}

		body {
		    margin: 0;
		}

		article,
		aside,
		details,
		figcaption,
		figure,
		footer,
		header,
		hgroup,
		main,
		nav,
		section,
		summary {
		    display: block;
		}

		audio,
		canvas,
		progress,
		video {
		    display: inline-block;
		    vertical-align: baseline;
		}

		audio:not([controls]) {
		    display: none;
		    height: 0;
		}

		[hidden],
		template {
		    display: none;
		}

		a {
		    background: transparent;
		}

		a:active,
		a:hover {
		    outline: 0;
		}

		abbr[title] {
		    border-bottom: 1px dotted;
		}

		b,
		strong {
		    font-weight: bold;
		}

		dfn {
		    font-style: italic;
		}

		h1 {
		    font-size: 2em;
		    margin: 0.67em 0;
		}

		mark {
		    background: #ff0;
		    color: #000;
		}

		small {
		    font-size: 80%;
		}

		sub,
		sup {
		    font-size: 75%;
		    line-height: 0;
		    position: relative;
		    vertical-align: baseline;
		}

		sup {
		    top: -0.5em;
		}

		sub {
		    bottom: -0.25em;
		}

		img {
		    border: 0;
		}

		svg:not(:root) {
		    overflow: hidden;
		}

		figure {
		    margin: 1em 40px;
		}

		hr {
		    -moz-box-sizing: content-box;
		    box-sizing: content-box;
		    height: 0;
		}

		pre {
		    overflow: auto;
		}

		code,
		kbd,
		pre,
		samp {
		    font-family: monospace, monospace;
		    font-size: 1em;
		}

		button,
		input,
		optgroup,
		select,
		textarea {
		    color: inherit;
		    font: inherit;
		    margin: 0;
		}

		button {
		    overflow: visible;
		}

		button,
		select {
		    text-transform: none;
		}

		button,
		html input[type="button"],
		input[type="reset"],
		input[type="submit"] {
		    -webkit-appearance: button;
		    cursor: pointer;
		}

		button[disabled],
		html input[disabled] {
		    cursor: default;
		}

		button::-moz-focus-inner,
		input::-moz-focus-inner {
		    border: 0;
		    padding: 0;
		}

		input {
		    line-height: normal;
		}

		input[type="checkbox"],
		input[type="radio"] {
		    box-sizing: border-box; /* 1 */
		    padding: 0; /* 2 */
		}

		input[type="number"]::-webkit-inner-spin-button,
		input[type="number"]::-webkit-outer-spin-button {
		    height: auto;
		}

		input[type="search"] {
		    -webkit-appearance: textfield;
		    -moz-box-sizing: content-box;
		    -webkit-box-sizing: content-box;
		    box-sizing: content-box;
		}

		input[type="search"]::-webkit-search-cancel-button,
		input[type="search"]::-webkit-search-decoration {
		    -webkit-appearance: none;
		}

		fieldset {
		    border: 1px solid #c0c0c0;
		    margin: 0 2px;
		    padding: 0.35em 0.625em 0.75em;
		}

		legend {
		    border: 0;
		    padding: 0;
		}

		textarea {
		    overflow: auto;
		}

		optgroup {
		    font-weight: bold;
		}

		table {
		    border-collapse: collapse;
		    border-spacing: 0;
		}

		td,
		th {
		    padding: 0;
		}
        </style>

		<style type="text/css" media="screen">
			body {
				background: #F6F9FC;
				color: #333333;
				font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
				height: 100vh;
			}

			.header {
				background: #D0023A;
				color: #FFFFFF;
				height: 64px;
				text-align: center;
				line-height: 64px;
				font-size: 24px;
			}

			h1, h2, h3 {
				font-weight: normal;
			}

			h3 {
				color: #979797;
			}

			a:link,
			a:visited,
			a:hover,
			a:active {
				color: #FF2D46;
				text-decoration:none;
			}

			.content {
				align-items: center;
				display: flex;
				flex-direction: column;
			}

			.card {
				background-color: #FFFFFF;
				border-radius:5px;
				box-shadow: 0px 3px 6px 3px #E7E7E7;
				display: flex;
				flex-direction: column;
				margin: 44px 0;
				overflow: hidden;
				padding: 10px;
				width: 700px;
			}

			.info-box {
				width: 50%;
			}

			.info-box-content {
				font-size: 145%;
			}

			.last-box {
				text-align: right;
			}

			.card-line {
				display: flex;
				justify-content: space-between;
			}

			.typeable-line, .bar-code {
				font-size: 145%;
			}

		</style>
    </head>
    <body>
		<header class="header">
			Zebra
		</header>
		<div class="content">
			<div class="card">
				<div class="card-line">
					<h1>%@TITLE@%</h1>
				</div>
				<div class="card-line">
					<div class="info-box">
						<h3>%@SEGMENT-LABEL@%</h3>
						<p class="info-box-content">%@SEGMENT@%</p>
					</div>
					<div class="info-box last-box">
						<h3>%@BANK-LABEL@%</h3>
						<p class="info-box-content">%@BANK@%</p>
					</div>
				</div>
				<div class="card-line">
					<div class="info-box">
						<h3>%@DUE-DATE-LABEL@%</h3>
						<p class="info-box-content">%@DUE-DATE@%</p>
					</div>
					<div class="info-box last-box">
						<h3>%@AMOUNT-LABEL@%</h3>
						<p class="info-box-content">%@AMOUNT@%</p>
					</div>
				</div>
				<div class="card-line">
					<div>
						<h3>%@TYPEABLE-LINE-LABEL@%</h3>
						<p class="typeable-line">%@TYPEABLE-LINE@%</p>
					</div>
				</div>
				<div class="card-line">
					<div>
						<h3>%@BAR-CODE-LABEL@%</h3>
						<p class="bar-code">%@BAR-CODE@%</p>
					</div>
				</div>
			</div>
		</div>
    </body>
</html>
`;

export default webView;
