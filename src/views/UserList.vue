<template>
    <div>

        <ul id="list">
            <li v-for=" user in users" :key="user.id" v-on:click="enter(user.name)">
                {{ user.name }}
            </li>
        </ul>
    </div>
</template>
<script>
    import fb from '@/firebase/init';
    export default {
       name:"UserList",
        
        data () {
            return {
                users: [],
                name: this.$route.params.name

            }
        },
        
        created() {
            //creates ne colloection in firebase and orders it by time
            let ref = fb.collection('users').orderBy('name');
            ref.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type == 'added') {
                        let doc = change.doc;
                        
                        this.users.push({
                            id: doc.id,
                            name: doc.data().name
                        });
                    }
                });
            });
        },
        methods:{
            enter: function(partner){
                this.$router.push({name:'Chat', params: {user: this.name , partner: partner } });

            }
        }
    }
</script>
