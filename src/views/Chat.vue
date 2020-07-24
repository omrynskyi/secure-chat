
<template>
    <div class="chat container">
        <button type="button" class="btn btn-primary btn-lg btn-block" v-on:click="back()">Back to Users</button>
        <h2 class="text-primary text-center">Secure-Chat with {{this.partner.name}}</h2>
        <h5 class="text-secondary text-center"></h5>
        <div class="card">
            <div class="card-body">
                <p class="nomessages text-secondary" v-if="messages.length == 0">
                    [No messages yet!]
                </p>
                <div class="messages" v-chat-scroll="{always: false, smooth: true}">
                    <div v-for="message in messages" :key="message.id">
                        <span class="text-info">[{{ message.name }}]: </span>
                        <span>{{message.message}}</span>
                        <span class="text-secondary time">{{message.timestamp}}</span>
                    </div>
                </div>
            </div>
            <div class="card-action">
                <CreateMessage v-bind:user="user" v-bind:reciver="partner"/>
            </div>
        </div>
    </div>
</template>
<script>
    import CreateMessage from '@/components/CreateMessage';
    import fb from '@/firebase/init';
    import moment from 'moment';
    import JSEncrypt from 'node-jsencrypt'    

    export default {
        name: 'Chat',
        
        components: {
            CreateMessage
        },
        data() {
            return{
                messages: [],
                user: this.$route.params.user,
                partner: this.$route.params.partner
            }
        },
        created() {
            //creates ne colloection in firebase and orders it by time
            let ref = fb.collection('messages').orderBy('timestamp');
            let user = this.user;
            let partner = this.partner;
            ref.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type == 'added') {
                        let doc = change.doc;
                        //pushes a message object into the array
                        
                        if((doc.data().toId == partner.id && doc.data().sendId == user.id) || (doc.data().toId == user.id && doc.data().sendId == partner.id)){
                                let msg;
                                if(doc.data().toId == user.id){
                                     msg = this.decrypt(doc.data().encyptReciver,user.privateKey)
                                }else if(doc.data().sendId == user.id){
                                     msg = this.dencrypt(doc.data().encryptSender,user.privateKey)

                                }
                                this.messages.push({
                                id: doc.id,
                                name: doc.data().name,
                                message: msg,
                                timestamp: moment(doc.data().timestamp).format('LTS')
                            });
                        }
                        
                    }
                });
            });
        },
        methods:{
            back: function(){
                this.$router.push({name:'UserList', params: {user: this.user } });

            },
             decrypt (content, privateKey) {
                const crypt = new JSEncrypt();
                crypt.setPrivateKey(privateKey);
                return crypt.decrypt(content);
            }
        }
    }
</script>
<style>
.chat h2{
    font-size: 2.6em;
    margin-bottom: 0px;
}

.chat h5{
    margin-top: 0px;
    margin-bottom: 40px;
}

.chat span{
    font-size: 1.2em;
}

.chat .time{
    display: block;
    font-size: 0.7em;
}

.messages{
    max-height: 300px;
    overflow: auto;
}
</style>