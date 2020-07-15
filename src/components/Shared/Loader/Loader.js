import React from 'react';
import { StyledLoader, LoaderCircle1, LoaderCircle2, LoaderCircle3 } from './LoaderStyle';

function Loader() {
	return (
		<StyledLoader>
			<LoaderCircle1 />
			<LoaderCircle2 />
			<LoaderCircle3 />
		</StyledLoader>
	)
}

export default Loader;
