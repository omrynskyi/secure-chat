<template>
    <div>
        {{name}}
        <ul id="list">
            <li v-for=" user in list" :key="user" v-on:click="enter(user)">
                {{ user }}
            </li>
        </ul>
    </div>
</template>
<script>
    
    export default {
       name:"UserList",
        
        data () {
            return {
                list: this.$route.params.userList,
                name: this.$route.params.name

            }
        },
        methods:{
            enter: function(partner){
                this.$router.push({name:'Chat', params: {user: this.name , partner: partner } });

            }
        }
    }
</script>
