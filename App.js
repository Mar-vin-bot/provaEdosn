import React, {useState} from 'react';
import {Button, View, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';

export default () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState();
  const [logado, setLogado] = useState(false);

  const findPhoto = () => {
    setLogado(true)
    let outraData = date.getFullYear + '-' + date.getMonth + '-' + date.getDay;

    fetch(
      'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=' + outraData,
    )
      .then(response => response.json())
      .then(response => {
        console.log(response.url);
        setUrl(response.url);
      })
      .catch();
  };

  return (
    <View>
      {!logado ? (
        <>
          <Button title="Open" onPress={() => setOpen(true)} />
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Button title="Buscar" onPress={findPhoto} />
        </>
      ) : (
        <Image source={{uri: url}} />
      )}
    </View>
  );
};
