<template>
    <form @submit.prevent="checkAndSubmit">
        <input v-model="board" type="text" placeholder="Board" required maxlength="16">
        <input v-model="subject" type="text" placeholder="Subject" maxlength="32">
        <textarea v-model="message" placeholder="Message" rows="4" maxlength="4000"/>
        <input type="submit" value="Submit">
        <ul class="errors">
            <li v-for="error in errors" :key="error" v-text="error"/>
        </ul>
    </form>
</template>

<script>
    import axios from 'axios';
    import { PostRequest } from '../network/post_request_pb';
    import { uri } from '../cfg/server.json';

    export default {
        data() {
            return {
                errors: [],
                board: '',
                subject: '',
                message: '',
            }
        },
        methods: {
            checkAndSubmit() {
                this.errors = [];
                if (this.board === '')
                    this.errors.push('Board is required');
                if (this.subject === '' && this.message === '')
                    this.errors.push('You must provide either subject, body, or both');

                if (this.errors.length === 0)
                    this.submit();
            },
            submit() {
                const post = new PostRequest();
                post.setBoard(this.board);
                post.setSubject(this.subject);
                post.setBody(this.message);

                axios.post(uri + '/threads', post.serializeBinary(), {
                    responseType: 'arraybuffer',
                    headers: {'Content-Type': 'application/vnd.google.protobuf'},
                }).then(response => this.$router.push(response.headers.location));

                this.board = '';
                this.subject = '';
                this.message = '';
            },
        },
    };
</script>
