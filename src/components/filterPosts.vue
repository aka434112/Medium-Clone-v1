<template>
    <v-layout row wrap>
      <v-flex xs12>
      <div v-for="post in posts">
        <v-card>
          <v-card-title>
            <div class="text-xs-left">
              <div  class="title" v-html="post.title"></div>
              <div  class="author" v-html="post.author">}</div><br/>
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
      return that.$store.getters.posts.filter((obj)=>{
          return obj.author.includes(that.$store.getters.searchFilter) || obj.content.includes(that.$store.getters.searchFilter) ||obj.title.includes(that.$store.getters.searchFilter)
      })
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