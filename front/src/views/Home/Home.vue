<template>
  <div class="container m-5">
    <div class="row g-3">
      <Comments 
        :id_post="comment_post" 
        :actionCloseComments="onCloseComments"
      />
      <Box 
        :create_description="`Bonjour ${currentUser.firstName} ${currentUser.lastName},`"
        :textarea_value="newPostValue"
        @input="newPostValue = $event.target.value"
        :action="onCreatePost"
        :error="errorCreatePost"
        :success="successCreatePost"
        writing="true"
        trigger_content="PUBLIER"
      />
      <Title>Publications</Title>
      <Box 
        v-for="(post, index) in posts" :key="index" 
        :type="post.type"
        :updateStatus="updateStatus[index]"

        comments="true"
        :create_picture_user="post.picture_user_post"
        :create_name="post.name_user_post"
        :create_user_id="post.id_user_post"
        :create_date="post.date_post"

        :share_name="post.name_user_share"
        :share_user_id="post.id_user_share"
        :share_date="post.date_share"
        :text_content="post.message"
        :post_id="post.id_post"
        :share_id="post.id_share"
        
        :actionDeletePost="onDeletePost"
        :actionDeleteShare="onDeleteShare"
        :actionUpdateOpen="() => onUpdateOpen(index)"
        :actionUpdatePost="() => onUpdatePost(post.id_post, updatePostContent[index])"
        :actionOpenComments="onOpenComments"
        :action="() => onSharePost(post.id_post)"

        @input="updatePostContent[index] = $event.target.value"
        trigger_content="PARTAGER"
        writing="false"
      />
    </div>
  </div>
</template>

<script src="./Home.js"></script>
<style href="./Home.css" scoped></style>