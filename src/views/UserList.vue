<template>
    
    <div>
         <div class="bouge">
            <div class="btn btn-info">
                Logged in as:{{this.user.name}}
            </div>
        </div>    
        <div class="boite">

        <ul class="list-group">
            <li class="list-group-item" v-for=" user in users" :key="user.id" v-on:click="enter(user)">
                {{ user.name }}
            </li>
        </ul>
    </div>
    </div>
</template>
<script>
    import fb from '@/firebase/init';
    export default {
       name:"UserList",
        

        data () {
            return {
                users: [],
                user: this.$route.params.user

            }
        },
        
        created() {
            //creates ne colloection in firebase and orders it by time
            let ref = fb.collection('users').orderBy('name');
            ref.onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type == 'added') {
                        let doc = change.doc;
                        if(this.user.id != doc.id){
                            this.users.push({
                            id: doc.id,
                            name: doc.data().name,
                            privateKey: doc.data().privateKey,
                            publicKey: doc.data().publicKey
                        });
                        }
                        
                    }
                });
            });
        },
        methods:{
            enter: function(partner){
                this.$router.push({name:'Chat', params: {user: this.user , partner: partner } });

            }
        }
    }
</script>
<style scoped lang="css">

.boite {
    color: rgb(rgb(0, 255, 234))
}
li {
    list-style-type: none; 
    background-color : rgb(131, 131, 131);
    background-repeat : no-repeat;
    background-position: left center;
    padding-left : 1%; 
    margin-left : 30%;
    margin-right : 5%;
    width : 40%;
    height: 5%;
    margin-top: 10px;
    }
.bouge{
    padding-left: 1%;
    margin-right: 80%;

}
</style>
