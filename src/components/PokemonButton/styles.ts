import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  pokemonButton: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    height: width / 2,
    overflow: 'hidden',
    flex: 1,
    borderRadius: 30,
  },

  pokemonButtonText: {
    fontFamily: 'RobotoRegular',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
    color: '#191919',
  },
});

export default styles;
