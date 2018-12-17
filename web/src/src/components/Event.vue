<template>
    <div
            class="event-block ellipsis pointer"
            @click="showEvent"
            :style="{
            top: `${2*event.start}px`,
            height: `${2*event.duration}px`,
            width: `${constants.EVENT_MAX_WIDTH/amountGroupColumns}px`,
            left: `${constants.TIME_MAX_WIDTH + parentColumn*(constants.EVENT_MAX_WIDTH/amountGroupColumns)}px`,
        }"
    >
        {{ event.title }}
    </div>
</template>

<script>
    import Swal from 'sweetalert2';
    import timeMixin from '../mixins/time';
    import * as constants from '../utils/constants';

    export default {
        mixins: [
            timeMixin,
        ],
        data() {
            return {
                constants,
            };
        },
        props: {
            event: {
                type: Object,
                required: true,
            },
            parentColumn: {
                type: Number,
                required: true,
            },
            amountGroupColumns: {
                type: Number,
                required: true,
            },
        },
        methods: {
            showEvent() {
                Swal({
                    title: this.event.title,
                    text: this.getEventTime(this.event.start, this.event.duration),
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: this.$t('translation.delete'),
                    cancelButtonText: this.$t('translation.close'),
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                        try {
                            await this.$store.dispatch('event/destroy', {id: this.event.id});
                        } catch (e) {
                            let message = this.$t('translation.apiError');

                            if (e.error && e.error.error) {
                                message = e.error.error.errors
                            }

                            Swal.hideLoading();
                            Swal.showValidationMessage(message);
                        }
                    },
                }).then((result) => {
                    if (result.value) {
                        this.$emit('destroyed');

                        Swal(
                            this.$t('translation.deleted'),
                            this.$t('translation.eventDeleted'),
                            'success'
                        )
                    }
                }).catch(null);
            },
        }
    };
</script>
