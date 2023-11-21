import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome } from "@expo/vector-icons";

const MyCamera = ({ navigation }) => {
  const camRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);

  const handleNavegarDenuncia = () => {
    navigation.navigate('TelaDenuncia');
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function takePicture() {
    if (camRef.current) {
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setOpen(true);
      console.log(capturedPhoto)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camRef}>
        <View style={styles.contentButtons}>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <FontAwesome name="exchange" size={23} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCamera} onPress={takePicture}>
            <FontAwesome name="camera" size={23} color="#fff" />
          </TouchableOpacity>
        </View>
      </Camera>


      {capturedPhoto && (
        <Modal animationType="slide" transparent={false} visible={open} style={styles.modal}>
          
          <View style={styles.contentModal}>

            <View style={styles.containerText}>
              <Text style={styles.modalText}>Deseja utilizar essa foto?</Text>
            </View>

            <Image style={styles.imgPhoto} source={{ uri: capturedPhoto }} />
            
            <TouchableOpacity style={styles.cancelButton} onPress={() => {setOpen(false)}}>
              <Text style={styles.textCancelButton}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sendButton} onPress={() => { handleNavegarDenuncia(); }}>
              <Text style={styles.textSendButton}>Enviar</Text>
            </TouchableOpacity>
            
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: "100%",
    width: "100%",
  },
  contentButtons: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  buttonCamera: {
    position: "absolute",
    bottom: 50,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#508D4F",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  buttonFlip: {
    position: "absolute",
    bottom: 50,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#508D4F",
    margin: 20,
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  modal: {
    alignItems: "center",
  },
  contentModal: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
    width: "100%",
    height: "100%",
    backgroundColor: "#0C503C",
  },
  containerText: {
    marginBottom: 50,
    marginRight: 97,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize:20,
    top: 50,
    left: 50,
    fontWeight: "bold",
    color: "#CFEB0D",
  },
  cancelButton: {
    width:"40%",
    height:"7%",
    position: "absolute",
    bottom: 10,
    left: 2,
    margin: 10,
    backgroundColor:"#FF2E00",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:50,
    marginBottom: 40
  },
  sendButton:{
    width:"40%",
    height:"7%",
    position: "absolute",
    bottom: 10,
    right: 2,
    margin: 10,
    backgroundColor:"#CFEB0D",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:50,
    marginBottom: 40
  },
  textSendButton:{
    color: '#0C503C',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textCancelButton:{
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imgPhoto: {
    width: "90%",
    height: 400,
    marginTop: 85,
    marginBottom: 150,
  },
});

export default MyCamera;