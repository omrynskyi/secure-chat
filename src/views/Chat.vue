
<template>
    <div class="chat container">
        <h2 class="text-primary text-center">Secure-Chat with {{partner}}</h2>
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
                <CreateMessage :user="user"/>
            </div>
        </div>
    </div>
</template>
<script>
    import CreateMessage from '@/components/CreateMessage';
    import fb from '@/firebase/init';
    import moment from 'moment';    
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
            ref.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type == 'added') {
                        let doc = change.doc;
                        //pushes a message object into the array
                        this.messages.push({
                            id: doc.id,
                            name: doc.data().name,
                            message: doc.data().message,
                            timestamp: moment(doc.data().timestamp).format('LTS')
                        });
                    }
                });
            });
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