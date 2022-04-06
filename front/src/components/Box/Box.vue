<template>
    <article class="box">
        <div class="box-author">
            <div class="box-author-left">
                <div class="box-author-picture" v-if="(typeof create_picture_user !== 'undefined')">
                    <img v-if="create_picture_user == '' " src="../../assets/default_profile.png">
                    <img v-else :src="create_picture_user">
                </div>
                <div class="box-author-date">
                    <router-link v-if="create_name" :to="'/user/' + create_user_id">{{create_name}}</router-link>
                    <span v-if="create_description">{{create_description}}</span>
                    <span v-if="create_date">Posté le : {{getDateHour(create_date)}}</span>
                </div>
            </div>
            <div class="box-author-right" >
                <button class="box-author-action" v-if="post_id && (create_user_id == this.userId || isAdmin)" @click="() => actionUpdateOpen()">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button  class="box-author-action" v-if="post_id && (create_user_id == this.userId || isAdmin)" @click="() => actionDeletePost(post_id)">
                    <i class="fa-solid fa-trash"></i>
                </button>
                <button  class="box-author-action" v-if="comments == 'true'" @click="() => actionOpenComments(post_id)">
                    <i class="fa-solid fa-comment"></i>
                </button>
            </div>
        </div>
        <div class="box-share" v-if="type && type == 'share'">
            <span class="box-share-content">
                Partagé par : {{share_name}} le {{getDateHour(share_date)}}
            </span>
            <button v-if="share_user_id == this.userId || isAdmin" class="box-share-action" @click="() => actionDeleteShare(share_id)">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="box-text" v-if="updateStatus != true">
            <div v-if="writing === 'false'"  class="box-text-content">
                {{text_content}}
            </div>
            <div class="box-text-content" v-if="(writing == 'true')">
                <Poster
                    :value="textarea_value"
                />
            </div>
            <div class="box-text-content" v-if="error != '' && error">
                <Error>{{error}}</Error>
            </div>
            <div class="box-text-content" v-if="success != '' && success">
                <Success>{{success}}</Success>
            </div>
            <div v-if="(typeof action !== 'undefined')" class="box-text-action">
                <Trigger 
                    :action="action"
                >{{trigger_content}}</Trigger>
            </div>
        </div>
        <div class="box-text" v-if="updateStatus == true">
            <div class="box-text-content">
                <Poster
                    :value="text_content"
                />
            </div>
            <div class="box-text-action">
                <Trigger 
                    :action="actionUpdatePost"
                >METTRE A JOUR</Trigger>
            </div>
        </div>
    </article>
</template>

<script src="./Box.js"></script>
<style src="./Box.css" scoped></style>