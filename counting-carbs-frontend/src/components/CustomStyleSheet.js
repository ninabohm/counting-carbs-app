import { StyleSheet } from 'react-native';
import colors from '../../assets/colors/colors';
import { windowHeight, windowWidth } from '../utils/Dimensions';

export const customStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    width: '100%',
    top: 5,
    bottom: 75,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingBottom: 35,
  },
  header: {
    backgroundColor: colors.brandColor,
    height: 75,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  headerLogo: {
    height: 65,
    width: 65,
  },
  headerCO2: {
    width: 90,
    height: 90,
  },
  headerMenu: {
    height: 55,
    width: 55,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
    color: 'black',
  },
  totalEmissionsBox: {
    backgroundColor: colors.brandColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 100,
    marginTop: 20,
    margin: 20,
  },
  totalEmissionsBoxText: {
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },

  todayDropdown: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '100%',
    elevation: 5,
  },
  todayText: {
    fontFamily: 'Inter-Bold',
    flex: 1,
    fontSize: 20,
    color: 'black',
    elevation: 5,
    textAlign: 'center',
    marginLeft: 50,
  },
  arrow: {
    marginTop: 5,
  },
  dropshadow: {
    elevation: 4,
  },
  dropshadowText: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { height: 4 },
    textShadowRadius: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 75,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.brandColor,
  },
  footerLogo: {
    height: 40,
    width: 40,
  },
  footerText: {
    fontFamily: 'Inter-Bold',
    color: 'white',
    padding: 8,
    size: 16,
  },
  picker: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  categoryBox: {
    marginBottom: 75,
    backgroundColor: colors.background,
  },

  signupContainer: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 24,
    marginBottom: 10,
  },

  formInput: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.textDark,
  },

  buttonContainer: {
    marginTop: 10,
    backgroundColor: '#1EC969',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loginButtonText: {
    color: 'white',
  },

  screenContainer: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    fontSize: 24,
    marginBottom: 10,
  },
  loginNavButton: {
    marginTop: 15,
  },
  loginNavButtonText: {
    fontSize: 20,
    color: colors.brandColor,
  },

  logo: {
    height: 150,
    width: 150,
  },

  plaidContainer: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plaidText: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  plaidNavButton: {
    marginTop: 15,
  },
  plaidNavButtonText: {
    fontSize: 20,
    color: '#1EC969',
  },
  plaidLink: {
    marginTop: 10,
    backgroundColor: '#1EC969',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  plaidDescription: {
    fontFamily: 'Inter',
    fontSize: 20,
    color: 'black',
    elevation: 5,
    textAlign: 'center',
    marginBottom: 10,
    padding: 20,
  },
  errorText: {
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
  menu: {
    padding: 10,
    alignItems: 'center',
  },
  googleDropshadow: {
    elevation: 3,
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: 7,
    height: 70,
    width: '100%',
    backgroundColor: colors.backgroundColor,
  },
  menuButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 375,
    height: 70,
    borderRadius: 7,
    marginVertical: 5,
  },
  menuText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: colors.textDark,
    alignSelf: 'center',
    justifySelf: 'center',
  },
  menuIcon: {
    height: 55,
    width: 55,
    marginLeft: 15,
  },
  uploadIcon: {
    height: 80,
    width: 80,
    marginTop: 10,
    paddingVertical: 20,
  },
  googleText: {
    fontFamily: 'Inter',
    fontSize: 20,
    color: colors.textDark,
    padding: 30,
    textAlign: 'center',
    marginHorizontal: 15,
  },

  googleContainer: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  googleDropshadowMenu: {
    elevation: 3,
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: 7,
    height: 70,
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  googleUploadIcon: {
    height: 80,
    width: 80,
    marginTop: 10,
  },
  googleCancelIcon: {
    height: 40,
    width: 40,
    marginTop: 10,
  },

  googleMenuButton: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: 7,
    height: 70,
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },

  googleButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: colors.textDark,
    alignSelf: 'center',
    justifySelf: 'center',
  },

  googleDropshadowText: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { height: 4 },
    textShadowRadius: 8,
  },

  googleCancelText: {
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { height: 4 },
    textShadowRadius: 8,
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.textDark,
    alignSelf: 'center',
    justifySelf: 'center',
  },

  googleNavButton: {
    marginTop: 30,
  },

  separationItem: {
    height: 65,
    width: 65,
    alignSelf: 'center',
  },

  emissionDiagram: {
    paddingHorizontal: 20,
  },

  emissionBoxCategories: {
    flex: 1,
    padding: 30,
  },

  categoryIcon: {
    height: 50,
    width: 50,
  },
});
