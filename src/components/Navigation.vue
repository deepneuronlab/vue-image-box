<template>
  <div class="navigation">
    <v-tabs dark background-color="teal darken-3" show-arrows>
      <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
      <v-tab
        v-for="link in links"
        :key="link.id"
        :to="{ name: 'PdfPage', params: { PageId: link.id } }"
      >
        {{ link.name }}
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      links: [
        {
          name: 'VENSYS Energy 21',
          id: '_final US_238180_Bericht_3665_VENSYS Energy AG_2017_page-21',
        },
        { name: 'Aareal Bank 134', id: 'aareal_bank_2018_page_134' },
        { name: 'Aareal Bank 135', id: 'aareal_bank_2018_page_135' },
        { name: 'Airbus 202', id: 'airbus_2018_page_202' },
        { name: 'Airbus 203', id: 'airbus_2018_page_203' },
        { name: 'Citi 150', id: 'citi_2018_page_150' },
        { name: 'Citi 151', id: 'citi_2018_page_151' },
        {
          name: 'KAP PPH 24',
          id: 'Elektronisches Exemplar_KAP_PPH_2018_page-24',
        },
        { name: 'Nordevent 1', id: 'JA_18_Nordevent_3_page-1' },
        { name: 'Özcan Getränke 3', id: 'Özcan Getränke GmbH_JA 2017_page-03' },
      ],
    };
  },
};
</script>

<style scoped></style>
