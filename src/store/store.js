import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        posts: [
          {"title":"Lorem Ipsum", "author":"By S Ajith Kumar", "content":"eu finibus neque leo eget felis. Quisque ullamcorper sodales sem quis euismod. Donec facilisis, arcu vel aliquet elementum, nulla arcu vulputate justo, nec accumsan nulla tortor et ante. Sed ultricies vestibulum eros, feugiat condimentum quam elementum eu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam eget est rhoncus, congue ex nec, volutpat ipsum. Suspendisse non odio a sapien tempus eleifend vitae eget lectus. Donec sit amet rutrum nulla. Fusce pellentesque, magna vel ornare pulvinar, augue velit porta est, fermentum suscipit velit est vitae risus. Nam molestie mattis orci id feugiat. Curabitur mi arcu, rhoncus et commodo molestie, fringilla ut felis. Sed sit amet velit sit amet tellus euismod mattis quis id arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.", "ID":"1"},
          {"title":"luctus venenatis", "author":"By Kumar", "content":"Adipiscing elit ut aliquam purus sit amet luctus venenatis. Nulla facilisi nullam vehicula ipsum a arcu. Purus ut faucibus pulvinar elementum integer enim neque volutpat. Risus pretium quam vulputate dignissim suspendisse in est. Sed viverra tellus in hac habitasse platea. Quis lectus nulla at volutpat diam ut venenatis tellus in. Arcu vitae elementum curabitur vitae. At auctor urna nunc id cursus metus. Lectus urna duis convallis convallis. Pharetra diam sit amet nisl suscipit adipiscing bibendum est. Sed felis eget velit aliquet.", "ID":"2"}
        ],
        highlightedWords: [],
        searchFilter: "",
        postID: 2
    },
    mutations: {
        DeletePost: function(state, payload){
            state.posts = state.posts.filter(function (el) { return !matchesEl(el); });
            function matchesEl(el) {
                return el.ID === payload;
            }
        },
        editPost: function(state, payload){
            for (let i in state.posts) {
                if(state.posts[i].ID === payload[0]){
                    state.posts[i] = payload[1]
                }
            }        
        },
        addPost: function(state, payload){
            state.posts.push(payload);           
        },
        addWord: function(state, payload){
            if(state.highlightedWords.indexOf(payload) < 0){
                state.highlightedWords.push(payload);
            }
        },
        editFilter: function(state, payload){
            state.searchFilter = payload
        },
        incrementPostID: function(state, payload){
            state.postID+=1
        }
    },
    actions: {
        DeletePost: function(context, payload){
            context.commit("DeletePost",payload);
        },
        editPost : function(context, payload){
            context.commit("editPost",payload);
        },
        addPost: function(context, payload){
            context.commit("addPost",payload);
        },
        addWord: function(context, payload){
            context.commit("addWord", payload);
        },
        editFilter: function(context, payload){
            context.commit("editFilter", payload)
        },
        incrementPostID: function(context, payload){
            context.commit("incrementPostID")
        }
    },
    getters: {
        posts: state => state.posts,
        highlightedWords: state => state.highlightedWords,
        searchFilter: state => state.searchFilter,
        PostID: state => state.postID
    }
  })

  export default store
