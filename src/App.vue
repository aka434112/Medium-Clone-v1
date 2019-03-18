<template>
  <div id="app">
    <v-app>
        <v-layout row wrap>
          <v-flex xs12>
            <v-navigation-drawer
            v-model="drawer"
            :mini-variant="mini"
            absolute
            dark
            temporary
          >
            <v-list class="pa-1">
              <v-list-tile v-if="mini" @click.stop="mini = !mini">
                <v-list-tile-action>
                  <v-icon>chevron_right</v-icon>
                </v-list-tile-action>
              </v-list-tile>


              <v-list-tile v-if="!mini" @click.stop="mini = !mini">
                <v-list-tile-action>
                  <v-icon>chevron_left</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>

            <v-list class="pt-0" dense>
              <v-divider light></v-divider>

              <v-list-tile
                v-for="item in items"
                :key="item.title"
                @click="" id="menuItem"
              >
                <v-list-tile-action>
                  <router-link :to=item.toLink :title=item.title><v-icon>{{ item.icon }}</v-icon></router-link>
                </v-list-tile-action>

                <v-list-tile-content>
                  <router-link :to=item.toLink :title=item.description><v-list-tile-title>{{ item.title }}</v-list-tile-title></router-link>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-navigation-drawer>
            <v-toolbar dark color="primary">
              <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>     
              <v-toolbar-title class="white--text">Blog Posts</v-toolbar-title>     
              <v-spacer></v-spacer>
            </v-toolbar>
            <br/>
            <router-view/>
          </v-flex>
        </v-layout>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      mini: false,
      dark: true,
      items: [
        {"icon": "border_color", "title": "View Highligted Words", "toLink": "/highlighted", "description": "View all the highlighted words"},
        {"icon": "message", "title": "Look at Blog Posts", "toLink": "/", "description": "Look at all the Blog Posts"}
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.v-navigation-drawer a:hover{
  color:white !important;
  text-decoration: none;
}
a {
  text-decoration: none;
}
.title{
  font-size: 16px;
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
  font-weight: 450;
}
.author{
  font-size: 13px;
  font-family: "Courier New", Courier, monospace;
}
.content{
  font-size: 15px;
  font-family: "Lucida Console", Monaco, monospace;
}

.postContent{
    height: 60px;
    line-height: 20px;
    overflow: hidden;
}
</style>
