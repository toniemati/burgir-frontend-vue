<template>
  <Page>
    <Header1>About Us</Header1>

    <SubHeader>
      If you want to try a unique flavor combination, go to a cozy place with family or friends, or organize a
      get-together—we are the answer to your needs.
    </SubHeader>

    <PageContent>
      <Header2>Learn more</Header2>

      <div class="content__text">
        If you want to try an extraordinary flavor combination. Go to a cozy place with family or friends. Organize a
        meeting - we are the answer to your needs.<br /><br />The "Burgir" bar and burger joint is a place where dishes
        are prepared with love and passion for food. Each burger and sandwich is an extraordinary
        combination of flavors, and the chef's original recipes make it not just ordinary fast food, but something more.
        It's a great
        substitute - original recipes make the dishes not only tasty but also healthy. Wyrębane is a place where
        everyone feels good. We are here for you, and you are here for
        us.<br /><br />Where can you meet us?<br />At ul.
        Majstra 1337A.<br />Our great team is waiting for you there 👋<br />
      </div>
    </PageContent>
  </Page>
</template>

<script setup>
import Header1 from '@/components/Header1.vue'
import Header2 from '@/components/Header2.vue'
import Page from '@/components/Page.vue'
import PageContent from '@/components/PageContent.vue'
import SubHeader from '@/components/SubHeader.vue'
</script>

<style scoped>
@media only screen and (min-width:768px) {
  .content__text {
    padding: 20px 20px;
  }
}
</style>
