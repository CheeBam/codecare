<template>
    <div class="container">
        <div class="row">
            <div v-if="progress" class="loading"></div>
            <div class="col">
                <div class="card">
                    <div class="card-title pt-3 text-center">
                        <h3 class="calendar-title">{{ $t("translation.calendar") }}</h3>
                        <button class="float-right mr-2 btn btn-success" type="button" @click="createEvent">{{
                            $t("translation.createEvent") }}
                        </button>
                    </div>
                </div>
                <div class="card mt-2">
                    <div class="card-body">
                        <div class="col">
                            <times
                                    v-for="(item, key) in times"
                                    :key="key"
                                    :time="item"
                                    :wholeHour="key % 2 === 0"
                            >
                            </times>
                            <div
                                    v-for="(chunk, key, index) in eventsData" :key="index"
                            >
                                <event
                                        v-for="(item, key2, index2) in chunk.data"
                                        :key="index2"
                                        :event="item"
                                        :parentColumn="key"
                                        :amountGroupColumns="rows[item.row]"
                                        @destroyed="showEvents"
                                >
                                </event>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    /* eslint no-undef: 0 */
    import Swal from 'sweetalert2';
    import eventMixin from '../mixins/event';
    import timeMixin from '../mixins/time';
    import Event from '../components/Event';
    import Times from '../components/Time'; // 'Time' is reserved
    import * as constants from '../utils/constants';

    export default {
        metaInfo() {
            return {
                title: this.$t('translation.calendar'),
            };
        },
        components: {
            Event,
            Times,
        },
        mixins: [eventMixin, timeMixin],
        data() {
            return {
                constants,
                progress: false,
                times: [],
                rows: [],
                eventsData: [],
            };
        },
        async mounted() {
            this.times = this.getTimes(constants.TIMES_START_TIME, constants.TIMES_MAX_MINUTES, constants.TIMES_STEP_MINUTES);
            this.showEvents();
        },
        methods: {
            async showEvents() {
                this.progress = true;
                let counter = 0;
                let sum = 0;
                const groups = [];
                const newData = [{data: [], lastTime: -1}];

                try {
                    await this.$store.dispatch('event/index');
                } catch (e) {
                    this.progress = false;
                    console.error(e);
                }

                const checkGroup = (group, item, num) => {
                    if (group.lastTime < item.start) {
                        group.data.push(item);
                        group.lastTime = item.start + item.duration;

                        if (groups[item.row] === undefined) {
                            groups[item.row] = new Set();
                        }

                        groups[item.row].add(num);

                        return true;
                    }
                    return false;
                };

                this.eventList
                    .map((item) => {
                        if (sum <= item.start) {
                            counter++;
                        }

                        sum = item.start + item.duration;
                        item.row = counter;

                        return item;
                    })
                    .forEach(item => {
                        let group = 0;

                        while (!checkGroup(newData[group], item, group)) {
                            group++;

                            if (!newData[group]) {
                                newData.push({data: [], lastTime: -1});
                            }
                        }
                    });

                this.rows = groups.map(item => item.size);

                this.eventsData = _.cloneDeep(newData);
                this.progress = false;
            },
            createEvent() {
                Swal.mixin({
                    input: 'text',
                    confirmButtonText: 'Next &rarr;',
                    showCancelButton: true,
                    progressSteps: ['1', '2', '3']
                }).queue([
                    {
                        title: this.$t('translation.enterTitle'),
                        inputValidator: value => !value && this.$t('translation.titleRequired')
                    },
                    {
                        title: `${this.$t('translation.enterStart')} (08:00)`,
                        input: 'text',
                        inputValidator: value => !value && this.$t('translation.startRequired'),
                    },
                    {
                        title: this.$t('translation.chooseDuration'),
                        input: 'range',
                        inputAttributes: {
                            min: 1,
                            max: constants.EVENT_MAX_TIME_MINUTES,
                            step: 1
                        },
                        inputValue: 30,
                    },
                ]).then((result) => {
                    if (result.value) {
                        Swal({
                            title: 'Creating...',
                            allowOutsideClick: () => !Swal.isLoading(),
                            onBeforeOpen: async () => {
                                Swal.showLoading();

                                try {
                                    await this.$store.dispatch('event/store', {
                                        params: {
                                            title: result.value[0],
                                            start: result.value[1],
                                            duration: result.value[2],
                                        }
                                    });

                                    Swal.hideLoading();
                                    this.showEvents();

                                    Swal(
                                        this.$t('translation.success'),
                                        this.$t('translation.eventCreated'),
                                        'success'
                                    ).catch(null);
                                } catch (e) {
                                    let message = this.$t('translation.apiError');

                                    if (e.error && e.error.error) {
                                        message = e.error.error.errors
                                    }

                                    Swal.hideLoading();
                                    Swal.showValidationMessage(message);
                                }
                            },
                        })
                    }
                })
            }
        }
    };
</script>
