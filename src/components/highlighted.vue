<template>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div class="text-xs-left">
              <div class="title">Highlighted Words</div>
              <br/>
              <v-btn class="tag" flat color="orange" v-for="word in words"><span @click="goToPosts($event)" :id="word">{{word}}</span></v-btn>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
    export default {
        methods: {
            goToPosts (event) {
                let that = this
                that.$store.dispatch("editFilter", event.path[0].id).then(()=>{
                    that.$router.push('/filteredPosts')
                })
            }
        },
        computed : {
            words () {
                return this.$store.getters.highlightedWords
            }
        }
    }
</script>

<style scoped>
.tag {
    color: white;
    margin: 3%;
    font-size: 20px;
    border-radius: 20px;
}
</style>