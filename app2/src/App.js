import React, { useEffect, useState, useCallback } from "react";
import { FlatList, TextInput, StyleSheet, Button, Text, View} from "react-native";
import axios from "axios";

    const App =() => {
    const [text, setText] = useState('');
    const [meals, setMeals] = useState({meals: []});   
    const [details, setDetails] = useState({details: []}); //Details
    const renderItem = ({ item }) => <><Item title={item.strMeal} index = {item.idMeal}/></>;
    const renderItem2 = ({  item }) => <><Item2 instruction= {item.strInstructions}/></>;
    const [buttonRandom, setButtonRandom] = useState(false);


  const getRandomMeal = useCallback(async () => {
  await axios.get(`https://themealdb.com/api/json/v1/1/random.php`)
    .then(res => {
      const meals = res.data.meals;
     setMeals({ meals });
})
}, []);

  useEffect(() => {
    if (buttonRandom) {
      getRandomMeal().then(() => setButtonRandom(false))
    }
  }, [buttonRandom, getRandomMeal])

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
        <Text style={styles.button}>
        <Button
          title="Ricetta random"
          onPress={() => { setButtonRandom(true); } } />
      </Text>
      <FlatList
          data={meals.meals}
          renderItem={renderItem}
          keyExtractor={(meal) => meal.idMeal} />
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