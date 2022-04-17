import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  pokemonItem: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    height: width / 2,
    overflow: 'hidden',
    flex: 1,
    borderRadius: 30,
  },

  pokemonItemText: {
    fontFamily: 'RobotoRegular',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
    color: '#191919',
  },

  backToTop: {
    position: 'absolute',
    bottom: 40,
    right: 40,
  },

  footer: {
    width: '100%',
  },

  footerButtons: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  footerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerCounter: {
    fontFamily: 'RobotoBold',
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default styles;
