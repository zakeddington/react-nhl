import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../Shared/Loader/Loader';
import PlayerPhoto from '../../Shared/PlayerPhoto/PlayerPhoto';
import Modal from '../../Shared/Modal/Modal';
import PlayerDetail from '../../../containers/PlayerDetail';
import { HeaderTitle } from '../../../globalStyles/Typography/Typography';
import { Offscreen } from '../../../globalStyles/Utilities/Utilities'
import {
	StyledStars,
	StarsContent,
	StarsPlayer,
	StarsPlayerName,
	StarsPlayerTeam,
	StarsPlayerStat,
} from './StarsStyle';

function renderContent(starsArray) {

	let stars = starsArray.map((star) => {
		const { id, name, stat1, stat2, teamName } = star;

		return (
			<StarsPlayer key={Math.random()}>
				<Modal content={<PlayerDetail playerId={id} />} modalClass="player-detail">
					<PlayerPhoto playerId={id}/>
					<Offscreen>Open player details for {name} in modal window</Offscreen>
				</Modal>
				<StarsPlayerName>
					<Modal content={<PlayerDetail playerId={id} />} modalClass="player-detail">
						{name}
					</Modal>
					<StarsPlayerTeam>{teamName}</StarsPlayerTeam>
				</StarsPlayerName>
				<StarsPlayerStat>{stat1}</StarsPlayerStat>
				<StarsPlayerStat>{stat2}</StarsPlayerStat>
			</StarsPlayer>
		)
	});

	return (
		<StyledStars>
			<HeaderTitle>Stars of the Game</HeaderTitle>
			<StarsContent>
				{stars}
			</StarsContent>
		</StyledStars>
	);
}

function Stars(props) {
	const {
		showLoader,
		showNoResults,
		isPreview,
		stars,
	} = props;
	let content;

	if (showLoader) {
		content = <Loader />;
	} else {
		if (showNoResults || isPreview) {
			content = '';
		} else {
			content = renderContent(stars);
		}
	}

	return(
		<>
			{content}
		</>
	)
}

Stars.propTypes = {
	showLoader: PropTypes.bool,
	showNoResults: PropTypes.bool,
	isPreview: PropTypes.bool,
	stars: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		stat1: PropTypes.string,
		stat2: PropTypes.string,
		teamName: PropTypes.string,
	})),
}

export default Stars;
