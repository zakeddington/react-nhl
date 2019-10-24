import React, {Component} from 'react';
import CONSTANTS from '../../../config/Constants';
import Icon from '../../shared/icon/icon';
import PlayerPhoto from '../../shared/player-photo/player-photo';
import './period-summary.scss';

class PeriodSummary extends Component {
	renderShootoutPlays(period) {
    return period.shootoutPlays.map((play, index) => {
      return (
        <div key={index} className="period-summary-item">
          <div className="period-summary-logo">
            <Icon iconId={play.teamId} iconType={CONSTANTS.iconType.logo}/>
          </div>
          <div className="period-summary-time"/>
          <div className="period-summary-photo">
            <PlayerPhoto playerId={play.shooter.id} />
          </div>
          <div className="period-summary-player-info">
						<span className="period-summary-player">
							<span className="period-summary-name">{play.shooter.name}{play.shooter.desc ? ',' : ''}</span>
							<span className="period-summary-goal-desc">{play.shooter.desc}</span>
						</span>
          </div>
          <div className="period-summary-game-info">
						<span className={`period-summary-score team-${play.teamId} no-border`}>
							{
                play.isGoal ? <span className="team-background">{play.shotResult}</span> :
                  <span>{play.shotResult}</span>
              }
						</span>
          </div>
        </div>
      )
    });
	}

	renderContent(data) {
		let periods = data.map((period) => {
			if (period.shootoutPlays.length) {
				let shootoutPlays = this.renderShootoutPlays(period);
				return (
					<div key={period.periodName} className="period-summary-period">
						<h3 className="period-summary-title">{period.periodName}</h3>
						{shootoutPlays}
					</div>
				)
			}
			let goals = period.goals.map((goal) => {
				return (
					<div key={goal.time} className="period-summary-item">
						<div className="period-summary-logo">
							<Icon iconId={goal.teamId} iconType={CONSTANTS.iconType.logo} />
						</div>
						<div className="period-summary-time">{goal.time}</div>
						<div className="period-summary-photo">
							<PlayerPhoto playerId={goal.scorer.id} />
						</div>
						<div className="period-summary-player-info">
							<span className="period-summary-player">
								<span className="period-summary-name">{goal.scorer.name} ({goal.scorer.total}),</span>
								<span className="period-summary-goal-desc">
								{goal.scorer.desc}
								{
									goal.isEmptyNet &&
									" (Empty Net)"
								}
								</span>
								{
									goal.goalType !== 'EVEN' &&
									<span className="period-summary-goal-type">
										{goal.goalType}
									</span>
								}
							</span>
							<span className="period-summary-details">
								{
                  goal.assists.map((assist, i) => {
										return (
											<span key={assist.name}>
												{assist.name} ({assist.total}){i < goal.assists.length - 1 && ', '}
											</span>
										)
									})
								}
							</span>
						</div>
						<div className="period-summary-game-info">
							<span className={`period-summary-score team-${goal.teamId} team-border`}>
								<span className={goal.score.away.isScoringTeam ? 'team-background' : ''}>{goal.score.away.name} {goal.score.away.goals}</span>
								<span className={goal.score.home.isScoringTeam ? 'team-background' : ''}>{goal.score.home.name} {goal.score.home.goals}</span>
							</span>
						</div>
					</div>
				)
			});

			if (!goals.length) {
				goals =
					<div className="period-summary-item">
						<div className="period-summary-empty">No Goals</div>
					</div>;
			}

			let penalties = period.penalties.map((penalty, i) => {
				return (
					<div key={`${penalty.time}-${i}`} className="period-summary-item">
						<div className="period-summary-logo">
							<Icon iconId={penalty.teamId} iconType={CONSTANTS.iconType.logo} />
						</div>
						<div className="period-summary-time">{penalty.time}</div>
						<div className="period-summary-photo">
							<PlayerPhoto playerId={penalty.penaltyOn.id} />
						</div>
						<div className="period-summary-player-info">
							<span className="period-summary-player">
								<span className="period-summary-name">{penalty.penaltyOn.name}</span>
							</span>
							<span className="period-summary-details">{penalty.penaltyMin} Minutes for {penalty.penaltyType}</span>
						</div>
						<div className="period-summary-game-info" />
					</div>
				)
			});

			if (!penalties.length) {
				penalties =
					<div className="period-summary-item">
						<div className="period-summary-empty">No Penalties</div>
					</div>;
			}

			return (
				<div key={period.periodName} className="period-summary-period">
					<h3 className="period-summary-title">{period.periodName}</h3>
					<div className="period-summary-subtitle">Goals</div>
					{goals}
					<div className="period-summary-subtitle">Penalties</div>
					{penalties}
				</div>
			)
		});

		return (
			<div className="period-summary">
				<h2 className="header-title">Period Summary</h2>
				{periods}
			</div>
		);
	}

  renderNoContent() {
    return (
      <h2 className="error-msg">No period summary available.</h2>
    );
  }

	render() {
		let data = this.props.periodSummary;

		if (data.length || Object.keys(data).length) {
      if (data.error) {
        return this.renderNoContent();
      }
			return this.renderContent(data);
		}

		return null;
	}
}

export default PeriodSummary;
