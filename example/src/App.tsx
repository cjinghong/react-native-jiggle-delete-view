import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import JiggleDeleteView from 'react-native-jiggle-delete-view';

type Fruit = {
  name: string;
  color: string;
  prompt?: boolean;
};
const INITIAL_ITEMS: Fruit[] = [
  { name: 'Apple', color: '#DB282C' },
  { name: 'Orange', color: '#FFB238' },
  { name: 'Banana', color: '#FFDA87' },
  { name: 'Durian', color: '#B6E04B' },
  {
    name: 'This fruit will ask to delete',
    color: '#1939B7',
    prompt: true,
  },
  { name: 'Strawberry', color: '#FF7F69' },
];

export default function App() {
  const [showDeleteJiggle, setShowDeleteJiggle] = React.useState(false);
  const [items, setItems] = React.useState([...INITIAL_ITEMS]);

  const deleteItem = (index: number) => {
    items.splice(index, 1);
    setItems([...items]);
  };

  const resetExample = () => {
    setItems([...INITIAL_ITEMS]);
  };

  React.useEffect(() => {
    if (!items.length) {
      setShowDeleteJiggle(false);
    }
  }, [items]);

  const renderItem = ({ item, index }: { item: Fruit; index: number }) => {
    const { name, color, prompt } = item;
    return (
      <TouchableOpacity
        onLongPress={() => {
          setShowDeleteJiggle(!showDeleteJiggle);
        }}
        style={styles.cellContainer}
      >
        <JiggleDeleteView
          showDeleteJiggle={showDeleteJiggle}
          showDeletingAnimation={prompt ? false : true}
          onDelete={
            prompt
              ? () => {
                  Alert.alert(
                    'Confirm delete',
                    `Are you sure you want to delete "${name}"`,
                    [
                      {
                        text: 'OK',
                        onPress: () => {
                          deleteItem(index);
                        },
                      },
                      {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => {},
                      },
                    ]
                  );
                }
              : () => {
                  deleteItem(index);
                }
          }
        >
          <View style={[styles.cell, { backgroundColor: color }]}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
        </JiggleDeleteView>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <FlatList
          data={items}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={(item) => item.name}
          ListHeaderComponent={
            <Text style={styles.subtitle}>
              Long press on any of the views to enter "Jiggle Mode". Long press
              on the apps again to exit "Jiggle Mode."
            </Text>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <TouchableOpacity onPress={resetExample}>
                <Text style={styles.emptyText}>Reset</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#222B45',
    textAlign: 'center',
    paddingBottom: 16,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  cellContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  cell: {
    padding: 32,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#10C6CD',
  },
});
