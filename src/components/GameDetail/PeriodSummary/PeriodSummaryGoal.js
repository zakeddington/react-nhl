import React from 'react';
import PropTypes from 'prop-types';
import CONSTANTS from '../../../config/Constants';
import Icon from '../../Shared/Icon/Icon';
import PlayerPhoto from '../../Shared/PlayerPhoto/PlayerPhoto';
import Modal from '../../Shared/Modal/Modal';
import PlayerDetail from '../../../containers/PlayerDetail';
import './PeriodSummary.scss';

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
		<div className="period-summary-item">
			<div className="period-summary-logo">
				<Icon iconId={`${teamId}`} iconType={CONSTANTS.iconType.logo}/>
			</div>
			<div className="period-summary-time">{time}</div>
			<div className="period-summary-photo">
				<Modal content={<PlayerDetail playerId={scorer.id} />} modalClass="player-detail">
					<PlayerPhoto playerId={scorer.id}/>
					<span className="offscreen">Open player details for {scorer.name} in modal window</span>
				</Modal>
			</div>
			<div className="period-summary-player-info">
				<span className="period-summary-player">
					<span className="period-summary-name">
						<Modal content={<PlayerDetail playerId={scorer.id} />} modalClass="player-detail">
							{scorer.name}
							<span className="offscreen">Open player details for {scorer.name} in modal window</span>
						</Modal> ({scorer.total}),
					</span>
					<span className="period-summary-goal-desc">
					{scorer.desc}
						{
							isEmptyNet &&
							" (Empty Net)"
						}
					</span>
					{
						goalType !== 'EVEN' &&
						<span className="period-summary-goal-type">
							{goalType}
						</span>
					}
				</span>
				<span className="period-summary-details">
					{
						assists.map((assist, i) => {
							return (
								<span key={assist.name}>
									<Modal content={<PlayerDetail playerId={assist.id} />} modalClass="player-detail">
										{assist.name}
										<span className="offscreen">Open player details for {assist.name} in modal window</span>
									</Modal> ({assist.total}){i < assists.length - 1 && ', '}
								</span>
							)
						})
					}
				</span>
			</div>
			<div className="period-summary-game-info">
				<span className={`period-summary-score team-${teamId} team-border`}>
					<span
						className={awayScore.isScoringTeam ? 'team-background' : ''}>{awayScore.name} {awayScore.goals}</span>
					<span
						className={homeScore.isScoringTeam ? 'team-background' : ''}>{homeScore.name} {homeScore.goals}</span>
				</span>
			</div>
		</div>
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
