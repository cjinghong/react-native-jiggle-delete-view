# react-native-jiggle-delete-view

Long press on a view to enter jiggle and delete mode, similar to deleting iOS apps

## Demo
<img src="https://i.imgur.com/0ry09Yd.gif" height="500" alt="react-native-jiggle-delete-view"/>

## Installation

```sh
npm install react-native-jiggle-delete-view
```
or
```sh
yarn add react-native-jiggle-delete-view
```

## Usage
First import with

`import JiggleDeleteView from "react-native-jiggle-delete-view";`

Then, wrap the views that you want to enable jiggle delete with `JiggleDeleteView`, and provide the props `showDeleteJiggle` and `onDelete`.

```js
<JiggleDeleteView
	showDeleteJiggle={showDeleteJiggle}
	onDelete={() => {
		// Delete item
	}}
>
	<MyCustomView>
		// ...
	</MyCustomView>
</JiggleDeleteView>
```

A common usage is to wrap `JiggleDeleteView` with a `TouchableOpacity` that sets `showDeleteJiggle` to true on long press. Check the example app for usage inside a `FlatList`.
```js
import JiggleDeleteView from "react-native-jiggle-delete-view";

// ...
const [showDeleteJiggle, setShowDeleteJiggle] = React.useState(false);

// ...
<TouchableOpacity
	onLongPress={() => {
		setDeleting(!showDeleteJiggle);
	}}
>
	<JiggleDeleteView
		showDeleteJiggle={showDeleteJiggle}
		onDelete={() => {
			deleteItem(index);
		}}
	>
		<View style={[styles.cell, { backgroundColor: item.color }]}>
			<Text style={styles.text}>{item.name}</Text>
		</View>
	</JiggleDeleteView>
</TouchableOpacity>
```

## Properties
| **Prop**   | **Description** | **Default** | **Required** |
|------------|-------------|--------------|---|
| `children` | Any nested views. This is required.  | *None*      | Required  |
| `showDeleteJiggle` | A boolean that determines if the view is being deleted. When sets to true, `JiggleDeleteView` will start jiggling, and a delete button will show. | `false` | Optional  |
| `onDelete` | A function that gets triggered when the delete button is pressed. | *None* | Required |
| `showDeletingAnimation` | A boolean that determines whether to show zoom out animation when delete button is pressed. | `false` | Optional |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
