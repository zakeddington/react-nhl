import React from 'react';
import CONSTANTS from '../../../config/Constants';
import Loader from '../../shared/loader/loader';
import Icon from '../../shared/icon/icon';
import ErrorMessage from '../../shared/error/error-message';
import './game-header.scss';

function GameHeader(props) {
	const data = props.gameDetail;
	let content;

	if (data.length || Object.keys(data).length) {
		if (data.showNoResults) {
			content = <ErrorMessage errorMsg="No game details available."/>;
		} else {
			content =
				<>
					<h1
						className="offscreen">{data.date} : {data.teams.away.name} {data.teams.away.score} - {data.teams.home.name} {data.teams.home.score}</h1>
					<div className="col game-header-date-info">
						<span className="game-header-date">{data.date}</span>
						{
							data.isPreview &&
							<span className="game-header-time">{data.gameStatus}</span>
						}
					</div>
					<div className="col game-header-team away">
						<Icon iconId={data.teams.away.id} iconType={CONSTANTS.iconType.logo}/>
						<div className="game-header-team-info">
							<span className="game-header-city">{data.teams.away.city}</span>
							<span className="game-header-name">{data.teams.away.name}</span>
							<span className="game-header-record">{data.teams.away.record}</span>
						</div>
						{
							!data.isPreview &&
							<div className="game-header-score">{data.teams.away.score}</div>
						}
					</div>
					<div className="col game-header-team home">
						<Icon iconId={data.teams.home.id} iconType={CONSTANTS.iconType.logo}/>
						<div className="game-header-team-info">
							<span className="game-header-city">{data.teams.home.city}</span>
							<span className="game-header-name">{data.teams.home.name}</span>
							<span className="game-header-record">{data.teams.home.record}</span>
						</div>
						{
							!data.isPreview &&
							<div className="game-header-score">{data.teams.home.score}</div>
						}
					</div>
				</>;
		}
	} else {
		content = <Loader/>;
	}

	return (
		<header className="game-header">
			{content}
		</header>
	)
}

export default GameHeader;
