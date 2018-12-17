<template>
    <div
            class="row time-block"
            :class="[wholeHour ? 'time-delimiter time-block-large' : 'time-block-small']"
    >
        {{ time.time }}
    </div>
</template>

<script>
    export default {
        props: {
            time: {
                type: Object,
                required: true,
            },
            wholeHour: {
                type: Boolean,
                required: true,
            }
        },
    };
</script>
