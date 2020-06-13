import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerDetailService from '../services/PlayerDetail/PlayerDetailService';
import ErrorMessage from '../components/Shared/ErrorMessage/ErrorMessage';
import PlayerDetailHero from '../components/PlayerDetail/PlayerDetailHero/PlayerDetailHero';
import PlayerDetailStats from '../components/PlayerDetail/PlayerDetailStats/PlayerDetailStats';

class PlayerDetail extends Component {
	state = {
		showLoader: true,
		dataPlayerDetailHero: {},
		dataPlayerDetailStats: [],
		dataPlayerPosition: '',
		isPlayerDetailHeroError: false,
		isPlayerDetailStatsError: false,
	};

	fetchPlayerDetail(playerId) {
		return (async () => {
			try {
				const data = await PlayerDetailService.getPlayerData(playerId);

				let {
					dataPlayerDetailHero,
					dataPlayerDetailStats,
					dataPlayerPosition,
					isPlayerDetailHeroError,
					isPlayerDetailStatsError,
				} = this.state;

				try {
					dataPlayerDetailHero = await PlayerDetailService.processPlayerDetailHeroData(data);
				} catch (error) {
					console.error(error);
					isPlayerDetailHeroError = true;
				}

				try {
					const statsResults = await PlayerDetailService.processPlayerDetailStats(data);
					dataPlayerPosition = statsResults.playerPosition;
					dataPlayerDetailStats = statsResults.playerDetailStatsByType;
				} catch (error) {
					console.error(error);
					isPlayerDetailStatsError = true;
				}

				this.setState({
					showLoader: false,
					dataPlayerDetailHero,
					dataPlayerDetailStats,
					dataPlayerPosition,
					isPlayerDetailHeroError,
					isPlayerDetailStatsError,
				});

			} catch (error) {
				console.error(error);
				this.setState({
					showLoader: false,
					isPlayerDetailHeroError: true,
					isPlayerDetailStatsError: true,
				});
			}
		})();
	}

	componentDidMount() {
		const { playerId } = this.props;
		this.fetchPlayerDetail(playerId);
	}

	render() {
		const { isFullPage } = this.props;
		const {
			showLoader,
			dataPlayerDetailHero,
			dataPlayerDetailStats,
			dataPlayerPosition,
			isPlayerDetailHeroError,
			isPlayerDetailStatsError,
		} = this.state;
		let content;
		let containerClass = isFullPage ? 'site-content container bg-white' : '';

		if (isPlayerDetailHeroError && isPlayerDetailStatsError) {
			content = <ErrorMessage errorMsg="No player details available." />;
		} else {
			content =
				<>
					<PlayerDetailHero
						showLoader={showLoader}
						showNoResults={isPlayerDetailHeroError}
						playerDetailHero={dataPlayerDetailHero} />
					<PlayerDetailStats
						showLoader={showLoader}
						showNoResults={isPlayerDetailStatsError}
						playerPosition={dataPlayerPosition}
						playerDetailStatsByType={dataPlayerDetailStats} />
				</>
		}

		return (
			<div className={containerClass}>
				{content}
			</div>
		)
	}
}

PlayerDetail.propTypes = {
	playerId: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	isFullPage: PropTypes.bool,
}

export default PlayerDetail;
