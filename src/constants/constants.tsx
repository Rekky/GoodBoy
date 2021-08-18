import {Dimensions, InputAccessoryView, StatusBar, StyleSheet} from "react-native";

export const COLORS = {
    primary: '#ffae47',
    secondary: '#f4f6fa',

    white: '#fff',
    black: '#282828',
    light: '#fdfdfd',
    dark: '#14273e',
    darkOcean: '#50586a',

    gray: '#a5acb5',
    grayLight: 'rgba(239,243,246,0.67)',
    grayDark: '#7e8084',

    yellow: '#ffc107',
    yellowLight: '#ffecb3',
    yellowDark: '#fca120',

    red: '#f44336',
    redLight: '#ef9a9a',
    redDark: '#c62828',

    pink: '#f06292',
    pinkLight: '#fde2ea',
    pinkDark: '#c2185b',

    blue: '#03a9f4',
    blueLight: '#b3e5fc',
    blueDark: '#0288d1',

    green: '#a1d627',
    greenLight: '#aed581',
    greenDark: '#689f38',

    gradientPrimary: '#f13fb2',
    gradientPrimaryDark: '#cd15e6'
};

export const STYLES_MODAL = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(0,0,0,0.8)',
        alignItems:'center',
        zIndex: 999
    },
    modalCard: {
        position: 'absolute',
        padding: 30,
        minWidth: '80%',
        maxWidth: '100%',
        borderRadius: 20,
        backgroundColor: COLORS.light,
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center'
    },
    modalClose: {
        position: 'absolute',
        top:-10,
        right: -10,
        backgroundColor: COLORS.white,
        borderRadius: 50,
        width: 30,
        height: 30,
        elevation: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9001
    },
    modalButtonImage: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: COLORS.light,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    modalButtonImageIcon: {
        width: 25,
        height: 25,
        tintColor: COLORS.primary
    },
    actionButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: 50,
        height: 70
    },
    actionButtonImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: COLORS.light,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    actionButtonText: {
        position: 'relative',
        justifyContent: 'center',
        textAlign:'center',
        width: 100,
        bottom: 0,
        left:0,
        color: COLORS.dark
    },
    imageIcon: {
        width: 25,
        height: 25,
        tintColor: COLORS.primary
    }
});

export const STYLES_BUTTON = StyleSheet.create({
    buttonBasic: {
        width: '100%',
        height: 50,
        paddingHorizontal: 10,
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10
    },
    buttonBasicText: {
      fontSize: 16,
      fontWeight: 'bold'
    },
    buttonBorder: {
        borderWidth: 2,
        borderColor: COLORS.grayDark
    },
    iconButton: {
        padding: 7,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 4
    },
    iconButtonIcon: {
        backgroundColor: COLORS.grayLight,
        borderRadius: 7,
        marginRight: 10,
        padding: 5
    },
    iconButtonText: {
        color: COLORS.grayDark,
        textTransform: 'capitalize'
    },
    backButton: {
        position: 'absolute',
        top: 5,
        left:0,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    backButtonIcon: {
        width: '100%',
        height: '100%'
    }
});

export const STYLES_TOPBAR = StyleSheet.create({
    navbar: {
        width: '100%',
        height: 30,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5
    }
});


export const STYLES_INPUTS = StyleSheet.create({
    inputText: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: 16
    },
    inputTextBordered: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: COLORS.gray
    }
});

export const STYLES_AUX = StyleSheet.create({
    mt_1: {
        marginTop: 5
    },
    mt_2: {
        marginTop: 10
    },
    mt_3: {
        marginTop: 30
    },
    mt_4: {
        marginTop: 40
    },
    mb_1: {
       marginBottom: 5
    },
    mb_2: {
        marginBottom: 10
    },
    mb_3: {
        marginBottom: 30
    },
    mb_4: {
        marginBottom: 40
    },
    ml_1: {
        marginLeft: 5
    },
    ml_2: {
        marginLeft: 10
    },
    ml_3: {
        marginLeft: 30
    },
    ml_4: {
        marginLeft: 40
    },
    mr_1: {
        marginRight: 5
    },
    mr_2: {
        marginRight: 10
    },
    mr_3: {
        marginRight: 30
    },
    mr_4: {
        marginRight: 40
    },
    pt_1: {
        paddingTop: 5
    },
    pt_2: {
        paddingTop: 10
    },
    pt_3: {
        paddingTop: 30
    },
    pt_4: {
        paddingTop: 40
    },
    label: {
        color: COLORS.darkOcean,
        fontWeight: '700',
        marginBottom: 5
    }
});