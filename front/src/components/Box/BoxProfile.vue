<template>
    <article class="box">
        <div class="box-author">
            <div class="box-author-left">
                <div class="box-author-date">
                    <span>Modification du profile</span>
                </div>
            </div>
        </div>
        <div class="box-text">
            <div class="box-text-content">
                    <img class="box-picture" v-if="picture == ''" src="../../assets/default_profile.png">
                    <img class="box-picture" v-else :src="picture">
                <slot />
                <div class="box-text-content" v-if="error != '' && error">
                    <Error>{{error}}</Error>
                </div>
                <div class="box-text-content" v-if="success != '' && success">
                    <Success>{{success}}</Success>
                </div>
            </div>
            <div class="box-text-action">
                <Trigger :action="actionUpdate">Modifier le profile</Trigger>
                <Trigger :action="actionDelete">Supprimer le profile</Trigger>
            </div>
        </div>
    </article>
</template>

<script src="./BoxProfile.js"></script>
<style src="./Box.css" scoped></style>