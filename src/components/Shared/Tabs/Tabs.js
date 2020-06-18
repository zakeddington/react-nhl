import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import './Tabs.scss';

class Tabs extends Component {
	state = {
		activeTab: React.Children.toArray(this.props.children)[0],
	};

	tabs = null;

	onTabClick(e, i) {
		this.setState({activeTab: this.tabs[i]});
	}

	render() {
		this.tabs = React.Children.toArray(this.props.children);
		const { activeTab } = this.state;
		const tabsClass = this.props.tabsClass ? this.props.tabsClass : '';

		if (this.tabs) {
			return (
				<div className={`tabs ${tabsClass}`}>
					<ol className="tabs--nav">
						{this.tabs.map((tab, i) => {
							const classActive = tab.props.id === activeTab.props.id ? 'is-active' : '';
							return (
								<li key={tab.props.tabTitle} className="tabs--nav-item">
									<button className={`tabs--nav-link ${classActive}`} onClick={(e) => this.onTabClick(e, i)}>
										{
											tab.props.iconId &&
											<Icon iconId={tab.props.iconId} iconType={tab.props.iconType} iconClass={tab.props.iconClass}/>
										}
										{tab.props.tabTitle}
									</button>
								</li>
							);
						})}
					</ol>
					<div>
						{this.tabs.map((child) => {
							const classActive = child.props.id === activeTab.props.id ? 'is-active' : '';
							return (
								<div key={child.props.id} className={`tabs--content ${classActive}`}>{child}</div>
							);
						})}
					</div>
				</div>
			);
		}

		return null;
	}
}

Tabs.propTypes = {
	children: PropTypes.node,
	tabsClass: PropTypes.string,
}

export default Tabs;
