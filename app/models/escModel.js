import axios from 'axios';
import querystring from 'querystring'

export default {
    namespace: 'esc',
    state: {
        current: 1,
        results: [],
        color:[],
        fuel:[],
        exhaust:[]
    },
    // 同步
    reducers: {
        INIT(state, {results, total}){
            return {
                ...state,
                results,
                total
            };
        },
        CHANGECURRENT(state, {current}){
            return {
                ...state,
                current
            };
        },
        CHANGEFILTER(state, {k,v}){
            return {
                ...state,
                [k]:v
            };
        }
    },
    // 异步
    effects: {
        *INITSAGA(action, { put, select }){
            const { current,color,fuel,exhaust } = yield select(({esc}) => esc);
            const { results, total } = yield axios.get('http://192.168.2.250:3000/car?' + querystring.stringify({
                page:current,
                color:color.join('v'),
                fuel:fuel.join('v'),
                exhaust:exhaust.join('v')
            })).then(data => data.data);
            yield put({'type': 'INIT', results, total});
        },
        *CHANGECURRENT_SAGA({ current }, { put }){
            yield put({'type': 'CHANGECURRENT', current});
            yield put({'type': 'INITSAGA'});
        },
        *CHANGEFILTER_SAGA({ k,v }, { put }){
            yield put({'type': 'CHANGECURRENT', 'current':1});
            yield put({'type': 'CHANGEFILTER', k,v });
            yield put({'type': 'INITSAGA'});
        }
    }
};