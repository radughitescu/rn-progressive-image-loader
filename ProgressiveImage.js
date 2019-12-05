import React from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const styles = StyleSheet.create({
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#e1e4e8',
    display: 'flex',
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    position: 'absolute',
    width: '100%'
  }

});

class ProgressiveImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0);

  imageAnimated = new Animated.Value(0);

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1,
    }).start();
  }

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1,
    }).start();
  }

  render() {
    const {
      thumbnailSource,
      source,
      style,
      ...props
    } = this.props;

    return (
      <View style={[styles.container]}>
        <SkeletonPlaceholder style={styles.text}>
          <View
            style={{
              width: 100,
              height: 100,
              position: 'absolute',
              top: 40,
              left: -50,
              borderWidth: 5,
              borderColor: "white",
            }}
          />
          <View style={{ width: 120, position: 'absolute', left: -60, height: 20, top: 150 }} />
          <View
            style={{
              width: 240,
              height: 20,
              left: -110,
              position: 'absolute',
              top: 180
            }}
          />
        </SkeletonPlaceholder>
        <Animated.Image
          {...props}
          source={thumbnailSource}
          style={[style, { opacity: this.thumbnailAnimated }]}
          onLoad={this.handleThumbnailLoad}
          blurRadius={1}
        />
        <Animated.Image
          {...props}
          source={source}
          style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
          onLoad={this.onImageLoad}
        />
      </View>
    );
  }
}

export default ProgressiveImage;
