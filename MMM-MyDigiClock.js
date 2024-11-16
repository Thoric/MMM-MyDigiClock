Module.register("MMM-MyDigiClock", {
	// Module config defaults.
	defaults: {
		showDate: true,
		showTime: true,
		dateFormat: "ddd, ll",
		timezone: "canada/saskatchewan",
	},

	// Define required scripts.
	getScripts: function() {
		return ["moment.js", "moment-timezone.js"];
	},

	// Define styles.
	getStyles: function() {
		return ["MMM-MyDigiClock.css"];
	},

    // Define start sequence.
    start: function() {
        Log.info(`Starting module: ${this.name}`);
        moment.locale(config.language);
        
        // Update the clock every second
        setInterval(() => {
            this.updateDom(); // Refresh the DOM to update the time
        }, 10 * 1000);
    },

    // Override dom generator.
    getDom: function() {
        const wrapper = document.createElement("div");
        wrapper.classList.add("MyDigiClock-grid");

        const dateWrapper = document.createElement("div");
        const clockFormatWrapper = document.createElement("div"); // Wrapper for time and background text
        const timeWrapper = document.createElement("div");
        const clockBackground = document.createElement("div"); // Div for 8888

        dateWrapper.className = "MyDigiClock-date"; // Use 'MyDigiClock-date'
        clockFormatWrapper.className = "MyDigiClock-face"; // Class for clock format
        timeWrapper.className = "MyDigiClock-time"; // Class for time display
        clockBackground.className = "MyDigiClock-background"; // Updated class for background text

        const now = moment();
        if (this.config.timezone) {
            now.tz(this.config.timezone);
        }

        dateWrapper.innerHTML = now.format(this.config.dateFormat);
        timeWrapper.innerHTML = now.format(`HHmm`); // Display current time
        clockBackground.innerHTML = "8888"; // Set the background text

        if (this.config.showDate) {
            wrapper.appendChild(dateWrapper);
        }

        if (this.config.showTime) {
            clockFormatWrapper.appendChild(timeWrapper);
            clockFormatWrapper.appendChild(clockBackground); // Append the clock background div
            wrapper.appendChild(clockFormatWrapper); // Append the clock format wrapper
        }

        return wrapper;
    }
});
