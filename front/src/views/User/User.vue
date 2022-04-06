<template>
  <div class="container m-5">
    <div class="row g-3">
      <BoxProfile
        :actionUpdate="onUpdateUserProfile"
        :actionDelete="onDeleteUser"
        :error="errorUpdateUser"
        :success="successUpdateUser"
        :picture="currentUserProfile.profile_picture"
      >
        <input type="file" @change="setPicture($event)">
        <Input @input="currentUserProfile.lastName = $event.target.value" type="text" :value="currentUserProfile.lastName" placeholder="DOE">Nom</Input>
        <Input @input="currentUserProfile.firstName = $event.target.value" type="text" :value="currentUserProfile.firstName" placeholder="John">Prénom</Input>
        <Input @input="currentUserProfile.email = $event.target.value" type="text" :value="currentUserProfile.email" placeholder="john.doe@mail.com">Adresse E-mail</Input>
        <Input @input="password = $event.target.value" type="password" :value="password" placeholder="**********">Mot de passe</Input>
      </BoxProfile>
      <Box 
        v-if="userIdProfile == currentUser.id_user"
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

        :create_picture_user="`${post.picture_user_post}`"
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
        :action="() => onSharePost(post.id_post)"
        
        @input="updatePostContent[index] = $event.target.value"
        trigger_content="PARTAGER"
        writing="false"
      />
    </div>
  </div>
</template>

<script src="./User.js"></script>
<style href="./User.css" scoped></style>