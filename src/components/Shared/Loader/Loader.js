import React from 'react';
import { LoaderStyled, LoaderCircle1, LoaderCircle2, LoaderCircle3 } from './LoaderStyled';

function Loader() {
	return (
		<LoaderStyled>
			<LoaderCircle1 />
			<LoaderCircle2 />
			<LoaderCircle3 />
		</LoaderStyled>
	)
}

export default Loader;
