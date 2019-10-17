export default {
    namespace: 'counter',
    state: {
        a: 10
    },
    reducers: {
        JIA(state, action) {
            return {
                ...state,
                a: state.a + action.n
            };  
        },
        JIAN(state, action) {
            return {
                ...state,
                a: state.a - 1
            };
        }
    }
};