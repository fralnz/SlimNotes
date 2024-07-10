import { useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
import Toast from 'react-native-toast-message';

const useBackHandler = () => {
    const backPressCounter = useRef(0);

    useEffect(() => {
        const backAction = () => {
            if (backPressCounter.current === 0) {
                backPressCounter.current += 1;
                Toast.show({
                    type: 'info',
                    text1: 'Press back again to exit',
                    position: 'bottom',
                    visibilityTime: 2000,
                });
                setTimeout(() => {
                    backPressCounter.current = 0;
                }, 2000);
                return true;
            } else if (backPressCounter.current === 1) {
                BackHandler.exitApp();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);
};

export default useBackHandler;
