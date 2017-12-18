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
            delete: {
                cancelButton: 'Cancel',
                confirmButton: 'Delete',
                title: 'Delete this boleto?',
            },
            detail: {
                copied: 'Copied!',
                deleteButton: 'Delete boleto',
                markAsPaid: 'Mark as paid',
                markAsPending: 'Mark as pending',
                titlePlaceholder: 'Insert title',
            },
            shareBarButton: {
                defaultMessage: 'No boleto selected',
            },
        },
        boletoList: {
            filter: {
                all: 'All',
                paid: 'Paid',
                pending: 'Pending',
            },
            list: {
                empty: 'No boleto found',
            },
            listContainer: {
                noTitle: 'No Title',
            },
        },
        boletoListUtils: {
            nearFutureTitle: 'Next 7 days',
            unknownTitle: 'Unknown',
        },
        global: {
            amount: 'Amount',
            bank: 'Bank',
            barcode: 'Barcode',
            dueDate: 'Due Date',
            segment: 'Segment',
            today: 'Today',
            tomorrow: 'Tomorrow',
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
            delete: {
                cancelButton: 'Cancelar',
                confirmButton: 'Excluir',
                title: 'Deseja excluir este boleto?',
            },
            detail: {
                copied: 'Copiado!',
                deleteButton: 'Excluir boleto',
                markAsPaid: 'Marcar como pago',
                markAsPending: 'Marcar como pendente',
                titlePlaceholder: 'Insira um título',
            },
            shareBarButton: {
                defaultMessage: 'Nenhum boleto selecionado',
            },
        },
        boletoList: {
            filter: {
                all: 'Todos',
                paid: 'Pagos',
                pending: 'Pendentes',
            },
            list: {
                empty: 'Nenhum boleto encontrado',
            },
            listContainer: {
                noTitle: 'Sem Título',
            },
        },
        boletoListUtils: {
            nearFutureTitle: 'Próximos 7 dias',
            unknownTitle: 'Desconhecido',
        },
        global: {
            amount: 'Valor',
            bank: 'Banco',
            barcode: 'Código de Barras',
            dueDate: 'Data de Vencimento',
            segment: 'Segmento',
            today: 'Hoje',
            tomorrow: 'Amanhã',
            typeableLine: 'Linha Digitável',
        },
    },
};

export default I18n;
