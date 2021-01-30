<template>
  <div class="pages is-flex">
			<router-link v-for="link in links"
				:to="{name: 'PdfPage', params: {PageId: link}}"
				:key="link"
				:class="{'is-active' : link == $route}"
				class="pages__link is-flex"
			>
				<p> {{link}} </p>
        <img class="pages__foto" :src="`data/${link}.png`" :alt="PageId">
			</router-link>
		</div>
</template>

<script>
export default {
	data() {
		return {
			links: [
        '_final US_238180_Bericht_3665_VENSYS Energy AG_2017_page-21',
				'aareal_bank_2018_page_134',
				'aareal_bank_2018_page_135',
				'airbus_2018_page_202',
				'airbus_2018_page_203',
				'citi_2018_page_150',
				'citi_2018_page_151',
				'Elektronisches Exemplar_KAP_PPH_2018_page-24',
				'JA_18_Nordevent_3_page-1',
				'Özcan Getränke GmbH_JA 2017_page-03'
            ]
		}
	}
}
</script>

<style lang="sass" scoped>
.pages
  flex-direction: column
  border-right: 1px solid #c3c3c3
  overflow-y: scroll
  height: 100vh
  position: fixed

  &__link
    padding: 1rem
    border: 1px solid #c3c3c3
    margin: 1rem
    flex-direction: column
    align-items: center
    border-radius: .3rem
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)

  &::-webkit-scrollbar
    width: .25rem
    height: .25rem

  &::-webkit-scrollbar-track
    border-radius: 1px

  &::-webkit-scrollbar-thumb
    background: red
    border-radius: 0px

  &::-webkit-scrollbar-thumb:hover
    background: #b30000

  &__foto
    width: 10rem

.router-link-active
  background: #e7e7e7
</style>