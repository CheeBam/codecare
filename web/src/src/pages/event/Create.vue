<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">
                        {{ $t("translation.createEvent") }}
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div v-if="progress" class="loading"></div>
                            <div class="col-12">
                                <form @submit.prevent="create">
                                    <div class="form-group">
                                        <label for="title">
                                            {{ $t("translation.title") }}
                                        </label>
                                        <input
                                                id="title"
                                                v-model="eventTitle"
                                                type="text"
                                                class="form-control"
                                                :class="{ 'is-invalid': errors.has('title') }"
                                                name="title"
                                                v-validate="'required|max:255'"
                                                data-vv-validate-on="none"
                                                autofocus
                                        >
                                        <div v-show="errors.has('title')" class="invalid-feedback">
                                            {{ errors.first('title') }}
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="start">
                                            {{ $t("translation.start") }} <i>(08:00)</i>
                                        </label>
                                        <input
                                                id="start"
                                                v-model="eventStart"
                                                type="text"
                                                class="form-control"
                                                :class="{ 'is-invalid': errors.has('start') }"
                                                name="start"
                                                v-validate="'required'"
                                                data-vv-validate-on="none"
                                        >
                                        <div v-show="errors.has('start')" class="invalid-feedback">
                                            {{ errors.first('start') }}
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="duration">
                                            {{ `${$t("translation.duration")} (${$t("translation.inMinutes")})` }}
                                        </label>
                                        <input
                                                id="duration"
                                                v-model="eventDuration"
                                                type="number"
                                                class="form-control"
                                                :class="{ 'is-invalid': errors.has('duration') }"
                                                name="duration"
                                                v-validate="'required'"
                                                data-vv-validate-on="none"
                                        >
                                        <div v-show="errors.has('duration')" class="invalid-feedback">
                                            {{ errors.first('duration') }}
                                        </div>
                                    </div>
                                    <button
                                            type="submit"
                                            class="btn btn-success"
                                            :disabled="this.progress"
                                    >
                                        {{ $t("translation.create") }}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import authMixin from '../../mixins/auth';
    import eventMixin from '../../mixins/event';

    export default {
        mixins: [
            authMixin,
            eventMixin,
        ],
        metaInfo() {
            return {
                title: this.$t('translation.createEvent'),
            };
        },
        data() {
            return {
                progress: false,
            };
        },
        beforeDestroy() {
            this.authPassword = null;
        },
        methods: {
            async create() {
                const valid = await this.$validator.validateAll();

                if (valid) {
                    this.progress = true;

                    try {
                        await this.$store.dispatch('event/store', {
                            params: {
                                title: this.eventTitle,
                                start: this.eventStart,
                                duration: this.eventDuration,
                            }
                        });

                        this.progress = false;

                        this.$router.push({ name: 'calendar' });
                    } catch (e) {
                        this.progress = false;
                    }
                }
            },
        },
    };
</script>
