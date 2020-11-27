import { FormControl, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import TaskItem from "./TaskItem";

// ↑ボタンのインポートhttps://material-ui.com/components/material-icons/から

const App = () => {
  // 1.記述  ここらへんのデータ動画見直しましょう useStateで初期値と更新をつくる（前回）setdataで変更
  const [data, setData] = useState([{ id: "", title: "", contents:"", name:""}]);
  // ↑受け口（箱を）つくってあげるため初期値として必要
  // ここでの初期値は、リロードで一番初めに入る値引き数 firebaseではidがグループ名になり titleはフィールド値
  const [inputValue, setInputValue] = useState("");
  // そのほかのデータ
  const [inputValueN, setInputValueN] = useState("");
// 記述登録２
  const handleInputChange = (e) =>{
    console.log(e, "event");
    setInputValue(e.target.value); // inputに書き込む eventのお部屋のターゲットの
  };
  const handleInputChangeN = (e) =>{
    console.log(e, "event");
    setInputValueN(e.target.value); 
  };
  //フォーム入力のイベント
  const addInputData =() => {
    db.collection("group").add({title: inputValue, name: inputValueN});
    // db.collection("group").add({time: Date.now()});

  };
  // 2.記述・データ表示
  useEffect(() => {
    const firebaseData = db.collection("group")
    .orderBy("title", "asc").onSnapshot((snapshot) => {
      setData(
        snapshot.docs.map((dbData) => ({
          id: dbData.id,
          title: dbData.data().title,
          name: dbData.data().name,
        // ここのtitleはデータを（フィールド値の）呼び出すためのtitle
      
        }))
      );
    });

    return () => firebaseData();
  },[]);

  console.log(data);
  // // 3.記述（useEffectの説明が終わったらあとで消します）
  // console.log("222222");
  return (
    <div>
      <h1>一言タイトル</h1>
     {/* 登録の処理 */}
     <FormControl>
        {/* inputタグ */}
        <TextField
        label="登録追加"
        value={inputValue}
        onChange={handleInputChange}
         />
        <TextField
        label="名前"
        value={inputValueN}
        onChange={handleInputChangeN}
         />
      </FormControl>
      {/* 登録用ボタンの処理 */}
      <button disabled={!inputValue} onClick={addInputData}>
      <AmpStoriesIcon /></button>



      {data.map((dataItem) => (
        //divか<>で囲むように
      <>
       <React.Fragment key={dataItem.id}>
            <TaskItem id={dataItem.id} title={dataItem.title} />
          {/* <h3>コンテンツ:{dataItem.contents}</h3> */}
        </React.Fragment>
      {/* <h1 key={dataItem.id}>{dataItem.title}</h1>
      <h2 key={dataItem.id}>{dataItem.name}</h2> */}
      </>
      ))}
    </div>
  );
};
export default App;