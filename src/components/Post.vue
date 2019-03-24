<template>
    <v-layout row wrap>
        <div id="tooltip" v-show="tooltip"><i title="Highlight text" class="fa fa-pencil" @mousedown.stop="highlight()" aria-hidden="true"></i></div>
        <v-dialog v-model="dialogEdit" persistent max-width="600px">
          <v-card>
            <v-card-title>
                <span class="headline">Edit current post</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editTitle" label="Blog Title*" required></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                    <v-textarea
                        label="Blog Content*"
                        required
                        v-model="editContent"
                    ></v-textarea>
                    </v-flex>
                </v-layout>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialogEdit = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="editPost(post.ID)">Save</v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
        <v-flex xs12>
            <v-card>
                <v-card-title>
                    <div>
                    <div class="text-xs-left title"><div id="title" @mouseup.self="getSelectionText($event)"></div>{{post.title.replace(/<[^>]*>/g, '')}}</div>
                    <div class="author text-xs-left"><span id="author" @mouseup.self="getSelectionText($event)">{{post.author.replace(/<[^>]*>/g, '')}}</span></div>
                    <div class="content text-xs-left"><div id="content" @mouseup.self="getSelectionText($event)">{{post.content.replace(/<[^>]*>/g, '')}}</div></div>
                    </div>
                </v-card-title>
                    <v-btn flat color="orange" @click="dialogEdit = !dialogEdit">Edit Post (as HTML) <v-icon>edit</v-icon></v-btn>
                    <v-btn flat color="orange" @click="deletePost(post.ID)">Delete Post <v-icon>delete</v-icon></v-btn><br/>
                    <v-btn flat color="orange" to="/">Go back <v-icon>arrow_back</v-icon></v-btn>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

export default {
    name: 'Post',
    data: function() {
        return {
            post: {},
            editTitle: "",
            editContent: "",
            dialogEdit: false,
            start: "",
            end: "",
            element: "",
            tooltip: false,
            text: ""
        }
    },
    methods: {
        deletePost (postID) {
            this.$store.dispatch("DeletePost",postID)
            this.$router.push('/')
        },
        editPost (postID) {
            let title = this.editTitle
            let content = this.editContent
            let author = this.post.author
            let that = this
            this.$store.dispatch("editPost", [postID, {"ID": postID, "title": title, "content": content, "author": author}]).then(()=>{
                that.getPost();
                that.dialogEdit = false;
            })
        },
        getSelectionText (event) {
            event.stopPropagation()
            let text
            let textCheck
            if (window.getSelection) {
                var selection = window.getSelection();
                text = selection.toString()
                this.text = text
                if (text !== "" && text !== null && text !== undefined){
                    var container = document.getElementById(event.target.id)
                    // this.getSelectionCharacterOffsetWithin(container)
                    this.element = event.path[0].id
                    textCheck = (/^[a-zA-Z0-9]+$/).test(text)
                }
            } else  {
                console.log("The highlight feature isn't supported in your browser!")
            }       
            if (text !== "" && textCheck && text !== null && text !== undefined){
                let tooltip = document.getElementById('tooltip')
                tooltip.style.left = event.clientX-50+"px"
                tooltip.style.top = event.clientY-70+"px"
                this.tooltip = true
            }
            else{
                this.tooltip = false
            }
        },
        // getSelectionCharacterOffsetWithin(element) {
        //     var start = 0;
        //     var end = 0;
        //     var doc = element.ownerDocument || element.document;
        //     var win = doc.defaultView || doc.parentWindow;
        //     var sel;
        //     if (typeof win.getSelection != "undefined") {
        //         sel = win.getSelection();
        //         if (sel.rangeCount > 0) {
        //             var range = win.getSelection().getRangeAt(0);
        //             var preCaretRange = range.cloneRange();
        //             preCaretRange.selectNodeContents(element);
        //             preCaretRange.setEnd(range.startContainer, range.startOffset);
        //             start = preCaretRange.toString().length;
        //             preCaretRange.setEnd(range.endContainer, range.endOffset);
        //             end = preCaretRange.toString().length;
        //         }
        //     } else if ( (sel = doc.selection) && sel.type != "Control") {
        //         var textRange = sel.createRange();
        //         var preCaretTextRange = doc.body.createTextRange();
        //         preCaretTextRange.moveToElementText(element);
        //         preCaretTextRange.setEndPoint("EndToStart", textRange);
        //         start = preCaretTextRange.text.length;
        //         preCaretTextRange.setEndPoint("EndToEnd", textRange);
        //         end = preCaretTextRange.text.length;
        //     }
        //     console.log(start, end)
        //     this.start = start
        //     this.end = end
        // },
        highlight () {
            let text = this.text
            let that = this
            if (text !== "" && text !== null && text != undefined){
                document.designMode = "on";
                document.execCommand("BackColor", false, "#f8e815");
                document.designMode = "off";
                that.$store.dispatch("addWord", text)
                that.post[that.element] = document.getElementById(that.element).innerHTML
                that.editContent = that.post.content
                that.editTitle = that.post.title
                that.editPost(that.post.ID)
            }
        },
        getPost () {
            let that = this
            let post = that.$store.getters.posts.filter(obj => {
                return parseInt(obj.ID) === parseInt(that.$route.params.id);
            })
            that.post = post[0]
            that.editTitle = post[0].title
            that.editContent = post[0].content
        }
    },
    created (){
        let that = this
        that.getPost();
        window.addEventListener('mouseup', that.getSelectionText , false)
    }
}

</script>

<style scoped>

#tooltip {
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 1%;
  position: fixed;
  z-index: 1;
  opacity: 1;
  transition: all 0.5s;
}

#tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
</style>