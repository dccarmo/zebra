import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { deselectBarcodeAction } from '../../actions/index';
import Card from '../../components/Card';
import { colors } from '../../constants';
import I18n from '../../constants/i18n';
import { WebServerStatus } from '../../models/WebServerInfo';
import { AppStore } from '../../stores/index';

export interface BannerStateProps {
    description: string;
    status: WebServerStatus;
}

export interface BannerDispatchProps {
    componentWillUnmount: () => void;
}

type BannerProps = BannerStateProps & BannerDispatchProps;

function cardBackgroundColor(status: WebServerStatus): string {
    switch (status) {
        case WebServerStatus.Error:
            return colors.valencia;

        case WebServerStatus.Offline:
            return colors.valencia;

        case WebServerStatus.Online:
            return colors.shamrock;

        case WebServerStatus.Starting:
            return colors.scooter;

        default:
            return colors.scooter;
    }
}

class Banner extends React.PureComponent<BannerProps> {
    componentWillUnmount() {
        this.props.componentWillUnmount();
    }

    render() {
        return (
            <View style={styles.container}>
                <Card
                    style={{
                        backgroundColor: cardBackgroundColor(this.props.status),
                    }}
                >
                    <View style={styles.content}>
                        <Text style={styles.description}>
                            {this.props.description}
                        </Text>
                    </View>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginTop: 16,
    },
    content: {
        padding: 16,
    },
    description: {
        color: colors.white,
        textAlign: 'center',
    },
});

function mapStateToProps(state: AppStore): BannerStateProps {
    let description = I18n.t('boletoDetail.banner.status.default');

    switch (state.webServerInfo.status) {
        case WebServerStatus.Online:
            description = I18n.t('boletoDetail.banner.status.online', {
                url: state.webServerInfo.url,
            });
            break;

        case WebServerStatus.Error:
        case WebServerStatus.Offline:
            description = I18n.t('boletoDetail.banner.status.errorOffline');
            break;

        case WebServerStatus.Starting:
            description = I18n.t('boletoDetail.banner.status.starting');
            break;
    }

    return {
        description,
        status: state.webServerInfo.status,
    };
}

function mapDispatchToProps(dispatch: Dispatch<any>): BannerDispatchProps {
    return {
        componentWillUnmount: () => dispatch(deselectBarcodeAction()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
