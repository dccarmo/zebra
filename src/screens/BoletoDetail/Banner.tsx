import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Card from '../../components/Card';
import { colors } from '../../constants';
import { WebServerStatus } from '../../models/WebServerInfo';

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
                <Card style={{ backgroundColor: cardBackgroundColor(this.props.status) }}>
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

export default Banner;
