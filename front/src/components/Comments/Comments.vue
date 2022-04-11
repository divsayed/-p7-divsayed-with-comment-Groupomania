<template>
    <section v-if="id_post != null" class="comment-section container py-5" @click.self="actionCloseComments()">
        <div class="row g-3">
            <Box 
                :create_description="`Entrez un commentaire`"
                :textarea_value="newCommentValue"
                @input="newCommentValue = $event.target.value"
                :action="onCreateComment"
                :error="errorCreateComment"
                :success="successCreateComment"
                writing="true"
                trigger_content="COMMENTER"
            />
            <Title color="white">Commentaires</Title>
            <Box 
                v-for="(comment, index) in comments" :key="index" 
                type="post"
                :updateStatus="updateStatus[index]"

                :create_picture_user="`${api}/${comment.profile_picture}`"
                :create_name="`${comment.firstName} ${comment.lastName}`"
                :create_user_id="comment.id_user"
                :create_date="comment.date_comment"

                :text_content="comment.message"
                :post_id="comment.id_comment"
                
                :actionDeletePost="onDeleteComment"
                :actionUpdateOpen="() => onUpdateOpen(index)"
                :actionUpdatePost="() => onUpdateComment(comment.id_comment, updateCommentContent[index])"
                
                @input="updateCommentContent[index] = $event.target.value"
                trigger_content="PARTAGER"
                writing="false"
            />
        </div>
    </section>
</template>

<script src="./Comments.js"></script>
<style src="./Comments.css" scoped></style>