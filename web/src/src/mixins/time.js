import { DateTime } from 'luxon';
import * as constants from '../utils/constants'

export default {
    data() {
        return {
            constants,
        };
    },
    methods: {
        /**
         * Fill timeline
         *
         * @param {string} start
         * @param {number} end
         * @param {number} step
         */
        getTimes(start, end, step) {
            const startTime = DateTime.fromFormat(start, 'HH:mm');
            const times = [];

            for (let i = 0; i <= end; i += step) {
                times.push({
                    value: i,
                    time: startTime.plus({ minutes: i }).toFormat('HH:mm'),
                })
            }

            return times;
        },

        /**
         * Return event 'start time - end time'
         *
         * @param {number} start
         * @param {number} duration
         */
        getEventTime(start, duration) {
            const startTime = DateTime.fromFormat(constants.TIMES_START_TIME, 'HH:mm');
            const eventStartTime = startTime.plus({ minutes: start });

            return `${eventStartTime.toFormat('HH:mm')} - ${eventStartTime.plus({ minutes: duration }).toFormat('HH:mm')}`;
        }
    },
}
