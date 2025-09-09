import React, { useState } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import { geocodeSearch } from "../services/mapboxService";

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async (text) => {
    setQuery(text);
    if (text.length > 2) {
      const data = await geocodeSearch(text);
      setResults(data.features);
    } else {
      setResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter destination"
        value={query}
        onChangeText={search}
        style={styles.input}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item.center)}>
            <Text style={styles.item}>{item.place_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", borderRadius: 8, margin: 10, padding: 8 },
  input: { borderBottomWidth: 1, borderBottomColor: "#ccc", padding: 5 },
  item: { padding: 5, borderBottomWidth: 1, borderBottomColor: "#eee" },
});
