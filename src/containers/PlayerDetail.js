import React, { Component } from 'react';
import PlayerDetailService from '../services/PlayerDetail/PlayerDetailService';
import ErrorMessage from '../components/Shared/ErrorMessage/ErrorMessage';
import PlayerDetailHero from '../components/PlayerDetail/PlayerDetailHero/PlayerDetailHero';
import PlayerDetailStats from '../components/PlayerDetail/PlayerDetailStats/PlayerDetailStats';

class PlayerDetail extends Component {
	state = {
		showLoader: true,
		dataPlayerInfo: {},
		dataStats: [],
		dataPlayerPosition: '',
		isPlayerInfoError: false,
		isStatsError: false,
	};

	fetchPlayerDetail(playerId) {
		return (async () => {
			try {
				const data = await PlayerDetailService.getPlayerData(playerId);

				let {
					dataPlayerInfo,
					dataStats,
					dataPlayerPosition,
					isPlayerInfoError,
					isStatsError,
				} = this.state;

				try {
					dataPlayerInfo = await PlayerDetailService.processPlayerInfo(data);
				} catch (error) {
					console.error(error);
					isPlayerInfoError = true;
				}

				try {
					const statsResults = await PlayerDetailService.processPlayerStats(data);
					dataPlayerPosition = statsResults.playerPosition;
					dataStats = statsResults.playerStatsByType;
				} catch (error) {
					console.error(error);
					isStatsError = true;
				}

				this.setState({
					showLoader: false,
					dataPlayerInfo,
					dataStats,
					dataPlayerPosition,
					isPlayerInfoError,
					isStatsError,
				});

			} catch (error) {
				console.error(error);
				this.setState({
					showLoader: false,
					isPlayerInfoError: true,
					isStatsError: true,
				});
			}
		})();
	}

	componentDidMount() {
		const { playerId } = this.props;
		this.fetchPlayerDetail(playerId);
	}

	render() {
		const {
			showLoader,
			dataPlayerInfo,
			dataStats,
			dataPlayerPosition,
			isPlayerInfoError,
			isStatsError,
		} = this.state;
		let content;

		if (isPlayerInfoError && isStatsError) {
			content = <ErrorMessage errorMsg="No player details available." />;
		} else {
			content =
				<>
					<PlayerDetailHero
						showLoader={showLoader}
						showNoResults={isPlayerInfoError}
						playerInfo={dataPlayerInfo} />
					<PlayerDetailStats
						showLoader={showLoader}
						showNoResults={isStatsError}
						playerPosition={dataPlayerPosition}
						playerStatsByType={dataStats} />
				</>
		}



		// TODO: update class so it can be used outside modal
		// need modal css somewhere



		return (
			<div className="modal--content">
				{content}
			</div>
		)
	}
}

export default PlayerDetail;
