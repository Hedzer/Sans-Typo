
//Classes
import Distinct as 'JSUI/Source/1.0.0/Classes/Core/Distinct';

//TypeChecks
import isNumber from 'JSUI/Source/1.0.0/TypeChecks/isNumber';

//Utilities
import exports from 'Parcello/exports';

const SEC = 1000; //milliseconds per seconds

class SpeedGame extends Distinct {

	startTimer() {
		this.startTime = new Date().getTime();
		this.timer = setInterval(() => {
			this.trigger('tick', this.elapsedTime);
		}, this.interval);
	}
	stopTimer() {
		this.stopTime = new Date().getTime();
		clearInterval(this.timer);
		// trigger one last tick in case stoppage happened between ticks
		this.trigger('tick', this.elapsedTime);
	}
	reset() {
		let defaults = SpeedGame.defaults;
		Object.keys(defaults).forEach((key) => {
			this[key] = defaults[key];
		});
	}

	get elapsedTime() {
		let now = new Date().getTime();
		let stop = this.stopTime || now;
		let start = this.startTime || now;
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


	//defaults
	static get defaults() {
		return {
			startTime: false,
			stopTime: false,
			elapsedTime: false,
			timer: false,
			interval: 100, //in milliseconds (0.1 seconds)
			precision: 1, //digits
		};
	}

}

exports(SpeedGame).as('SansTypo/Source/1.0.0/Features/TypeSpeed/SpeedGame');
