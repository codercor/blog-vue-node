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
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="mdi-account"
                              name="surname"
                              label="Soyadı"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="mdi-at"
                              name="email"
                              label="E-Mail"
                              type="email"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="mdi-account-check"
                              name="username"
                              label="Kullanıcı Adı"
                              type="text"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="mdi-lock"
                              id="password"
                              name="password"
                              label="Şifre"
                              type="password"
                           ></v-text-field>
                           <v-text-field
                              prepend-icon="mdi-lock-reset"
                              id="password"
                              name="password"
                              label="Şifre Tekrar"
                              type="password"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" to="/">Kayıt ol</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
   </v-app>
</template>

<script>
export default {
   name: 'Login',
};
</script>

<style></style>
