import { call, put, select } from 'redux-saga/effects';

import { selectBarcodeAction, updateWebServerInfoAction } from '../../actions';
import { WebServerStatus } from '../../models/WebServerInfo';
import { getBoleto } from '../../reducers/boletosReducer';
import { webServer } from '../../utilities/WebServer';
import { startWebServerSaga, stopWebServerSaga } from '../webServerSagas';

const mockBoleto = {
    barcode: '02191618900000166510010847800017732009402163',
    dateAdded: Date.now(),
    paid: true,
    reminderId: null,
    title: null,
};

const mockUrl = 'localhost:1337';

const mockError = new Error('');

describe('Web Server Sagas', () => {
    describe('starts the web server successfully', () => {
        const action = selectBarcodeAction({ barcode: mockBoleto.barcode });
        const gen = startWebServerSaga(action);

        it('get the selected boleto', () => {
            expect(gen.next().value).toEqual(select(getBoleto, mockBoleto.barcode));
        });

        it('update web server info with starting', () => {
            expect(gen.next(mockBoleto).value).toEqual(
                put(
                    updateWebServerInfoAction({
                        error: null,
                        status: WebServerStatus.Starting,
                        url: null,
                    }),
                ),
            );
        });

        it('start the webserver', () => {
            expect(gen.next().value).toEqual(call(webServer.start));
        });

        it('serve the selected boleto', () => {
            expect(gen.next(mockUrl).value).toEqual(
                call(webServer.serveBoleto, mockBoleto),
            );
        });

        it('update web server info with online', () => {
            expect(gen.next(mockBoleto).value).toEqual(
                put(
                    updateWebServerInfoAction({
                        error: null,
                        status: WebServerStatus.Online,
                        url: mockUrl,
                    }),
                ),
            );
        });
    });

    describe('starts the web server with error', () => {
        const action = selectBarcodeAction({ barcode: mockBoleto.barcode });
        const gen = startWebServerSaga(action);

        it('get the selected boleto', () => {
            expect(gen.next().value).toEqual(select(getBoleto, mockBoleto.barcode));
        });

        it('update web server info with starting', () => {
            expect(gen.next(mockBoleto).value).toEqual(
                put(
                    updateWebServerInfoAction({
                        error: null,
                        status: WebServerStatus.Starting,
                        url: null,
                    }),
                ),
            );
        });

        it('start the webserver', () => {
            expect(gen.next().value).toEqual(call(webServer.start));
        });

        it('serve the selected boleto', () => {
            expect(gen.next(mockUrl).value).toEqual(
                call(webServer.serveBoleto, mockBoleto),
            );
        });

        it('update web server info with error', () => {
            if (gen.throw) {
                expect(gen.throw(mockError).value).toEqual(
                    put(
                        updateWebServerInfoAction({
                            error: '',
                            status: WebServerStatus.Error,
                            url: null,
                        }),
                    ),
                );
            }
        });
    });

    describe('stops the web server', () => {
        const gen = stopWebServerSaga();

        it('stop the webserver', () => {
            expect(gen.next().value).toEqual(call(webServer.stop));
        });

        it('update web server info with offline', () => {
            if (gen.throw) {
                expect(gen.next().value).toEqual(
                    put(
                        updateWebServerInfoAction({
                            error: null,
                            status: WebServerStatus.Offline,
                            url: null,
                        }),
                    ),
                );
            }
        });
    });
});
