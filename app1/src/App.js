import React, { useEffect, useState, useCallback } from "react";
import { FlatList, TextInput, StyleSheet, Button, Text, View} from "react-native";
import axios from "axios";

    const App =({navigation}) => {
    const [text, setText] = useState('');
    const [search, setSearch] = useState('');
    const [meals, setMeals] = useState({meals: []});   
    const [details, setDetails] = useState({details: []}); //Details
    const renderItem = ({ item }) => <><Item title={item.strMeal} index = {item.idMeal}/></>;
    const renderItem2 = ({  item }) => <><Item2 instruction= {item.strInstructions}/></>;
    const [buttonSearch, setButtonSearch] = useState(false);

     const getSearchMeal = useCallback(async () => {
      await axios.get(`https://themealdb.com/api/json/v1/1/search.php/?s=${search}`)
        .then(res => {
          const meals = res.data.meals;
         setMeals({ meals });
    })
    }, [search]);
    
      useEffect(() => {
        if (buttonSearch && search != '') {
          getSearchMeal().then(() => setButtonSearch(false))
        }
      }, [buttonSearch, getSearchMeal])


    const Item = (meal) => {
    const { title } = meal;
    const { index } = meal;
      return (
        <View>
          <Text onPress={()=> getDetail(index)}>{title}</Text>  
        </View>
      );
    };

    // Details
const getDetail = useCallback(async (index) => {

  await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${index}`)
    .then(res => {
         const details = res.data.meals;
        setDetails({ details });
 
 })});

const Item2 = (detail) => {
  const { instruction } = detail;
    return (
      <View>
      <Text>{instruction}</Text>
      </View>
    );
  };

    return (
       <> 
        <TextInput 
          style={styles.input}
          placeholder="inserisci" 
          onChangeText={newText => setText(newText)}
          defaultValue={text}
       />
        <Text style={styles.button}>
        <Button
         title="Cerca ricetta"
         onPress={() => {setSearch(text); setButtonSearch(true)}}
       />   
       </Text> 

      <FlatList
          data={meals.meals}
          renderItem={renderItem}
          keyExtractor={(meal) => meal.idMeal}
        />
        <FlatList
      data={details.details}
      renderItem={renderItem2}
      keyExtractor={(meal) => meal.idMeal}
    />
     </>
    )
}
const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 100,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    button: {
      alignItems: "center",
      padding: 10
    },
  });

export default App;