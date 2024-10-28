import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroFlexView,
  ViroImage,
  ViroScene,
  ViroSkyBox,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

const HelloWorldSceneAR = () => {

  const [text, setText] = useState("Initializing AR...");

  function onInitialized(state: any, reason: ViroTrackingReason) {

    console.log("onInitialized", state, reason);

    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) 
    {
      setText("Hello World!");
    } 
    else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) 
    {
      // Handle loss of tracking
    }
    
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -5]}
        style={styles.helloWorldTextStyle}
      />
    </ViroARScene>
  );
};

const CameraViewWithTarget = () => {
  // You can use hooks here if you need to manage state or effects

  return (
    <ViroScene>

      {/* Guide Text at the Top */}
      <ViroText
        text={`Point the camera at the dot\nShooting vertically is better`}
        position={[0, 1, -5]}
        width={3}
        height={2}
        style={{ fontSize: 16, fontWeight: 'bold', color: '#ffffff', textAlign: 'center' }}
      />
      
      {/* Target Overlay */}
      <ViroFlexView
        position={[0, 0, -5]}
        height={1.5}
        width={1.5}
        style={{ backgroundColor: '#ffffff30', borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}
      >
        <ViroImage
          source={require('./src/assets/crosshair.png')} // Add a target image in your project resources
          height={0.5}
          width={0.5}
        />
      </ViroFlexView>

      {/* Cancel Icon */}
      <ViroImage
        source={require('./src/assets/blueColor.png')} // Add a cancel icon in your project resources
        position={[0, -1.5, -3]}
        height={0.3}
        width={0.3}
      />
      
    </ViroScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: CameraViewWithTarget,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: { 
    flex: 1 
  },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
    zIndex: 1
  },
});
