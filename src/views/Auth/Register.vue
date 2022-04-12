<template>
   <v-app>
         <v-container fluid mt-16>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Kayıt Ol</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                                prepend-icon="mdi-account"
                              name="name"
                              label="Adı"
                              type="text"
                              v-model="name"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="mdi-account"
                              name="surname"
                              label="Soyadı"
                              v-model="surname"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="mdi-account-check"
                              name="username"
                              label="Kullanıcı Adı"
                              v-model="username"
                              :rules="[rules.username]"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="mdi-lock"
                              id="password"
                              name="password"
                              v-model="password"
                              label="Şifre"
                              type="password"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="mdi-lock-reset"
                              id="password"
                              name="password"
                              label="Şifre Tekrar"
                              type="password"
                              v-model="password2"
                              :rules="[rules.samePassword]"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="register" color="primary">Kayıt ol</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
   </v-app>
</template>

<script>
import service from '@/plugins/service.js';
import { authMixin,notificationMixin } from "@/mixins";
export default {
   name: 'Login',
   mixins: [authMixin,notificationMixin],
   data(){
      return {
         name:'',
         surname:'',
         password2: '',
      }
   },
   methods:{
      register(){
         this.isLoading = true;
         service.auth.register({
            name: this.name,
            surname: this.surname,
            username: this.username,
            password: this.password,
         }).then(data => {
            this.loginByData(data);
         }).catch(err => {
            console.log("err",err);
            this.setNotification({
               type: 'error',
               text: 'Kayıt sırasında hata oluştu',
               timeout: 5000,
            });
         }).finally(() => {
            this.isLoading = false;
         });
      }
   },
   computed:{
      rules(){
         return {
            samePassword: (value) => {
               return value === this.password
            },
            username: (value)=> value.length >= 8 || "Kullanıcı adı en az 8 karakter olmalıdır",
         }
      }
   }
};
</script>

<style></style>
