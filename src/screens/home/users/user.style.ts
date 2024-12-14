import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures spacing between elements
    paddingHorizontal: 10, // Adjust padding as needed
    height: 60,
    backgroundColor: 'black', // Customize background color
  },
  userIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Customize text color
    marginLeft: 12,
  },
  logoutText: {
    fontSize: 18,
    color: '#ff0000', // Customize logout text color
    marginRight: 15, // Adds space on the right
  },

  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  userItem: {
    width: Dimensions.get('window').width - 50,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    height: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    paddingLeft: 20,
    alignItems: 'center',
  },
   
  name: {color: 'black', marginLeft: 20, fontSize: 20},});
export default styles;
