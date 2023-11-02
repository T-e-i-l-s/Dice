
//импорт
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList } from 'react-native';
import { Audio } from 'expo-av';
import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';


var x1 = 0//смещение кубика
var z1 = 0//угол наклона кубика
var ind = 0//индекс интервала
var imgNum2 = null


export default function App({navigation}) {

  const [flag, setFlag] = useState(0)
  const [ sound , setSound ] = React.useState();//для воспроизведения звука
  const [ audio , setAudio ] = useState( true );//Звук вкл/выкл
  const [ subtitles , setSubtitles ] = useState( true );//Субтитры вкл/выкл
  const [ x12 , setX12 ] = useState( 0 )//смещение кубика
  const [ z12 , setZ12 ] = useState( 0 )//угол наклона кубика
 const [ numCol , setNumCol ] = useState( ['rgba(255, 0, 255,0)', 'rgba(255, 0, 255,0)', 'rgba(255, 0, 255,0)'] )//цвет субтитров
  const [ imgNum, setImgNum ] = useState()//номер выпавшего кубика
  const [ dropdownList, setDropDownList ] = useState( [] )//выпадающие кнопки
  const [ colorList, setColorList ] = useState( [] )//список тем
  const [ theme, setTheme ] = useState( ['#fff','#fff','#028577'] )//цвета темы
  const [ image, setImage ] = useState( [require( '../assets/4.png'), require( '../assets/5.png'), require( '../assets/4.png'), require( '../assets/1.png'), require( '../assets/4.png'), require( '../assets/5.png')]  )//кубик
  const [ soundImg, setSoundImage ] = useState( require( '../assets/sound.png' ) )//переключатель звука


  //перейти на страницу с большим количеством кубиков
  const add = () => {
    navigation.navigate( 'p5' )
  }


  //перейти на страницу с меньшим количеством кубиков
  const reset = () => {
    clearInterval(ind)
    navigation.navigate( 'p5' )
  }



  //запуск функции для анимации
  if (flag == 0){

    setFlag(1)


    //подгружаем данные из локального хранилища
    AsyncStorage.getItem("audio").then(value => {
      if(value == 'false'){
        setAudio( false )
        setSoundImage( require( '../assets/noSound.png' ) )
      }else{
        setAudio( true )
        setSoundImage( require( '../assets/sound.png' ) )
      }
    })

    AsyncStorage.getItem("subtitles").then(value => {
      if(value == 'true'){
        setSubtitles( false )
        setNumCol(['#94999c', 'rgba(248, 249, 251,0.5)', 'rgba(182, 187, 188,0.6)'])
      }else{
        setSubtitles( true )
        setNumCol(['rgba(255, 0, 255,0)',"rgba(255, 0, 255,0)","rgba(255, 0, 255,0)"])
      }
    })

    AsyncStorage.getItem("theme_").then(value => {
      value = " " + value
      if(value.length > 5){
        value = value.substring(1,value.length)
        setTheme(value.split(' '))
      }
    })


    ind = setInterval(() => {

      if( x1 > 0 ){//смещаем в бок
        setImgNum()
        x1 -= 15
      }

      if( z1 > 0 ){//вращаем
        setImgNum()
        z1 -= 37,5
      }

      if(z1 <= 0 && z1 <= 0){
        setImgNum(imgNum2)
      }

      //подгружаем изменения
      setX12( x1 )
      setZ12( z1 ) 

    }, 10);

  }


  //функция генерации числа между min и max
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }


  //включаем/выключаем звук и меняем иконку
  async function toggleSound() {

    if ( audio ) {

      setAudio( false )
      setSoundImage( require( '../assets/noSound.png' ) )
      AsyncStorage.setItem('audio', 'false');

    } else {
      
      setAudio( true )
      setSoundImage( require( '../assets/sound.png' ) )
      AsyncStorage.setItem('audio', 'true');

    }
    

  }


  //включаем/выключаем субтитры
  async function toggleSubtitles() {

    if ( subtitles ) {

      setSubtitles(false)
      setNumCol(['#94999c', 'rgba(248, 249, 251,0.5)', 'rgba(182, 187, 188,0.6)'])

    } else {

      setSubtitles(true)
      setNumCol(['rgba(255, 0, 255,0)','rgba(255, 0, 255,0)','rgba(255, 0, 255,0)'])

    }

    AsyncStorage.setItem('subtitles', '' + subtitles);

  }


  //включаем/выключаем выпадающие кнопки
  async function toggleDropDownList() {

    if ( dropdownList.length > 0 ) {

      setDropDownList([])

    } else {

      setDropDownList(list)

    }

  }

  //генерация числа и его вывод через кубик
  async function go() {
    
    if ( audio ) {//подгружаем звук если нужно

      const { sound } = await Audio.Sound.createAsync( require('../assets/dice.mp3') );
      setSound(sound);
      sound.playAsync();

    }
    
    //смещаем кубик(для запуска анимации)
    x1 = 420
    z1 = 1050
    
    var sum = 0
    var arr = []

    for(var i = 0; i < image.length; i++){
    
      //генерируем число для подкрутки
      if( getRandomInt(1,5) == 2 ){
        var n = 4
      }else{
        var n = 1
      }
  
      //генерируем число
      var num = getRandomInt(n,7)
      sum += num


      //сменяем кубик на выпавший после генерации
      if ( num == 1 ) {
        arr[i] = require('../assets/1.png')
      } else if ( num == 2 ) {
        arr[i] = require('../assets/2.png')
      } else if ( num == 3 ) {
        arr[i] = require('../assets/3.png')
      } else if ( num == 4 ) {
        arr[i] = require('../assets/4.png')
      } else if ( num == 5 ) {
        arr[i] = require('../assets/5.png')
      } else {
        arr[i] = require('../assets/6.png')
      }

    }


    setImage(arr)
    imgNum2 = sum

  }


  //список тайтлов для выпадающего меню
  const list = ['Удалить рекламу', 'Поделиться с другом(Apple / Android)', 'Оцени меня', 'Больше приложений', 'Изменить цвет']


  //рендерим
  return (


    <SafeAreaView style={styles.container}>

      <StatusBar style="light" backgroundColor='#000' />


      <View style={[styles.top,{backgroundColor:theme[2]}]}>


        <Text style={styles.title}>Игральные...</Text>


        <Image 
          source={require('../assets/ads.png')}
          style={styles.serviceImage}
        />

        <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={toggleSubtitles}>
          
          <Image 
          source={require('../assets/subtitles.png')}
          style={[styles.serviceImage,{marginLeft:40, width: 18, height:15}]}
          />

        </TouchableHighlight>


        <Image 
          source={require('../assets/boom.png')}
          style={styles.serviceImage}
        />


        <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={toggleSound}>
          
          <Image 
          source={soundImg}
          style={styles.serviceImage}
          />

        </TouchableHighlight>



        <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={toggleDropDownList}>
          
          <Image 
          source={require('../assets/menu.png')}
          style={[styles.serviceImage, {marginLeft: 10}]}
          />

        </TouchableHighlight>

      </View>


      <LinearGradient
        // Button Linear Gradient
        colors={[theme[0], theme[1]]}
        style={styles.central}
        onStartShouldSetResponder={() => {setDropDownList([]); setColorList([])}}>


          <LinearGradient
            colors={[numCol[1], numCol[2]]}
            style={[styles.numberBlock,
              {transform: [{rotate: 30 + 'deg'}]}]}>
            <Text style={[styles.number,{color:numCol[0]},
              {transform: [{rotate: -30 + 'deg'}]}]}>{imgNum}</Text>
          </LinearGradient> 
          {/* <TouchableHighlight style={styles.stopBlock} underlayColor={'rgba(255, 0, 255,0)'}>
            <Image 
            source={require('../assets/stop1.png')}
            style={styles.stop}
            />
          </TouchableHighlight> */}

          <View style={styles.DiceRow}>
            <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={go}>
              <Image 
              source={image[0]}
              style={[styles.image,
              {transform: [{translateY: x1}, {rotate: 0-z1 + 'deg'}]}
              ]}
              />
            </TouchableHighlight>
            
            <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={go}>
              <Image 
              source={image[1]}
              style={[styles.image,
              {transform: [{translateX: 0-x1/2}, {rotate: z1 + 'deg'}]}
              ]}
              />
            </TouchableHighlight>
          </View>

          <View style={styles.DiceRow}>
            <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={go}>
              <Image 
              source={image[2]}
              style={[styles.image,
              {transform: [{translateY: x1/2}, {rotate: 0-z1 + 'deg'}]}
              ]}
              />
            </TouchableHighlight>
            
            <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={go}>
              <Image 
              source={image[3]}
              style={[styles.image,
              {transform: [{translateY: 0-x1/2}, {rotate: 0-z1 + 'deg'}]}
              ]}
              />
            </TouchableHighlight>
          </View>

          <View style={styles.DiceRow}>
            <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={go}>
              <Image 
              source={image[4]}
              style={[styles.image,
              {transform: [{translateX: x1/2}, {rotate: 0-z1 + 'deg'}]}
              ]}
              />
            </TouchableHighlight>
            
            <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={go}>
              <Image 
              source={image[5]}
              style={[styles.image,
              {transform: [{translateY: 0-x1/3}, {rotate: 0-z1 + 'deg'}]}
              ]}
              />
            </TouchableHighlight>
          </View>

      </LinearGradient>
        
        


      <View style={[styles.low,{backgroundColor:theme[2]}]}>


        <TouchableHighlight underlayColor={'rgba(255, 0, 255,0)'} onPress={reset}>
          
          <Image 
          source={require('../assets/minus.png')}
          style={styles.addDice}
          />

        </TouchableHighlight>


        <Text style={styles.throw} onPress={go}>БРОСИТЬ КУБИК</Text>


        <View style={styles.addDice}></View>

        
      </View>
      

      <FlatList data={dropdownList} style={styles.list} renderItem={({ item }) => (

        <View style={styles.button} onStartShouldSetResponder={() => {
          if(item == 'Изменить цвет') {
            setDropDownList([]); 
            setColorList([
              {'text': 'Изменить цвет', 'color': '#303030'},
              {'text': 'белый', 'color': '#fff'},
              {'text': 'зеленый', 'color': 'green'},
              {'text': 'синий', 'color': '#00a1b0'},
              {'text': 'темно-синий', 'color': '#004f57'},
              {'text': 'красный', 'color': '#ab003c'},
              {'text': 'фиолетовый', 'color': '#9c0075'},
            ])
          }
        }}>
          <Text style={styles.buttonText}>{item}</Text>
        </View>

      )}/>

      
      <FlatList data={colorList} style={styles.list2} renderItem={({ item }) => (

        <View style={styles.button2} onStartShouldSetResponder={() => {
          if(item.text == 'белый'){setTheme(['#fff','#fff', '#028577'])
          AsyncStorage.setItem('theme_', '#fff' + " " + '#fff' + " " + '#028577');}

          if(item.text == 'зеленый'){setTheme(['#328630','#044422', '#01321c'])
          AsyncStorage.setItem('theme_', '#328630' + " " + '#044422' + " " + '#01321c');}

          if(item.text == 'синий'){setTheme(['#7ac6c4','#1e5d80', '#10415f'])
          AsyncStorage.setItem('theme_', '#7ac6c4' + " " + '#1e5d80' + " " + '#10415f');}

          if(item.text == 'темно-синий'){setTheme(['#006363','#004646', '#003130'])
          AsyncStorage.setItem('theme_', '#006363' + " " + '#004646' + " " + '#003130');}

          if(item.text == 'красный'){setTheme(['#b11c3a','#300d35', '#190828'])
          AsyncStorage.setItem('theme_', '#b11c3a' + " " + '#300d35' + " " + '#190828');}

          if(item.text == 'фиолетовый'){setTheme(['#943366','#6b3265', '#552a55'])
          AsyncStorage.setItem('theme_', '#943366' + " " + '#6b3265' + " " + '#552a55');}
          setColorList([])
        }}>
          <View style={[styles.color, {backgroundColor: item.color}]}></View>
          <Text style={styles.buttonText}>{item.text}</Text>
        </View>

      )}/>

      
      <Image 
          source={require('../assets/stop1.png')}
          style={styles.stop}
      />


    </SafeAreaView>


  );


}




//стили
const styles = StyleSheet.create({

  container: {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',

  },


  list: {

    width:'75%',

    position: 'absolute',
    right: 0,
    top: 35,

  },


  button: {

    justifyContent: 'center',

    height: 50,

    backgroundColor: '#303030',

    paddingLeft: 20,

  },


  list2: {
    width:'50%',
    position: 'absolute',
    right: 0,
    top: 35,
  },


  button2: {


    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',

    backgroundColor: '#303030',

    height: 50,
    width: '100%',

    paddingLeft: 20,

  },


  color: {

    height: 30,
    width: 30,

    marginRight: 10,

  },


  buttonText: {

    color: '#fff',

    textAlign:'left',

  },

  
  top: {

    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',

    height:'7.5%',
    width:'100%',

    backgroundColor: '#028577',

  },


  central: {

    alignItems: 'center',
    justifyContent: 'center',

    height:'86%',
    width:'100%',

    backgroundColor: '#fff',

  },


  low: {

    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',

    height:'7%',
    width:'100%',

    backgroundColor: '#028577',

  },


  serviceImage: {

    height: 20,
    width: 20,

    marginLeft:15,

  },

  
  numberBlock: {

    alignItems: 'center',
    justifyContent: 'center',

    height:50,
    width: 50,

    textAlign:'center',
    position: 'absolute',
    top: '2%',
    left: '5%',

    borderRadius: 30,

  },

  
  number: {

    color: '#b6b6b6',

    textAlign:'center',

    fontSize:25,

  },

  
  stopBlock: {

    height:70,
    width: 70,

    textAlign:'center',
    position: 'absolute',
    top: '2%',
    right: '5%'

  },


  stop: {

    height: 33,
    width: 33,

    position: 'absolute',
    top: '13%',
    right: '5%',

  },


  title: {

    width: '40%',

    color: '#fff',

    textAlign:'left',
    fontSize:20,

    fontWeight: '600'

  },


  DiceRow: {

    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    flexDirection: 'row'

  },


  image: {

    height:120,
    width:100,

    marginVertical: 35,
    marginHorizontal: 45

  },


  addDice: {

    width: 20,
    height: 20,

  },


  throw: {

    width: '60%',
    
    color: '#fff',

    textAlign:'center',
    fontSize:16,

    marginHorizontal: '3%',

    fontWeight: '600'

  },

});
