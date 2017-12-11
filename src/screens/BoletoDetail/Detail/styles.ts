import { StyleSheet } from 'react-native';
import { colors } from '../../../constants';

const styles = StyleSheet.create({
    actionButton: {
        alignItems: 'center',
        height: 60,
        justifyContent: 'center',
    },
    actionButtonList: {
        marginVertical: 16,
    },
    actionButtonText: { fontSize: 16, fontWeight: 'bold', color: colors.monza },
    content: {
        padding: 16,
    },
    dataBox: {
        flex: 1,
        marginTop: 16,
    },
    dataBoxText: {
        color: colors.mineShaft,
        fontSize: 20,
    },
    dataBoxTextRight: {
        color: colors.mineShaft,
        fontSize: 20,
        textAlign: 'right',
    },
    dataBoxTitle: {
        color: colors.dustyGray,
        fontSize: 16,
        marginBottom: 8,
    },
    dataBoxTitleRight: {
        color: colors.dustyGray,
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'right',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: colors.mineShaft,
        flex: 1,
        fontSize: 24,
        justifyContent: 'space-between',
    },
});

export default styles;
