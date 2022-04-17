import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  title: {
    marginTop: 30,
    fontSize: 35,
    fontFamily: 'RobotoBold',
    color: '#191919',
  },

  search: {
    marginTop: 15,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#191919',
    padding: 8,
  },

  searchInput: {
    flex: 1,
  },

  searchButton: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#191919',
  },

  pokemonFound: {
    marginTop: 30,
    width: '60%',
    height: 200,
  },

  resetPokemon: {
    position: 'absolute',
    right: -5,
    top: -5,
    zIndex: 1,
  },
});

export default styles;
