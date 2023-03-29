import {
    StyleSheet
} from 'react-native';

import Colors from '../../constants/colors';

export const ICONS = {
    //ARROW_DOWN: require('./icons/arrow-down.png'),
    ARROW_DOWN: require('CountingCarbs/assets/images/arrow.png'),
    ARROW_UP: require('CountingCarbs/assets/images/arrow_up.png'),
    TICK: require('CountingCarbs/assets/images/tick.png'),
    CLOSE: require('./icons/close.png')
};

export default StyleSheet.create({
    container: {
        width: '100%',
    },
    style: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        elevation: 5,
        height: 35,
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: Colors.WHITE,
    },
    label: {
        flex: 1,
        color: Colors.BLACK,
        fontFamily: "Inter-Bold",
        textAlign: "center",
        justifyContent: "center",
        fontSize: 20,
        elevation: 5,
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'row',
        elevation: 5,
    },
    arrowIcon: {
        width: 40,
        height: 40
    },
    tickIcon: {
        width: 20,
        height: 20
    },
    closeIcon: {
        width: 30,
        height: 30
    },
    badgeStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: Colors.ALTO,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    badgeDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginRight: 8,
        backgroundColor: Colors.GREY
    },
    badgeSeparator: {
        width: 5,
    },
    listBody: {
        height: '100%',
    },
    listBodyContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    dropDownContainer: {
        position: 'absolute',
        backgroundColor: Colors.WHITE,
        elevation: 5,
        borderRadius: 10,
        width: '100%',
        overflow: 'hidden',
        zIndex: 1000,
    },
    modalContentContainer: {
        flexGrow: 1,
    },
    listItemContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
        width: "100%",
        height: 40,
    },
    listItemLabel: {
        flex: 1,
        color: Colors.BLACK,
        fontFamily: "Inter-Bold",
        textAlign: "center",
        fontSize: 20,
    },
    iconContainer: {
        marginRight: 10
    },
    arrowIconContainer: {
        marginLeft: 10,
        position: "absolute",
        right: 10,
    },
    tickIconContainer: {
        marginLeft: 10,
        position: "absolute",
        right: 10,
    },
    closeIconContainer: {
        marginLeft: 10,
        position: "absolute",
        right: 10,
    },
    listParentLabel: {

    },
    listChildLabel: {

    },
    listParentContainer: {

    },
    listChildContainer: {
        paddingLeft: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: Colors.BLACK,
        borderBottomWidth: 1
    },
    searchTextInput: {
        flexGrow: 1,
        flexShrink: 1,
        margin: 0,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        borderColor: Colors.BLACK,
        borderWidth: 1,
        color: Colors.BLACK
    },
    itemSeparator: {
        height: 1,
        backgroundColor: Colors.BLACK,
    },
    flatListContentContainer: {
        flexGrow: 1
    },
    customItemContainer: {

    },
    customItemLabel: {
        fontStyle: 'italic'
    },
    listMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    listMessageText: {

    },
    selectedItemContainer: {

    },
    selectedItemLabel: {

    },
    modalTitle: {
        fontSize: 18,
        color: Colors.BLACK
    },
    extendableBadgeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
    },
    extendableBadgeItemContainer: {
        marginVertical: 3,
        marginEnd: 7
    }
});