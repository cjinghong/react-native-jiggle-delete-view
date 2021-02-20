import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface DeletableViewProps {
  children: JSX.Element;
  showDeleteJiggle: Boolean;
  onDelete: () => void;
  showDeletingAnimation?: boolean;
}

const deleteZoomoutAnimDuration = 300;
const jiggle: any = {
  0: {
    rotate: '0deg',
  },
  0.25: {
    rotate: '1.5deg',
  },
  0.75: {
    rotate: '-1.5deg',
  },
  1: {
    rotate: '0deg',
  },
};

// Tap and hold to enter delete mode
const JiggleDeleteView: React.FC<DeletableViewProps> = ({
  children,
  showDeleteJiggle,
  onDelete,
  showDeletingAnimation,
}) => {
  const [delay] = useState((Math.random() + 1) * 10);
  const [nonce, setNonce] = useState(0);
  const [deleted, setIsDeleted] = useState(false);

  const viewRef = useRef<any>();

  useEffect(() => {
    if (!showDeleteJiggle) {
      viewRef.current?.stopAnimation();
    } else {
      setNonce(nonce + 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDeleteJiggle]);

  const onDeletePress = () => {
    if (showDeletingAnimation) {
      setIsDeleted(true);
      viewRef.current?.animate('zoomOut').then(() => {
        setTimeout(() => {
          onDelete();
        }, deleteZoomoutAnimDuration - 200);
      });
    } else {
      onDelete();
    }
  };

  return (
    <View>
      {showDeleteJiggle && !deleted && (
        <TouchableOpacity
          onPress={onDeletePress}
          style={styles.deleteButtonContainer}
          hitSlop={{ top: 3, right: 3, bottom: 3, left: 3 }}
        >
          <Animatable.View
            style={[styles.deleteButton]}
            animation="fadeIn"
            duration={500}
            useNativeDriver
          >
            <Image
              source={{
                uri:
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAABmJLR0QA/wD/AP+gvaeTAAAAR0lEQVR4nO3QQQ4AEBAEQfz/z3xAMi6IqDrvYbZLAQAAAAAAAAAA+FRdvOtbV9wT/28nVrxMoECgQKBAIAAAAAAAAAAAAOYG9IIBDHhKZI8AAAAASUVORK5CYII=',
              }}
              style={styles.deleteIcon}
            />
          </Animatable.View>
        </TouchableOpacity>
      )}
      <Animatable.View
        key={nonce}
        ref={viewRef}
        animation={deleted ? 'zoomOut' : jiggle}
        easing={deleted ? 'ease' : 'linear'}
        duration={deleted ? deleteZoomoutAnimDuration : 280 + delay}
        delay={deleted ? 0 : delay}
        iterationCount={deleted ? 1 : 'infinite'}
        useNativeDriver
      >
        {children}
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButtonContainer: {
    zIndex: 999,
  },
  deleteButton: {
    backgroundColor: '#FF4E44',
    width: 24,
    height: 24,
    borderRadius: 12,
    marginBottom: -13,
    marginLeft: -6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    width: 16,
    height: 16,
    tintColor: 'white',
  },
});

export default JiggleDeleteView;
