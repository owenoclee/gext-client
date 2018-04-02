<template>
    <div class="post-container">
        <div class="post">
            <p class="post-head">
                <span v-if="hasSubject" class="post-subject" v-text="post.getSubject()"/>
                <span class="post-date" v-text="date"/>
                <router-link :to="url" :exact="exact">No.</router-link><span class="post-id" v-text="post.getId()"/>
            </p>
            <pre v-if="hasBody" class="post-body" v-text="post.getBody()"/>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        props: ['post'],
        computed: {
            hasSubject() { return this.post.getSubject() !== '' },
            hasBody() { return this.post.getBody() !== '' },
            moment() { return moment.unix(this.post.getCreatedAt()) },
            dateDiff() { return this.moment.fromNow() },
            date() { return this.moment.format('YYYY/MM/DD HH:mm:ss') },
            url() {
                if (this.post.getReplyTo() === 0)
                    return '/' + this.post.getBoard() + '/thread/' + this.post.getId();
                return '/' + this.post.getBoard() + '/thread/' + this.post.getReplyTo() + '#' + this.post.getId();
            },
        },
    };
</script>
