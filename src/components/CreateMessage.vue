<template>
    <div class="container" style="margin-bottom: 30px">
        <form @submit.prevent="createMessage">
            <div class="form-group">
                <input type="text" name="message" class="form-control" placeholder="Enter message ..." v-model="newMessage">
                <p class="text-danger" v-if="errorText">{{ errorText }}</p>
            </div>

            <button class="btn btn-primary" type="submit" name="action">Submit</button>
        </form>
    </div>
</template>
<script>
    import fb from '@/firebase/init';

    export default {
        name: 'CreateMessage',
        props: ['user'],
        data(){
            return {
                newMessage: null,
                errorText: null
            }
        },
        methods: {
            createMessage () {
                if (this.newMessage) {
                    fb.collection('messages').add({
                        message: this.newMessage,
                        name: this.user,
                        timestamp: Date.now()
                    }).catch(err => {
                        console.error(err);
                    });
                    this.newMessage = null;
                    this.errorText = null;
                } else {
                    this.errorText = "A message must be entered!"
                }
            }
        }
    }
</script>