<template>
    <header class="container p-1">
        <div class="row">
            <div class="center">
                <img class="logo p-1" src="@/assets/logo.svg" alt="Logo groupomania">
            </div>
            <div id="nav" class="p-1">
                <router-link to="/home">Accueil</router-link>
                <router-link :to="'/user/' + userId">Mon profil</router-link>
                <a href="#" @click="() => onDisconnect()">Déconnexion</a>
            </div>
        </div>
    </header>
</template>

<script src="./Header.js"></script>
<style src="./Header.css" scoped></style>