import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export function useOrientation(){
  const [orientation, setOrientation] = useState("PORTRAIT");
  const [screenInfo, setScreenInfo] = useState(Dimensions.get('screen'));

  useEffect(() => {
    const onChange = (result) => {
        setScreenInfo(result.screen)
    }
    Dimensions.addEventListener('change', onChange
    // ({window:{width,height}})=>{
    //   if (width<height) {
    //     setOrientation("PORTRAIT")
    //   } else {
    //     setOrientation("LANDSCAPE")
    
    //   }
    // }
    )

  }, []);

  return screenInfo
};