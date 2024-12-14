import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 15,
  },
  backButton: {
    marginRight: 10,
  },
  backImage: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
    fontWeight: '400',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f5f5f5',
  },
  typingText: {
    marginLeft: 5,
    color: 'black',
    fontSize: 14,
    fontStyle: 'italic',
  },});
export default styles;
