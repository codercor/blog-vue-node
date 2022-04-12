<template>
   <v-navigation-drawer
    v-model="isOpen"
    absolute
   >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="activeItem"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    props:["isOpen"],
    data(){
        return{
            activeItem:2
        }
    }
}
</script>

<style>

</style>