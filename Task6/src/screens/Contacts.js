import {
  View,
  Text,
  PermissionsAndroid,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Contact from 'react-native-contacts';
import {useIsFocused} from '@react-navigation/native';
const Contacts = () => {
  const [contactList, setContactList] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState('');
  const isFocused = useIsFocused();
  useEffect(() => {
    getPermission();
  }, [isFocused]);
  const getPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res == 'granted') {
        Contact.getAll()
          .then(con => {
            const sortedContacts = sortContactsAlphabetically(con);

            setContactList(sortedContacts);
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  };
  const sortContactsAlphabetically = contacts => {
    return contacts.sort((a, b) => {
      const nameA = (a.givenName || '') + (a.familyName || '');
      const nameB = (b.givenName || '') + (b.familyName || '');
      return nameA.localeCompare(nameB);
    });
  };

  const scrollToLetter = letter => {
    setSelectedLetter(letter);
    const sectionIndex = contactList.findIndex(
      section => section.displayName[0] === letter,
    );
    console.log(sectionIndex);
    if (sectionIndex >= 0) {
      sectionListRef.current.scrollToIndex({
        index: sectionIndex,
        animated: true,
      });
    }
  };
  const alphabetList = Array.from({length: 26}, (_, index) =>
    String.fromCharCode(65 + index),
  );
  const sectionListRef = React.useRef();
  return (
    <View style={{flex: 1, backgroundColor: 'white', height: '100%'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <Image
          source={require('../images/arrow.png')}
          // souce={require('../images/arrow.png')}
          // source={require('./src/images/arrow.png')}
          style={{width: 18, height: 13}}
        />
        <Image source={require('../images/logo.png')} />
        <Image source={require('../images/shopper.png')} />
      </View>

      <View
        style={{
          borderBottomColor: '#BE9F56',
          borderBottomWidth: StyleSheet.hairlineWidth + 1,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <Text style={{color: 'black'}}>{contactList.length} contacts</Text>
        <Text style={{color: 'black', marginLeft: -45}}>CONTACTS</Text>
        <Image source={require('../images/users.png')} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <Image
          source={require('../images/user.png')}
          style={{width: 40, height: 40, marginLeft: 25}}
        />
        <Text style={{color: 'black', marginLeft: -160}}>Umer Khalil</Text>
        <Image source={require('../images/add.png')} />
      </View>

      <View
        style={{
          alignSelf: 'center',
          width: Dimensions.get('window').width * 0.9,
          borderBottomColor: '#BE9F56',
          borderBottomWidth: StyleSheet.hairlineWidth + 1,
        }}
      />
      <View style={{flexDirection: 'row'}}>
        <FlatList
          scollToI
          ref={sectionListRef}
          data={contactList}
          contentContainerStyle={{flexGrow: 1}}
          renderItem={({item, index}) => {
            if (item.phoneNumbers.length == 0) {
              return;
            } else {
              return (
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: 70,
                      padding: 20,
                    }}>
                    <Text style={{color: '#000'}}>{item.displayName}</Text>
                    <Text style={{color: '#000'}}>
                      {item.phoneNumbers[0].number}
                    </Text>
                  </View>
                  <View
                    style={{
                      alignSelf: 'center',
                      width: Dimensions.get('window').width * 0.9,
                      borderBottomColor: '#BE9F56',
                      borderBottomWidth: StyleSheet.hairlineWidth + 1,
                    }}
                  />
                </>
              );
            }
          }}
        />
        <View
        // style={{ marginLeft: 10 }}
        >
          {alphabetList.map(letter => (
            <TouchableOpacity
              key={letter}
              onPress={() => scrollToLetter(letter)}>
              <Text
                style={{
                  fontSize: 14,
                  color: letter === selectedLetter ? '#BE9F56' : 'black',
                }}>
                {letter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};
export default Contacts;
