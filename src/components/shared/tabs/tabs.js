import React, { Component } from 'react';
import Icon from '../../shared/icon/icon';
import './tabs.scss';

class Tabs extends Component {
  state = {
    tabs: this.props.children,
    activeTab: this.props.children[0],
  };

  onTabClick(e, i) {
    this.setState({ activeTab: this.props.children[i] });
  }

  render() {
    const { tabs, activeTab } = this.state;

    if (tabs) {
			return (
				<div className={`tabs ${this.props.tabsClass}`}>
					<ol className="tabs--nav">
						{tabs.map((tab, i) => {
							const classActive = tab.props.id === activeTab.props.id ? 'is-active' : '';
							return (
								<li key={tab.props.tabTitle} className="tabs--nav-item">
									<button className={`tabs--nav-link ${classActive}`} onClick={(e) => this.onTabClick(e, i)}>
										{
											tab.props.iconId &&
											<Icon iconId={tab.props.iconId} iconType={tab.props.iconType} iconClass={tab.props.iconClass} />
										}
										{tab.props.tabTitle}
									</button>
								</li>
							);
						})}
					</ol>
					<div>
						{this.props.children.map((child) => {
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

export default Tabs;
