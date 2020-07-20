import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Shared/Icon/Icon';
import { IconType } from '../../config/ImageIconConfig';
import './StandingsTables.scss';

function renderStandingsTable(standingsName, division) {
	const {
		divisionName,
		isWildCard,
		teams,
	} = division;

	const classWildCard = isWildCard ? 'is-wildcard' : '';

	return (
		<div key={`${standingsName}-${divisionName}`} className={`stats-table standings-tables--division ${classWildCard}`}>
			<table>
				<thead>
				<tr>
					<th className="text-left" colSpan="2">{divisionName}</th>
					<th className="tooltip">GP <span className="tooltip-content">Games Played</span></th>
					<th className="tooltip">W <span className="tooltip-content">Wins (2pts)</span></th>
					<th className="tooltip">L <span className="tooltip-content">Losses (0pts)</span></th>
					<th className="tooltip">OT <span className="tooltip-content">Overtime/Shootout Loss (1pt)</span></th>
					<th className="tooltip">PTS <span className="tooltip-content">Points</span></th>
				</tr>
				</thead>
				<tbody>
				{
					teams.map((team) => {
						return (
							<tr key={team.name}>
								<td>{team.rank}</td>
								<td className="standings-tables--team text-left">
									<Icon iconId={`${team.id}`} iconType={IconType.logo} />
									<span className="standings-tables--team-name">{team.name}</span>
								</td>
								<td>{team.games}</td>
								<td>{team.wins}</td>
								<td>{team.losses}</td>
								<td>{team.ot}</td>
								<td>{team.points}</td>
							</tr>
						)
					})
				}
				</tbody>
			</table>
		</div>
	)
}

function StandingsTables(props) {
	const {
		standingsName,
		standings,
	} = props;

	return (
		<>
			{
				standings.map((conference) => {
					return (
						<div key={`${standingsName}-${conference.conferenceName}`} className="standings-tables">
							<h2>{conference.conferenceName}</h2>
							{
								conference.divisions.map((division) => {
									return renderStandingsTable(standingsName, division)
								})
							}
						</div>
					)
				})
			}
		</>
	)
}

StandingsTables.propTypes = {
	standingsName: PropTypes.string,
	standings: PropTypes.arrayOf(PropTypes.shape({
		conferenceName: PropTypes.string,
		divisions: PropTypes.arrayOf(PropTypes.shape({
			divisionName: PropTypes.string,
			isWildCard: PropTypes.bool,
			teams: PropTypes.arrayOf(PropTypes.shape({
				games: PropTypes.number,
				id: PropTypes.number,
				losses: PropTypes.number,
				name: PropTypes.string,
				ot: PropTypes.number,
				points: PropTypes.number,
				rank: PropTypes.number,
				wins: PropTypes.number,
			})),
		})),
	})),
}

export default StandingsTables;
