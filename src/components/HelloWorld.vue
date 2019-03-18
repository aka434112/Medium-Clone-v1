<template>
    <v-layout row wrap>
    <v-btn color="info" @click="dialogAdd = !dialogAdd">Add a new post</v-btn><br/><br/><br/>
        <v-dialog v-model="dialogAdd" persistent max-width="600px">
          <v-card>
          <v-card-title>
            <span class="headline">Add a new post</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="title" label="Blog Title*" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="author" label="Blog Author*" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    label="Blog Content*"
                    required
                    v-model="content"
                  ></v-textarea>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialogAdd = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="addPost()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-flex xs11>
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
      return this.$store.getters.posts
    }
  },
  methods: {
    addPost () {
      this.postID += 1
      let post = {"author": 'By '+this.author, "content": this.content, "title": this.title, "ID": this.postID}
      this.$store.dispatch("addPost", post);
      this.content = ""
      this.author = ""
      this.title = ""
      this.dialogAdd = false;
    },
    goToPost (postID) {
      this.$router.push('/post/'+postID)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
