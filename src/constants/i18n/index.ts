import I18n from 'react-native-i18n';

I18n.fallbacks = true;

I18n.translations = {
    en: {
        boletoDetail: {
            banner: {
                status: {
                    default: 'Servidor offline',
                    errorOffline: 'Error when starting server',
                    online: 'Boleto available at: {{url}}',
                    starting: 'Starting server',
                },
            },
            detail: {
                copied: 'Copied!',
                markAsPaid: 'Mark as paid',
                markAsPending: 'Mark as pending',
                titlePlaceholder: 'Insert title',
            },
            shareBarButton: {
                defaultMessage: 'No Boleto was selected',
            },
        },
        global: {
            amount: 'Amount',
            bank: 'Bank',
            barcode: 'Barcode',
            dueDate: 'Due Date',
            segment: 'Segment',
            typeableLine: 'Typeable Line',
        },
    },
    pt: {
        boletoDetail: {
            banner: {
                status: {
                    default: 'Servidor desconectado',
                    errorOffline: 'Erro ao iniciar o servidor',
                    online: 'Acesse o boleto em: {{url}}',
                    starting: 'Servidor iniciando',
                },
            },
            detail: {
                copied: 'Copiado!',
                markAsPaid: 'Marcar como pago',
                markAsPending: 'Marcar como pendente',
                titlePlaceholder: 'Insira um título',
            },
            shareBarButton: {
                defaultMessage: 'Nenhum Boleto selecionado',
            },
        },
        global: {
            amount: 'Valor',
            bank: 'Banco',
            barcode: 'Código de Barras',
            dueDate: 'Data de Vencimento',
            segment: 'Segmento',
            typeableLine: 'Linha Digitável',
        },
    },
};

export default I18n;
