import { createGlobalStyle } from 'styled-components/macro';

const Reset = createGlobalStyle`
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big,
	cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd,
	ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details,
	embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
		border: 0;
		font: inherit;
		font-size: 100%;
		-webkit-font-smoothing: antialiased;
		margin: 0;
		padding: 0;
		-webkit-text-size-adjust: 100%;
		vertical-align: baseline;
	}

	body {
		overflow-x: hidden;
		width: 100%;
	}

	article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
		display: block;
	}

	button {
		cursor: pointer;
	}

	ol,
	ul {
		list-style: none;
	}

	b,
	strong {
		font-weight: 700;
	}

	i,
	em {
		font-style: italic;
	}

	blockquote,
	q {
		quotes: none;
	}

	blockquote::before,
	blockquote::after,
	q::before,
	q::after {
		content: '';
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	img {
		display: inline-block;
		margin: auto;
		max-width: 100%;

		td & {
			width: 100%;
		}
	}

	/* Resets on the reset to restore default behaviour */
	sup {
		vertical-align: super;
	}

	sub,
	sup {
		font-size: 0.625rem;
		line-height: 1;
	}
`;

export default Reset;
