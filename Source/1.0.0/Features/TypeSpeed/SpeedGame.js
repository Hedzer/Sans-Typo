
//Classes
import Distinct from 'JSUI/Source/1.0.0/Classes/Core/Distinct';

//TypeChecks
import isNumber from 'JSUI/Source/1.0.0/TypeChecks/isNumber';

//Utilities
import exports from 'Parcello/exports';
import now from 'SansTypo/Source/1.0.0/Utilities/Time/now';

const SEC = 1000; //milliseconds per seconds

class SpeedGame extends Distinct {

	begin() {
		if (this.isInProgress || this.hasEnded) { return; }

		this.state('isInProgress', true);
		this.state('startTime', now());
		let timer = setInterval(() => {
			this.trigger('tick', this.elapsedTime);
		}, this.interval);
		this.timer = timer;
		this.trigger('begin');
	}
	end() {
		if (!this.isInProgress || this.hasEnded) { return; }

		clearInterval(this.timer);
		this.state('hasEnded', true);
		this.state('isInProgress', false);
		this.state('stopTime', now());
		this.trigger('end');
	}
	reset() {
		clearInterval(this.timer);
		let defaults = SpeedGame.defaults;
		Object.keys(defaults).forEach((key) => {
			this.state(key, defaults[key]);
		});
	}

	get elapsedTime() {
		let time = now();
		let stop = this.stopTime || time;
		let start = this.startTime || time;
		return  (stop - start || false);
	}
	get elapsedSeconds() {
		let elapsed = this.elapsedTime;
		return Number(isNumber(elapsed) ? (elapsed / SEC).toFixed(this.precision) : 0);
	}
	get precision() {
		return this.state('precision');
	}
	set precision(value) {
		this.state('precision', value);
	}
	get startTime() {
		return this.state('startTime');
	}
	get stopTime() {
		return this.state('stopTime');
	}
	get isInProgress() { 
		return this.state('isInProgress');
	}
	get hasEnded() { 
		return this.state('hasEnded');
	}
	//defaults
	static get defaults() {
		return {
			hasEnded: false,
			isInProgress: false,
			startTime: false,
			stopTime: false,
			elapsedTime: false,
			timer: false,
			interval: 100, //in milliseconds (0.1 seconds)
			precision: 1, //digits
		};
	}

}

export default SpeedGame;

exports(SpeedGame).as('SansTypo/Source/1.0.0/Features/TypeSpeed/SpeedGame');
