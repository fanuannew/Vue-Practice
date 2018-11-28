import { mapMutations } from "vuex"


export const actionTypes = {
    GET_SONIC_STATUS: 'GET_SONIC_STATUS',
    INIT_IMG_ARR: 'INIT_IMG_ARR'
};

// ------------------------------------
// Actions
// ------------------------------------
const setSonicStatusAct = (res) => {
    console.log("設定成功: res: "+ res);
    mapMutations(["sonicStatus", "test"]);
    // this.$store.state.sonicStatus = res;
};
const initImgArrAct = (res) => {
    state.gameArea = res
};
export const setSonicStatus = (sonicStatus) => {
    console.log("setStatus: ")
    try {
        let statusWording = '';
        switch (sonicStatus) {
            case 0:
                statusWording = '异常';
                break;
            case 1:
                statusWording = '首次加载';
                break;
            case 2:
                statusWording = '模板更新';
                break;
            case 3:
                statusWording = '数据更新';
                break;
            case 4:
                statusWording = '完全缓存';
                break;
            default:
                statusWording = '异常';
                break;
        }
        setSonicStatusAct(statusWording);
    } catch (error) {
        console.log('error: ', error);
    }
};

export const initImgArr = (imgArrState) => async (dispatch, getState) => {
    try {
        if (imgArrState) {
            await dispatch(initImgArrAct(imgArrState));
            return;
        }
        let initSeqArr = [1, 2, 3, 4];
        let initSeqArrTmp = initSeqArr.slice(0);
        let initImgArr = [];

        while (initSeqArr.toString() === initSeqArrTmp.toString()) {
            initSeqArrTmp.sort(() => {
                return Math.random() - 0.5;
            });
        }
        initSeqArrTmp.forEach((i) => {
            initImgArr.push({
                'src': '/static/img/jigsaw/' + i + '.jpg',
                'index': i
            });
        });
        await dispatch(initImgArrAct({
            initSeqArr,
            imgArr: initImgArr,
            selImgIndex: []
        }));
    } catch (error) {
        console.log('error: ', error);
    }
};