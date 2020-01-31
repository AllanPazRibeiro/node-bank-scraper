module.exports = {
	fields: {
		agencyField: '#agencia',
		accountField: '#conta',		
	}, 
	buttons: {
		btnAllowCookies: 'button#btOk',
		btnSubmitAccountAgency: '#btnLoginSubmit',
		btnUserInfo: '#iconeMeusDados>span',
		passwordKeys: '.teclas .tecla',
		btnSubmitPassword: 'a#acessar',
		btnCloseSearchPopup: 'div#botao',
		btnAccordionBalance: '#accordionExibirBoxContaCorrente',
		btnAccordionCardInfo: '#accordionExibirBoxCartoes',
		btnCardInfo: '#exibirBoxCartoes>div.conteudo>table>tbody>tr>\
		td:nth-child(1)>div>div>p:nth-child(1)>a>strong'
	},
	wait: {
		passwordDiv: 'div.modulo-login',
		principalBody: '#sectionHomePessoaFisica',
		userInfoBody: '#conteudoMeusDados>div:nth-child(2)',
		mainCardBody: '#appController>div:nth-child(1)>div',
		nameDiv: '#conteudoMeusDados>div:nth-child(2)',
		cardBody:' #exibirBoxCartoes'
	},
	info: {
		//User Name
		name: '#nomeCliente',

		// Account Balance Info
		balance: '#saldo>p',

		// Overdraft Info
		overdraftTotal: '#exibirBoxContaCorrente>div.grid-row.clearfix>div.grid-col4>\
		div.saldo.margem-esquerda10.margem-cima40>p:nth-child(9)>small:nth-child(2)',
		
		overdraftAvailable: '#exibirBoxContaCorrente>div.grid-row.clearfix>div.grid-col4>\
		div.saldo.margem-esquerda10.margem-cima40>p:nth-child(13)>small',
		
		//Card Info
		cardName: '#carouselExampleSlidesOnly>div>div.carousel-item.ng-scope.active >\
		cpv-cartao>div>p.cartao__titulo.ng-binding',
		
		dueDate: '#appController>div:nth-child(1)>div>cpv-page-header>section>\
		ng-transclude>div.row.row-carrousel.ng-scope>div.col-8.u-pad-center-v.d-table>\
		div>div:nth-child(1)>p.c-category-status__value>strong.c-category-status__rotulo',
		
		bestDateToBuy: '#appController>div:nth-child(1)>div>cpv-page-header>section>\
		ng-transclude>div.row.row-carrousel.ng-scope>div.col-8.u-pad-center-v.d-table>\
		div>div.c-category-status__item.ng-scope>p.c-category-status__value',

		usedLimit: '#appController>div:nth-child(1)>div>cpv-page-header>section>ng-transclude>\
		div:nth-child(2)>div.row.fade.show>div>div>\
		div.c-category-status__item.col-6.c-category-status__item--icon.c-category-status__item--open>\
		p.c-category-status__value>strong:nth-child(1)>span',
		
		availableLimit: '#appController>div:nth-child(1)>div>cpv-page-header>section>ng-transclude>\
		div:nth-child(2)>div.row.fade.show>div>div>\
		div.c-category-status__item.col-2.c-category-status__item--icon.c-category-status__item--default>\
		p:nth-child(2)>strong:nth-child(1)>span',
		
		totalLimit: '#appController>div:nth-child(1)>div>cpv-page-header>section>ng-transclude>\
		div:nth-child(2)>div.row.fade.show>div>div>div.c-category-status__item.col-4.u-pad-l.u-line-l>\
		p.c-category-status__value.lwcase>strong:nth-child(1)>span',

		invoice: '#appController>div.content-status-fatura>div.container.container--fatura>div.row>\
		div.col-xl-4.u-pad-l.u-line-l>div.block.c-category-status.c-category-status--aside.block--no-border>\
		div:nth-child(3)>span.c-category-status__total.ng-binding'
	}
};
