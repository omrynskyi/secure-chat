<template>
    <div class="container" style="margin-bottom: 30px">
        <form @submit.prevent="createMessage">
            <div class="form-group">
                <input type="text" name="message" class="form-control" placeholder="Enter message ..." v-model="newMessage">
                <p class="text-danger" v-if="errorText">{{ errorText }}</p>
            </div>

            <button class="btn btn-primary" type="submit" name="action" >Submit</button>
        </form>
    </div>
</template>
<script>
    import fb from '@/firebase/init';
    import JSEncrypt from 'node-jsencrypt'  

    export default {
        name: 'CreateMessage',
        props: ['user', 'reciver'],
        data(){
            return {
                newMessage: null,
                errorText: null
            }
        },
        methods: {
            createMessage () {
                
                if (this.newMessage) {
                    var encryptReciver = this.encrypt(this.newMessage, this.reciver.publicKey);
                    var encryptSender = this.encrypt(this.newMessage,this.user.publicKey);
                    console.log(this.reciver);
                    fb.collection('messages').add({
                        encryptSender: encryptSender,
                        encryptReciver: encryptReciver,
                        name: this.user.name,
                        sendId: this.user.id,
                        timestamp: Date.now(),
                        toId: this.reciver.id
                    }).catch(err => {
                        console.error(err);
                    });
                    this.newMessage = null;
                    this.errorText = null;
                } else {
                    this.errorText = "A message must be entered!"
                }
            },
            encrypt (content, publicKey) {
                const crypt = new JSEncrypt();
                crypt.setPublicKey(publicKey);
                return crypt.encrypt(content);
            }


        }
    }
</script>