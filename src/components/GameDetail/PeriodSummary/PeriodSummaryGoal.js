import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components/macro';
import { IconType } from '../../../config/ImageIconConfig';
import Icon from '../../Shared/Icon/Icon';
import PlayerPhoto from '../../Shared/PlayerPhoto/PlayerPhoto';
import Modal from '../../Shared/Modal/Modal';
import PlayerDetail from '../../../containers/PlayerDetail';
import {
	PeriodItem,
	TeamLogoColumn,
	TimeColumn,
	PlayerPhotoColumn,
	PlayDetailsColumn,
	DetailsRow,
	PlayerName,
	PlayerShotType,
	PlayerGoalType,
	SecondaryDetails,
	StatusColumn,
	GameStatus,
	TeamScore,
} from './PeriodSummaryStyled';
import { Offscreen } from '../../../globalStyles/Utilities/Utilities';
import { ThemeContext } from '../../../globalStyles/Themes/ThemeContext';

function PeriodSummaryGoal(props) {
	const {
		time,
		isEmptyNet,
		goalType,
		teamId,
		awayScore,
		homeScore,
		scorer,
		assists,
	} = props;

	return (
		<PeriodItem>
			<TeamLogoColumn>
				<Icon iconId={`${teamId}`} iconType={IconType.logo} />
			</TeamLogoColumn>
			<TimeColumn>{time}</TimeColumn>
			<PlayerPhotoColumn>
				<Modal content={<PlayerDetail playerId={scorer.id} />} modalClass="player-detail">
					<PlayerPhoto playerId={scorer.id} />
					<Offscreen>Open player details for {scorer.name} in modal window</Offscreen>
				</Modal>
			</PlayerPhotoColumn>
			<PlayDetailsColumn>
				<DetailsRow>
					<PlayerName>
						<Modal content={<PlayerDetail playerId={scorer.id} />} modalClass="player-detail">
							{scorer.name}
							<Offscreen>Open player details for {scorer.name} in modal window</Offscreen>
						</Modal> ({scorer.total}),
					</PlayerName>
					<PlayerShotType className="period-summary-goal-desc">
						{scorer.desc}
						{
							isEmptyNet &&
							" (Empty Net)"
						}
					</PlayerShotType>
					{
						goalType !== 'EVEN' &&
						<PlayerGoalType>
							{goalType}
						</PlayerGoalType>
					}
				</DetailsRow>
				<DetailsRow>
					{
						assists.map((assist, i) => {
							return (
								<SecondaryDetails key={assist.name}>
									<Modal content={<PlayerDetail playerId={assist.id} />} modalClass="player-detail">
										{assist.name}
										<Offscreen>Open player details for {assist.name} in modal window</Offscreen>
									</Modal> ({assist.total}){i < assists.length - 1 && ', '}
								</SecondaryDetails>
							)
						})
					}
				</DetailsRow>
			</PlayDetailsColumn>
			<StatusColumn>
				<ThemeContext.Consumer>
					{
						(contextState) => (
							<ThemeProvider theme={contextState.themes[teamId]}>
								<GameStatus>
									<TeamScore $isScoringTeam={awayScore.isScoringTeam}>{awayScore.name} {awayScore.goals}</TeamScore>
									<TeamScore $isScoringTeam={homeScore.isScoringTeam}>{homeScore.name} {homeScore.goals}</TeamScore>
								</GameStatus>
							</ThemeProvider>
						)
					}
				</ThemeContext.Consumer>
			</StatusColumn>
		</PeriodItem>
	)
}

PeriodSummaryGoal.propTypes = {
	time: PropTypes.string,
	isEmptyNet: PropTypes.bool,
	goalType: PropTypes.string,
	teamId: PropTypes.number,
	awayScore:  PropTypes.shape({
		name: PropTypes.string,
		goals: PropTypes.number,
		isScoringTeam: PropTypes.bool,
	}),
	homeScore:  PropTypes.shape({
		name: PropTypes.string,
		goals: PropTypes.number,
		isScoringTeam: PropTypes.bool,
	}),
	scorer: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		total: PropTypes.number,
		desc: PropTypes.string,
	}),
	assists: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		total: PropTypes.number,
	})),
}

export default PeriodSummaryGoal;
