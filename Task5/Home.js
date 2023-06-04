import React, { useState } from 'react';
import { View, Button, Image, FlatList, Modal, TouchableOpacity, StyleSheet, Dimensions, } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';

const App = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSelectImages = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((images) => {
        const updatedImages = [...selectedImages, ...images];
        setSelectedImages(updatedImages);
        
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => console.log(selectedImages));
  };

  const handleRemoveImage = (image) => {
    const updatedImages = selectedImages.filter(
      (selectedImage) => selectedImage.path !== image.path
    );
    setSelectedImages(updatedImages);
  };

  const handleImagePress = (index) => {
    setCurrentImageIndex(index);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const renderImageItem = ({ item, index }) => {
      return (
        <TouchableOpacity onPress={() => handleImagePress(index)}>
          <Image source={{ uri: item.path }} style={[styles.image]} />
        </TouchableOpacity>
      );
  };

  const imagesForViewer = selectedImages.map((image) => ({
    url: image.path,
  }));

  return (
    <View style={styles.container}>
      <Button title="Select Images" onPress={handleSelectImages} />

      <FlatList
        data={selectedImages}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.path}
        numColumns={2}
      />
      
      <Modal visible={modalVisible} transparent={true}>
        <ImageViewer
          imageUrls={imagesForViewer}
          index={currentImageIndex}
          enableSwipeDown={true}
          onSwipeDown={handleModalClose}
          enableSwipeLeft={currentImageIndex !== selectedImages.length - 1}
          onSwipeLeft={() => setCurrentImageIndex(currentImageIndex + 1)}
          enableSwipeRight={currentImageIndex !== 0}
          onSwipeRight={() => setCurrentImageIndex(currentImageIndex - 1)}
          enablePreload={true}
          saveToLocalByLongPress={false}
          backgroundColor="black"
          style={styles.imageViewer}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:10,
    paddingRight:5
  },
  image: {
    width: Dimensions.get('window').width/2,
    height: Dimensions.get('window').width / 2,
    margin: 5,
  },
  imageDoubleContainer: {
    flexDirection: 'row',
    width:Dimensions.get('window').width,
  },
  imageBlankBox: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageViewer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});export default App;
