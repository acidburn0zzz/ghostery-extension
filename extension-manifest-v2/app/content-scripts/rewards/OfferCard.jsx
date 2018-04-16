import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import msgModule from '../utils/msg';
import { log } from '../../../src/utils/common';

const msg = msgModule('rewards');
const { sendMessage } = msg;
const { onMessage } = chrome.runtime;

class OfferCard extends Component {
	constructor(props) {
		super(props);
		console.log('constructor props:', props);
		this.state = {
			closed: false,
			copyText: t('rewards_copy_code')
		};

		this.close = this.close.bind(this);
		this.copyCode = this.copyCode.bind(this);
	}

	copyCode() {
		// copy code to clipboard
		document.getElementsByClassName('shadowroot')[0].shadowRoot.querySelector('.reward-code-input').select();
		document.execCommand('copy');

		// 'copied' feedback for user
		this.setState({
			copyText: `${t('rewards_code_copied')}!`
		});

		// prevent multiple clicks
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.setState({
				copyText: t('rewards_copy_code')
			});
		}, 3000);
	}

	close() {
		this.setState({
			closed: true
		});
	}

	render() {
		console.log('render props:', this.props);
		return (
			<div>
				{ this.state.closed !== true &&
				<div className="ghostery-reward-card">
					<div className="reward-card-header">
						<img className="rewards-logo-beta" />
						<div className="reward-card-close" onClick={this.close} />
					</div>
					<div className="reward-content">
						<div className="reward-content-header">
							<div className="reward-company-logo">
								<img src={this.props.reward.companyLogo} />
							</div>
							<div className="reward-settings-kebab" />
						</div>
						<div className="reward-content-img">
							<img src={this.imgSrc} />
						</div>
						<div className="reward-content-detail">
							<span className="reward-benefit">
								{/* { this.state.benefit } */}
							</span>
							<span className="reward-headline">
								{/* {this.state.headline} */}
							</span>
							<p className="reward-description">
								{/* { this.state.description } */}
							</p>
						</div>
						<div onClick={this.copyCode} className="reward-code">
							<input readOnly className="reward-code-input" value={this.props.reward.rewardCode} type="text" />
							<a onClick={this.copyCode}>{this.state.copyText}</a>
						</div>
						<div className="reward-content-footer">
							<span> {t('rewards_expire')} { this.props.reward.expireTime } </span>
							<a target="_blank" href={this.props.reward.termsLink}> { t('rewards_terms_conditions') } </a>
						</div>
						<a target="_blank" href={this.props.reward.redeemLink} className="reward-redeem">
							{t('rewards_redeem_now')}
						</a>
					</div>
					<div className="reward-footer">
						<div className="reward-feedback">
							<div className="reward-smile" />
							<a>{t('rewards_disable')}</a>
							<div className="reward-arrow" />
						</div>
						<div className="reward-ghosty" />
					</div>
				</div>}
			</div>
		);
	}
}

export default OfferCard;