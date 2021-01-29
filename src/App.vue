<template>
	<div class="container">
		<div class="pages">
			<router-link v-for="link in links"
				:to="{name: 'PdfPage', params: {PageId: link}}"
				:key="link"
				:class="{'is-active' : link == $route}" 
				class="page-link"
			>
				{{link}}
			</router-link>
		</div>		
		<router-view class="container"/>
	</div>
</template>

<style scoped>
	.pages {
		margin: 50px 0;
		display: flex;
		padding: 10px;
		border: 1px solid #c3c3c3;
		overflow: scroll;
	}
	.page-link {
		padding: 10px;
		border: 1px solid #c3c3c3;
		margin: 10px;
		border-radius: 3px;
		box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	}
	.router-link-active {
		background: #e7e7e7;
	}

</style>

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
	},
	created() {
		let deferredPrompt;
		window.addEventListener('beforeinstallprompt', (e) => {
			// Stash the event so it can be triggered later.
			deferredPrompt = e;
			console.log(deferredPrompt);
		});
	}
}
</script>