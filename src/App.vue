
<template>
  <ion-app>
    <ion-split-pane when="md" contentId="main-pages">

      
      <app-menu contentId="main-pages"></app-menu>
      <ion-router-outlet id="main-pages"></ion-router-outlet>

    </ion-split-pane>
  </ion-app>

  <!-- <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app> -->
</template>



<style scoped>

</style>


<script setup lang="ts">
import { IonApp } from '@ionic/vue';
import { onMounted } from 'vue';
import { IonSplitPane, IonRouterOutlet} from '@ionic/vue';
import AppMenu from './AppMenu.vue'

onMounted(() => {
  // const d = DateTime.create({dateString: '2023-12-08', offsetString: '+01:00'}).add(1, 'milliseconds')
  // const d = DateTime.createByDate(18000000000000)
  // console.log(d.getFullString('+01:00'))

  // const d = new DateString('2023-06-30')
  // console.log(d.getYear())
  // console.log(d.getMonth())
  // console.log(d.getDay())

  // const d = new TimeString('23:59')
  // console.log(d.getHours())
  // console.log(d.getMinutes())
  // console.log(d.getSeconds())
  // console.log(d.getMilliseconds())

  // const d = new OffsetString('+02:00')
  // console.log(d.getSign())
  // console.log(d.getHours())
  // console.log(d.getMinutes())
  // console.log(d.getTime())

  // const d = DateTime.create2({
  //   dateString: '2023-06-01',
  //   offsetString: '+02:00'
  // })
  // console.log(d.getFullString('+02:00'))

  // recurrencyDataService.getAll().then(console.log)

  // const r = new Recurrency('aaa', 'aaa', DateTime.create({dateString: '2023-12-08', offsetString: '+01:00'}), {nb: 2, unit: 'days'})
  // console.log(r.getExpiry().getCHDateString(OFFSET_STRING))

  
})

</script>