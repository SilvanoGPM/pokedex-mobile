import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  image: {
    marginTop: 30,
    alignItems: 'center',
    width: '90%',
    borderRadius: 30,
    paddingVertical: 30,
  },

  pokemonId: {
    marginBottom: 15,
    fontSize: 25,
    color: '#191919',
    fontFamily: 'RobotoBold',
  },

  info: {
    marginTop: 15,
    width: '90%',
  },

  pokemonName: {
    marginBottom: 5,
    fontSize: 35,
    color: '#191919',
    fontFamily: 'RobotoBold',
    textDecorationLine: 'underline',
  },

  infoText: {
    marginBottom: 5,
    fontSize: 20,
    color: '#191919',
    fontFamily: 'RobotoRegular',
  },

  types: {
    flexDirection: 'row-reverse',
    marginBottom: 15,
  },

  type: {
    color: '#191919',
    fontFamily: 'RobotoRegular',
    fontSize: 20,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  stats: {
    marginBottom: 30,
  },

  statWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  stat: {
    marginBottom: 5,
    fontSize: 20,
    color: 'white',
    fontFamily: 'RobotoRegular',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
});

export default styles;
