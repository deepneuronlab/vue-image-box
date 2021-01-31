<template lang="pug">
div(class="pages is-flex")
  router-link(
    v-for="link in links"
    :to="{name: 'PdfPage', params: {PageId: link}}"
    :key="link"
    :class="{'is-active' : link == $route}"
    class="pages__link is-flex"
    )
      p {{link}}
</template>

<script>
export default {
	data() {
		return {
			links: [
        '_final US_238180_Bericht_3665_VENSYS Energy AG_2017_page-21',
				'aareal_bank_2018_page_134',
				'citi_2018_page_151_copy',
				'aareal_bank_2018_page_135',
				'airbus_2018_page_202',
				'airbus_2018_page_203',
				'aareal_bank_2018_page_134_copy',
				'citi_2018_page_150',
				'citi_2018_page_151',
				'Elektronisches Exemplar_KAP_PPH_2018_page-24',
				'JA_18_Nordevent_3_page-1'
      ]
		}
	}
}
</script>

<style lang="sass" scoped>

.pages
  overflow-x: scroll
  overflow-y: hidden
  height: fit-content

  &__link
    padding: .5rem
    border: 1px solid #c3c3c3
    margin: 1rem .5rem
    flex-direction: column
    align-items: center
    border-radius: .3rem
    text-align: center
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)

    &:hover
      background-color: #c3c3c3

  &::-webkit-scrollbar
    width: .4rem
    height: .4rem

  &::-webkit-scrollbar-track
    border-radius: 1px

  &::-webkit-scrollbar-thumb
    background: rgba(100, 0, 100, 0.3)
    border-radius: 0px

  &::-webkit-scrollbar-thumb:hover
    background: #b30000

  &__foto
    overflow-y: hidden
    width: 100rem

.router-link-active
  background: #e7e7e7
</style>