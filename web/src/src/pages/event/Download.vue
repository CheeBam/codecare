<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">
                        {{ $t("translation.downloadEvents") }}
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12">
                                <form @submit.prevent="create">
                                    <div class="form-group">
                                        <label for="file">{{ $t("translation.chooseJsonFile") }}</label>
                                        <input ref="file" type="file" class="form-control-file" accept=".json" id="file" @change="processFile($event)">
                                    </div>
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
    import Swal from 'sweetalert2';
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
                file: null,
                progress: false,
            };
        },
        beforeDestroy() {
            this.authPassword = null;
        },
        methods: {
            async processFile() {
                let file = this.$refs.file.files[0];

                if (file) {
                    let reader = new FileReader();
                    reader.readAsText(file, 'UTF-8');

                    reader.onload = async (e) => {
                        try {
                            await this.$store.dispatch('event/downloadJson', {
                                params: {
                                    file: e.target.result,
                                }
                            });

                            Swal(
                                this.$t('translation.success'),
                                this.$t('translation.eventsDownload'),
                                'success'
                            ).then((result) => {
                                if (result.value) {
                                    this.$router.push({ name: 'calendar' });
                                }
                            }).catch(null);
                        } catch (e) {
                            Swal(
                                this.$t('translation.error'),
                                e.error && e.error.error ? e.error.error.errors : this.$t('translation.apiError'),
                                'error',
                            );
                        }
                    }
                }

            },
        },
    };
</script>
