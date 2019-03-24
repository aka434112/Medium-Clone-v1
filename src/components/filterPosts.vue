<template>
    <v-layout row wrap>
      <v-flex xs12>
      <div v-for="post in posts">
        <v-card>
          <v-card-title>
            <div class="text-xs-left">
              <div  class="title" v-html="post.title"></div>
              <div  class="author" v-html="post.author"></div><br/>
              <div class="content postContent" v-html="post.content"></div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" @click="goToPost(post.ID)">Read More &nbsp;<v-icon>more</v-icon></v-btn>
          </v-card-actions>
        </v-card>
        <br/>
      </div>
      </v-flex>
    </v-layout>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      dialogAdd: false,
      title: "",
      content: "",
      author: "",
      postID: 0,
      queries: []
    }
  },
  computed: {
    posts: function () {
      let that = this
      let postsArray = JSON.parse(JSON.stringify( that.$store.getters.posts ))
      postsArray = postsArray.filter((obj)=>{
          return obj.author.includes(that.$store.getters.searchFilter) || obj.content.includes(that.$store.getters.searchFilter) ||obj.title.includes(that.$store.getters.searchFilter)
      })
      let query = '<span style="background-color: rgb(248, 232, 21);">'+that.$store.getters.searchFilter+"</span>"
      let length = query.length
      postsArray.forEach(function(element){
        if(element.content.includes(query)){
          let position = element.content.indexOf(query)
          element.content = element.content.substr(0, position).replace(/<[^>]*>/g, '')+query+element.content.substr(position+length).replace(/<[^>]*>/g, '')
          if(position>=200){
            element.content = element.content.substr(position-200)
          }
        }
        else if(element.content.includes(that.$store.getters.searchFilter)){
          let position = element.content.indexOf(that.$store.getters.searchFilter)
          element.content = element.content.substr(0, position).replace(/<[^>]*>/g, '')+'<span style="background-color: rgb(248, 232, 21);">'+query+"</span>"+element.content.substr(position+that.$store.getters.searchFilter.length).replace(/<[^>]*>/g, '')
          if(position>=200){
            element.content = element.content.substr(position-200)
          }
        }
      })
      return postsArray
    }
  },
  methods: {
    goToPost (postID) {
      this.$router.push('/post/'+postID)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>